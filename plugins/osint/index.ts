import dns from 'node:dns/promises';

export const tab = {
  id: 'osint',
  name: 'OSINT',
  isClientExposed: false,

  async executeSearch(query: string, page = 1, context: {
    dir: string
    fetch?: typeof fetch
    signProxyUrl: (url: string) => string
    useCache: <T>(namespace: string, defaultTtlMs: number) => {
      get: (key: string) => Promise<T | null>
      set: (key: string, value: T, ttlMs?: number) => Promise<void>
      delete: (key: string) => Promise<void>
      clear: () => Promise<void>
    }
  }) {
    const results: Array<{
      title: string
      url: string
      snippet: string
      source: string
      thumbnail?: string
    }> = [];

    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (!domainRegex.test(query) && !ipRegex.test(query)) {
      return {
        results: [{
          title: 'Invalid Target',
          url: '#',
          snippet: 'Please provide a valid domain or IP address for OSINT analysis.',
          source: 'Sovereign OSINT'
        }]
      };
    }

    try {
      const doFetch = context?.fetch ?? fetch;

      // 1. IP and ASN Lookup
      let targetIp = query;
      if (domainRegex.test(query)) {
        const addresses = await dns.resolve4(query).catch(() => []);
        if (addresses.length === 0) throw new Error('No A records found');
        targetIp = addresses[0];
      }

      const ipData = await doFetch(`https://ipapi.co/${targetIp}/json/`).then(res => res.json()).catch(() => ({}));
      
      results.push({
        title: `Infrastructure: ${query}`,
        url: `https://whois.domaintools.com/${query}`,
        snippet: `IP: ${targetIp} | ASN: ${ipData.asn || 'Unknown'} | Org: ${ipData.org || 'Unknown'} | City: ${ipData.city || 'Unknown'}, ${ipData.country_code || '?'}`,
        source: 'Network Intelligence'
      });

      // 2. DNS Records
      if (domainRegex.test(query)) {
        const [mx, txt] = await Promise.all([
          dns.resolveMx(query).catch(() => []),
          dns.resolveTxt(query).catch(() => [])
        ]);

        if (mx.length > 0) {
          results.push({
            title: 'Mail Exchange (MX)',
            url: '#',
            snippet: mx.map(r => `${r.exchange} (${r.priority})`).join(', '),
            source: 'DNS'
          });
        }

        if (txt.length > 0) {
          results.push({
            title: 'TXT Records',
            url: '#',
            snippet: txt.flat().join(' | ').substring(0, 200) + (txt.flat().join(' | ').length > 200 ? '...' : ''),
            source: 'DNS'
          });
        }
      }

      if (results.length === 0) {
        results.push({
          title: 'No Intelligence Found',
          url: '#',
          snippet: 'Could not retrieve DNS or Infrastructure data for this target.',
          source: 'Sovereign OSINT'
        });
      }

    } catch (e: any) {
      results.push({
        title: 'Lookup Error',
        url: '#',
        snippet: e.message || 'An unexpected error occurred during analysis.',
        source: 'Sovereign OSINT'
      });
    }

    return { results };
  },
};
