import { useState, useEffect, useCallback } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performAuthCheck() {
      try {
        const response = await fetch('/api/v1/user/');
        if (response.ok) {
          const data = await response.json();
          setAuthenticated(true);
          setUser(data);
        } else {
          setAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    }

    performAuthCheck();
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/user/');
      if (response.ok) {
        const data = await response.json();
        setAuthenticated(true);
        setUser(data);
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthenticated(false);
      setUser(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/user/logout', { method: 'GET' });
      setAuthenticated(false);
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const login = useCallback(async () => {
    try {
      const callbackUrl = `${window.location.origin}/auth/callback`;
      const response = await fetch(
        `/api/auth/url?redirect_uri=${encodeURIComponent(callbackUrl)}`
      );
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url;
      } else {
        console.error('Failed to get OAuth URL:', response.status);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, []);

  return { user, authenticated, loading, login, logout, checkAuth };
}
