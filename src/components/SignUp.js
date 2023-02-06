import { React } from "react";
import "../styles/UserAccess/UserAccess.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { signUp } from "../states/users";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

  return (
    <div className="signUpContainer">
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(signUp(data)).then(() => {
            navigate("/me");
          });
        })}
        className="signUpInputs"
      >
        <Person fontSize="inherit" />
        <input
          {...register("email", {
            required: "The email is a required field.",
            minLength: {
              value: 8,
              message: "E-mails must have a minimum length of 8 characters.",
            },
            maxLength: {
              value: 34,
              message: "E-mails must have a maximum length of 34 characters.",
            },
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          })}
          className="input"
          type="text"
          placeholder="E-mail.."
        />
        {errors.email && (
          <p className="errorContainer">{errors.email.message}</p>
        )}
        <input
          {...register("password", {
            required: "You must enter a password.",
            minLength: {
              value: 8,
              message: "Passwords must have a minimum length of 8 characters.",
            },
            maxLength: {
              value: 20,
              message: "Passwords must have a maximum length of 20 characters.",
            },
          })}
          className="input"
          type="password"
          placeholder="Password.."
        />
        {errors.password && (
          <p className="errorContainer">{errors.password.message}</p>
        )}
        <input className="logInButton" type="submit" value="SIGN UP"></input>
      </form>
    </div>
  );
}

export default SignUp;
