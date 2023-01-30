import { React, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/UserAccess/UserAccess.css";
import { Person } from "@mui/icons-material";
import { Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


function LogIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({email:'',password:''});

  const passwordInputHandler = (e) => {
    setUser((user)=>{return {...user,password:e.target.value}})
  };
  const emailInputHandler = (e) => {
    setUser((user)=>{return {...user,email:e.target.value}})
  };
  const logInHandler = async () => {
    try {
      const userData= await signInWithEmailAndPassword(auth, user.email, user.password)
      navigate('/me')
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <div className="signUpContainer">
      <form className="signUpInputs">
        <Person fontSize="inherit" />
        <input
          onChange={emailInputHandler}
          type="text"
          placeholder="Username.."
        ></input>
        <input
          onChange={passwordInputHandler}
          type="password"
          placeholder="Password.."
        ></input>
        <Button
          onClick={logInHandler}
          className="logInButton"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LogIn;
