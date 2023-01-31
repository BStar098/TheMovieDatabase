import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { apiKey } from "../App";
import { imageUrl } from "./MoviesGrid";
import "../styles/Header/Header.css";
import imageNotFound from "../styles/imageNotFound";
import { Button } from "@mui/material";
import {
  SkipNextOutlined,
  SkipPreviousOutlined,
  Favorite,
} from "@mui/icons-material";
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const navigation = useNavigate();
  const movieId = useParams().movieId;
  const [navigationBugCatcher, setNavigationBugCatcher] = useState("next");
  const [movie, setMovie] = useState({});
  const [movieBackground, setMovieBackground] = useState({});
  const [moviePoster, setMoviePoster] = useState("");
  const [user, loading] = useAuthState(auth)


  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}${apiKey}&language=en-US`
      )
      .then((movie) => {
        setMovie(movie.data);
        if (movie.data.poster_path) {
          setMoviePoster(`${imageUrl}${movie.data.poster_path}`);
        } else {
          setMoviePoster(imageNotFound);
        }
        if (movie.data.backdrop_path)
          setMovieBackground({
            backgroundImage: `url(${imageUrl}${movie.data.backdrop_path})`,
            backgroundSize: "cover",
          });
        else
          setMovieBackground({
            background: "rgb(3,37,65)",
          });
      })
      .catch(() => {
        navigationBugCatcher === "next"
          ? navigation(`/${Number(movieId) + 1}`)
          : navigation(`/${Number(movieId) - 1}`);
      });
  }, [movieId]);


  const addMovieToFavorites = async () => {
  try {
     await addDoc(collection(db,"favorites"),{
      userId:user.uid,
      movieId:movieId
    })
    alert(`The movie${movie.title} was added to favorites!`)
  } catch (error) {
    console.error(error)
  }
  };

  return (
    <>
      <div className="movieDetailsContainer" style={movieBackground}>
        <div>
          <Favorite className="favorite" onClick={addMovieToFavorites} />
          <img src={moviePoster} alt="movieDetailsPoster"></img>
        </div>
        <div className="movieDetails">
          <span>
            <h1>{movie.title}</h1>
            <p>{movie.release_date}</p>
          </span>
          <span>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </span>
        </div>
      </div>
      <div className="buttonsHeader">
        <Link to={`/${Number(movieId) - 1}`}>
          <Button
            onClick={() => {
              setNavigationBugCatcher("previous");
            }}
            variant="contained"
            startIcon={<SkipPreviousOutlined />}
          >
            Previous Movie
          </Button>
        </Link>
        <Link to={`/${Number(movieId) + 1}`}>
          <Button
            onClick={() => {
              setNavigationBugCatcher("next");
            }}
            variant="contained"
            endIcon={<SkipNextOutlined />}
          >
            Next Movie
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Header;
