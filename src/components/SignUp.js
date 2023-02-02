import { React, useState } from "react";
import "../styles/UserAccess/UserAccess.css";
import { Button } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { signUp } from "../states/users";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });

  const signUpHandler = (e) => {
    console.log(user);
    setUser((user) => {
      return { ...user, [e.target.id]: e.target.value };
    });
  };

  return (
    <div className="signUpContainer">
      <form className="signUpInputs">
        <Person fontSize="inherit" />
        <input
          id="email"
          onChange={signUpHandler}
          type="text"
          placeholder="E-mail.."
        ></input>
        <input
          id="password"
          onChange={signUpHandler}
          type="password"
          placeholder="Password.."
        ></input>
        <Button
          onClick={() => {
            dispatch(signUp(user)).then(() => {
              navigate("/me");
            });
          }}
          className="signUpButton"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
