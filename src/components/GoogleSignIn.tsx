import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

const GoogleSignIn = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <StyledButton onClick={handleClick}>
      <div>
        <FcGoogle />
      </div>
      <span>Sign in with Google</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  font: inherit;
  display: flex;
  align-items: center;
  /* gap: 10px; */
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 4px;
  background: hsl(200, 87%, 40%);
  color: #fafafa;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  cursor: pointer;


  div {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    background: white;
    width: 40px;
    height: 40px;
  }
`;

export default GoogleSignIn;
