import { useCallback, useEffect, useState } from 'react';

export type AppRoute = '/' | '/admin/login' | '/admin/dashboard';

function normalizePath(pathname: string): AppRoute {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (cleaned === '/admin/login') return '/admin/login';
  if (cleaned === '/admin/dashboard') return '/admin/dashboard';
  if (cleaned === '/admin') return '/admin/login';
  return '/';
}

export function useRouter() {
  const [route, setRoute] = useState<AppRoute>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((nextRoute: AppRoute, replace = false) => {
    const normalized = normalizePath(nextRoute);
    if (window.location.pathname !== normalized) {
      if (replace) {
        window.history.replaceState({}, '', normalized);
      } else {
        window.history.pushState({}, '', normalized);
      }
    }
    setRoute(normalized);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return { route, navigate };
}
