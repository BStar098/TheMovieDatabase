import { React, useState } from "react";
import "../styles/UserAccess/UserAccess.css";
import { Button } from "@mui/material";
import { Person } from "@mui/icons-material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate()
  const [user, setUser] = useState({email:'',password:''});
  const passwordInputHandler = (e) => {
    setUser((user)=>{return {...user,password:e.target.value}})
  };
  const emailInputHandler = (e) => {
    setUser((user)=>{return {...user,email:e.target.value}})
  };

  const signUpHandler = async () => {
    try {
      const userData= await createUserWithEmailAndPassword(auth, user.email, user.password)
      navigate('/me')
    } catch (error) {
      console.error(error)
    }
  };
  console.log(user)
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
        <Button onClick={signUpHandler} className="signUpButton">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
