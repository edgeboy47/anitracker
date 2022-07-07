import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./Header";
import { useSelector } from "react-redux";
import { selectUser, selectAuthIsLoading } from "../features/auth/authSlice";

export const Layout = () => {
  const user = useSelector(selectUser);
  const authIsLoading = useSelector(selectAuthIsLoading);

  return (
    <StyledLayout user={user} isLoading={authIsLoading}>
      <Header />
      <StyledOutlet>
        <Outlet />
      </StyledOutlet>
    </StyledLayout>
  );
};

const StyledOutlet = styled.main`
  padding: 0 2rem;
  max-width: 2000px;
  margin: 0 auto;
`;

type LayoutProps = {
  user: object | null;
  isLoading: boolean;
}

const StyledLayout = styled.div<LayoutProps>`
  opacity: ${props => (props.user === null && props.isLoading) ? 0 : 1};
  transition: opacity ease-in 200ms;
  max-width: 100vw;
  min-height: 100vh;
`