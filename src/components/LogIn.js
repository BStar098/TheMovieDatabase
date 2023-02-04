import { React, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/UserAccess/UserAccess.css";
import { Person } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logIn } from "../states/users";

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });

  const loginHandler = (e) => {
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
          value={user.email}
          onChange={loginHandler}
          type="text"
          placeholder="Username.."
        ></input>
        <input
          id="password"
          value={user.password}
          onChange={loginHandler}
          type="password"
          placeholder="Password.."
        ></input>
        <Button
          onClick={() => {
            dispatch(logIn(user))
              .then(() => {
                navigate("/me");
              })
              .catch(() => {
                setUser((user) => {
                  return { email: "", password: "" };
                });
              });
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
