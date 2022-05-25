import { Link } from "react-router-dom";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

export const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <StyledNavbar>
      <Link to="/search">
        <StyledNavbarButton>Search</StyledNavbarButton>
      </Link>
      <StyledNavbarButton>Watch List</StyledNavbarButton>
      {user ? (
        <StyledNavbarButton>Logout</StyledNavbarButton>
      ) : (
        <Link to="/login">
          <StyledNavbarButton>Login</StyledNavbarButton>
        </Link>
      )}
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  display: flex;
  gap: 1rem;

  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

const StyledNavbarButton = styled.div`
  color: #111;
  font-size: 1.25rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
`;
