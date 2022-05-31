import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { register, reset, selectAuthError, selectAuthIsSuccess, selectUser } from "../features/auth/authSlice";
import GoogleSignIn from "../components/GoogleSignIn";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectAuthError)
  const user = useSelector(selectUser)
  const isSuccess = useSelector(selectAuthIsSuccess);
  const navigate = useNavigate();

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
      dispatch(reset());
    }
  }, [dispatch, user, navigate, isSuccess])

  return (
    <StyledRegisterPage>
      <StyledRegisterBox>
        <h2>Register</h2>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            console.log('register form submitted')
            if(password !== confirmPassword){
              alert('Passwords do not match')
            }

            dispatch(register({email, password, username}))
          }}
        >
          <StyledInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />

          <StyledInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <StyledInput
            type="password"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <StyledInput
            type="password"
            value={confirmPassword}
            minLength={8}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <StyledRegisterButton type="submit">Register</StyledRegisterButton>
          <GoogleSignIn />
        </form>
        {/* TODO stylize error message */}
        {error}
        {/* TODO add password recovery*/}
        <Link to="/login">
          Already registered? <span>Login</span>
        </Link>
      </StyledRegisterBox>
    </StyledRegisterPage>
  );
};

const StyledRegisterPage = styled.div``;

const StyledRegisterBox = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  background-color: #eee;
  border-radius: 8px;
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
  padding: 3rem 5rem;

  form {
    width: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    flex: 1;
  }

  a {
    text-align: center;
    margin-top: 5rem;
    text-decoration: none;
    color: inherit;
    font-size: 0.875rem;
    padding: 1rem 0rem;
    width: 100%;

    span {
      font-weight: 700;
    }

    :hover {
      color: hsl(200, 87%, 40%);
    }
  }
`;

const StyledInput = styled.input`
  font: inherit;
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  border-radius: 4px;
`;

const StyledRegisterButton = styled.button`
  font: inherit;
  /* width: 5rem; */
  border: none;
  border-radius: 4px;
  background: hsl(200, 87%, 40%);
  color: #fafafa;
  font-weight: bold;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  padding: 1rem 3rem;
  cursor: pointer;
`;

export default RegisterPage;
