import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    _paq?: unknown[];
  }
}

export const useMatomoPageTracking = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!window._paq) return;
    window._paq.push(['setCustomUrl', pathname + search]);
    window._paq.push(['setDocumentTitle', document.title]);
    window._paq.push(['trackPageView']);
  }, [pathname, search]);
};
