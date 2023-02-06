import { React } from "react";
import { useNavigate } from "react-router";
import "../styles/UserAccess/UserAccess.css";
import { Person } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logIn } from "../states/users";
import { useForm } from "react-hook-form";

function LogIn() {
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
          dispatch(logIn(data)).then(() => {
            navigate("/me");
          });
          console.log(errors);
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
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "That's not a valid e-mail!",
            },
          })}
          className="input"
          type="text"
          placeholder="E-mail.."
        ></input>
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
        ></input>
        {errors.password && (
          <p className="errorContainer">{errors.password.message}</p>
        )}
        <input className="logInButton" type="submit" value="LOG IN" />
      </form>
    </div>
  );
}

export default LogIn;
