import { Link } from "react-router-dom";
import styled from "styled-components";

import { useSelector } from "react-redux";
import {
  logout,
  reset,
  selectAuthIsSuccess,
  selectUser,
} from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { MdMenu } from "react-icons/md";

export const Navbar = () => {
  const user = useSelector(selectUser);
  const isSuccess = useSelector(selectAuthIsSuccess);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Triggers when user logs out
  useEffect(() => {
    if (user === null && isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, user, isSuccess]);

  return (
    <StyledNavbar>
      <Logo>
        <Link to="/" onClick={() => setIsOpen(false)}>
          AniTracker
        </Link>
      </Logo>
      <HamburgerMenu onClick={() => setIsOpen((prev) => !prev)}>
        <MdMenu />
      </HamburgerMenu>
      <NavItems isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <Link to="/search">
          <StyledNavbarButton>Search</StyledNavbarButton>
        </Link>
        <Link to={"/watchlist"}>
          <StyledNavbarButton>Watch List</StyledNavbarButton>
        </Link>
        {/* TODO: Change to show profile icon when user is logged in */}
        {user ? (
          <div>
            <StyledNavbarButton
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </StyledNavbarButton>
          </div>
        ) : (
          <Link to="/login">
            <StyledNavbarButton>Login</StyledNavbarButton>
          </Link>
        )}
      </NavItems>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

interface NavProps {
  isOpen: boolean;
}

const NavItems = styled.div<NavProps>`
  display: flex;
  gap: min(1vw, 1rem);
  transition: all 0.3s ease;

  a {
    text-decoration: none;
    cursor: pointer;
  }

  @media screen and (max-width: 500px) {
    overflow: hidden;
    height: ${(p) => (p.isOpen ? "160px" : "0")};
    visibility: ${(p) => (p.isOpen ? "visible" : "hidden")};
    opacity: ${(p) => (p.isOpen ? "1" : "0")};
    flex-direction: column;
    width: 100%;
  }
`;

const StyledNavbarButton = styled.div`
  color: #111;
  font-size: clamp(0.5rem, 0.5rem + 1.5vw, 1.25rem);
  padding: 1em 0.75em;
  cursor: pointer;
  width: min-content;
  white-space: nowrap;
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  padding: 1rem;
  svg {
    width: 24px;
    height: 24px;
    color: #2e51a2;
  }

  @media screen and (max-width: 500px) {
    display: block;
  }
`;

const Logo = styled.div`
  padding: 1rem;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
