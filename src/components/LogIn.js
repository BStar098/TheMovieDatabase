import { React, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/UserAccess/UserAccess.css";
import { Person } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";

function LogIn({ setUser }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };
  const usernameInputHandler = (e) => {
    setUserName(e.target.value);
  };
  const logInHandler = (e) => {
    axios
      .post("/user/logIn", { username, password })
      .then((result) => result.data)
      .then((user) => {
        setUser(user);
        navigate('/me')
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="signUpContainer">
      <form className="signUpInputs">
        <Person fontSize="inherit" />
        <input
          onChange={usernameInputHandler}
          type="text"
          placeholder="Username.."
        ></input>
        <input
          onChange={passwordInputHandler}
          type="password"
          placeholder="Password.."
        ></input>
        <Button
          onClick={(e) => {
            logInHandler(e);
          }}
          className="logInButton"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LogIn;
