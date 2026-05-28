import { useState, useRef } from 'react';
import type { PropertyData } from '../types';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function usePropertyLookup() {
  const [data, setData] = useState<PropertyData | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const lastLookup = useRef('');

  async function lookup(address: string, city: string, state: string, zipCode: string) {
    const key = `${address}|${zipCode}`;
    if (!address || !zipCode || zipCode.length < 5) return;
    if (key === lastLookup.current && status === 'success') return; // no duplicate calls

    lastLookup.current = key;
    setStatus('loading');
    setError(null);

    try {
      const res = await fetch('/api/property-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, city, state, zipCode }),
      });

      if (!res.ok) throw new Error('Lookup failed');
      const json = await res.json();
      setData(json);
      setStatus('success');
    } catch {
      setError('Could not retrieve property data. You can still continue.');
      setStatus('error');
    }
  }

  function reset() {
    setData(null);
    setStatus('idle');
    setError(null);
    lastLookup.current = '';
  }

  return { data, status, error, lookup, reset };
}
