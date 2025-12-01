import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

const HeaderContainer = styled.header`
  background-color: var(--color-primary);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;

  &:hover {
    color: var(--color-secondary);
  }
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  color: white;
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

function Header() {
  const { user, authenticated, login, logout } = useAuth();

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Worlddriven Admin</Logo>
        <AuthSection>
          {authenticated ? (
            <>
              {user?.name && <UserName>{user.name}</UserName>}
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <Button onClick={login}>Login with GitHub</Button>
          )}
        </AuthSection>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
