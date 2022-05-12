import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <>
      <Header />
      <StyledOutlet>
        <Outlet />
      </StyledOutlet>
    </>
  );
};

const StyledOutlet = styled.div`
  padding: 0 2rem;
  max-width: 2000px;
  margin: 0 auto;
`;