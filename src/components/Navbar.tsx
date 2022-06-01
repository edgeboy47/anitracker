import { Link } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  reset,
  selectAuthIsSuccess,
  selectUser,
} from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";
import { useEffect } from "react";

export const Navbar = () => {
  const user = useSelector(selectUser);
  const isSuccess = useSelector(selectAuthIsSuccess);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user === null && isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, user, isSuccess]);

  return (
    <StyledNavbar>
      <Link to="/search">
        <StyledNavbarButton>Search</StyledNavbarButton>
      </Link>
      <Link to={"/watchlist"}>
        <StyledNavbarButton>Watch List</StyledNavbarButton>
      </Link>
      {/* TODO: Change to show profile icon when user is logged in */}
      {user ? (
        <StyledNavbarButton
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </StyledNavbarButton>
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
