import styled from "styled-components";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <StyledHeader>
      <Logo>AniTracker</Logo>
      <Navbar />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2e51a2;
  font-weight: 700;
  font-size: 2rem;
  padding: 1rem 2rem;
`;

const Logo = styled.div`
  padding: 1rem;
  cursor: pointer;
`;
