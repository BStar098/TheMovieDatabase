import "./styles/main.css";
import SearchAppBar from "./components/Navbar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import MoviesGrid from "./components/MoviesGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useLocation, useNavigate } from "react-router";

export const apiKey = "?api_key=bab35148fb4955596b39e5a91d7a7858";

function App() {
  const currentLocation = useLocation();
  const navigation = useNavigate();

  const [user, setUser] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const searchHandler = (e) => {
    if (currentLocation.pathname !== "/") {
      setPage(1);
      navigation("/");
    }
    setInputValue(e.target.value.replace(" ", "+"));
  };
  useEffect(() => {
    axios.get("/user/me").then((username) => {
      if (username) setUser(username);
    });
  }, []);
  useEffect(() => {
    if (inputValue) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie${apiKey}&query=${inputValue}&page=${page}`
        )
        .then((movies) => {
          setMovies(movies.data);
        });
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing${apiKey}&language=en-US&page=${page}`
        )
        .then((movies) => {
          setMovies(movies.data);
        });
    }
  }, [inputValue, page]);

  return (
    <>
      <SearchAppBar
        searchHandler={searchHandler}
        setPage={setPage}
        user={user}
        setUser={setUser}
      />
      <Routes>
        <Route
          path="/"
          element={<MoviesGrid {...movies} user={user} />}
        ></Route>
        <Route path="404" element={<NotFound />}></Route>
        <Route path="*" element={<Navigate to="404" />}></Route>
        <Route path="/:movieId" element={<Header user={user} />}></Route>
        <Route path="/logIn" element={<LogIn setUser={setUser} />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/me" element={<Profile />}></Route>
      </Routes>
      <Footer
        numberOfPages={movies.total_pages}
        setPage={setPage}
        page={page}
      />
    </>
  );
}

export default App;
