import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: var(--color-text);
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #dc3545;
`;

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function handleCallback() {
      const code = searchParams.get('code');
      const oauthError = searchParams.get('error');

      if (oauthError) {
        setError('Authentication was denied');
        return;
      }

      if (!code) {
        setError('No authorization code received');
        return;
      }

      try {
        const callbackUrl = `${window.location.origin}/auth/callback`;
        const response = await fetch('/api/auth/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            redirect_uri: callbackUrl,
          }),
        });

        if (response.ok) {
          navigate('/dashboard');
        } else {
          const data = await response.json().catch(() => ({}));
          setError(data.error || 'Authentication failed');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Authentication failed');
      }
    }

    handleCallback();
  }, [searchParams, navigate]);

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <a href="/">Return to home</a>
      </Container>
    );
  }

  return (
    <Container>
      <Message>Completing authentication...</Message>
    </Container>
  );
}
