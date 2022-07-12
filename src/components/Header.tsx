import styled from "styled-components";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <StyledHeader>
      <Navbar />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  
  color: #2e51a2;
  font-weight: 700;
  font-size: clamp(1.125rem, 0.75rem + 1.5vw, 2rem);
  padding: 1rem;
  width: min(100%, 1500px);
  margin: 0 auto;
`;
