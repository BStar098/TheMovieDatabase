import { React, useState } from "react";
import "../styles/UserAccess/UserAccess.css";
import { Button } from "@mui/material";
import { Person } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };
  const usernameInputHandler = (e) => {
    setUserName(e.target.value);
  };

  const signUpHandler = (e) => {
    axios
      .post("/user/signUp", { username, password })
      .then(() => {
        navigate("/logIn");
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
        <Button onClick={signUpHandler} className="signUpButton">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
