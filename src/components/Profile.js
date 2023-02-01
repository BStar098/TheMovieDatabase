import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/Profile/Profile.css";
import profileBg from "../styles/profileBg.svg";
import profileLogo from "../styles/profileLogo.jpg";
import { DeleteForever } from "@mui/icons-material";
import { imageUrl } from "./MoviesGrid";
import { Link } from "react-router-dom";
import { apiKey } from "../App";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import axios from "axios";

function Profile() {
  const [moviesArray, setMoviesArray] = useState([]);
  const [user] = useAuthState(auth);

  const getUserFavorites = async () => {
    try {
      const userFavoritesQuery = query(
        collection(db, "favorites"),
        where("userId", "==", user.uid)
      );
      const userFavorites = await getDocs(userFavoritesQuery);
      userFavorites.forEach((favorite) =>
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${
              favorite.data().movieId
            }${apiKey}&language=en-US`
          )
          .then((movie) => {
            setMoviesArray((movies) => [...movies, movie.data]);
          })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavoriteFromUser = async (movieId, userId) => {
    try {
      const favoritesRef = collection(db, "favorites");
      const favoriteQuery = query(
        favoritesRef,
        where("movieId", "==", String(movieId)),
        where("userId", "==", userId)
      );
      const favoritesToDelete = await getDocs(favoriteQuery);
      favoritesToDelete.forEach(
        async (favorite) => await deleteDoc(doc(db, "favorites", favorite.id))
      );
      setMoviesArray((movies) =>
        movies.filter((movie) => movie.id !== movieId)
      );
      alert("The movie was removed from favorites");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      getUserFavorites();
    }
  }, [user?.uid]);

  return (
    <div className="profileContainer">
      <div className="profileTitle">
        <div
          className="svgContainer"
          style={{ backgroundImage: `url(${profileBg})` }}
        >
          <img src={profileLogo} alt="profileLogo"></img>
          <h1>{user?.email.split("@")[0].toUpperCase()}</h1>
        </div>
      </div>
      <div className="profileFavorites">
        <div className="favoritesTitle">
          <h1>{user?.email.split("@")[0].toUpperCase()}'s Favorites</h1>
        </div>
        <div className="favoritesContainer">
          {moviesArray.length ? (
            moviesArray.map((el) => {
              return (
                <Link key={el.id} className="movie" to={`/${el.id}`}>
                  <div className="movieProfileContainer">
                    <Link
                      onClick={() => {
                        deleteFavoriteFromUser(el.id, user.uid);
                      }}
                      to=""
                    >
                      <DeleteForever id={el.id} className="deleteIcon" />
                    </Link>
                    <img
                      className="gridImg"
                      src={`${imageUrl}${el.poster_path}`}
                      alt="Avatar"
                    ></img>

                    <div className="movieDescription">
                      <p>{el.title}</p>
                      <p>{el.release_date}</p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
