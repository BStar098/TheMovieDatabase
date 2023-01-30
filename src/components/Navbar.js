import * as React from "react";
import "../styles/Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import TMDB from "../styles/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Search = styled("div")(({ theme }) => ({
  position: "sticky",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "60%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({
  searchHandler,
  setPage
}) {
  const [user,loading] = useAuthState(auth)
  const logOutHandler = async () => {
    try {
      await signOut(auth)
      alert(
        'Signed out succesfully'
      )
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: "rgb(3,37,65)" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/">
            <img
              src={TMDB}
              alt="TMDBIcon"
              style={{ height: "100px", width: "100px" }}
              onClick={() => {
                setPage(1);
              }}
            ></img>
          </Link>
          <div className="userButtonsContainer">
            {user ? (
              <>
                <Link to="/me">
                  <Button size="large">Profile</Button>
                </Link>
                <Link to="/">
                  <Button onClick={logOutHandler} size="large">
                    Log Out
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/logIn">
                  <Button size="large">LOG IN</Button>
                </Link>
                <Link to="/signUp">
                  <Button size="large">SIGN UP</Button>
                </Link>
              </>
            )}
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={searchHandler}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
