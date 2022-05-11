import styled from "styled-components";

export const Navbar = () => {
  return (
    <StyledNavbar>
      <StyledNavbarButton>Search</StyledNavbarButton>
      <StyledNavbarButton>Watch List</StyledNavbarButton>
      <StyledNavbarButton>Login</StyledNavbarButton>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  display: flex;
  gap: 1rem;
`;

const StyledNavbarButton = styled.div`
  color: #111;
  font-size: 1.25rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
`;
