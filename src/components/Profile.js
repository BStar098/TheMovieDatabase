import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/Profile/Profile.css";
import profileBg from "../styles/profileBg.svg";
import profileLogo from "../styles/profileLogo.jpg";
import { DeleteForever } from "@mui/icons-material";
import { imageUrl } from "./MoviesGrid";
import { Link, Navigate } from "react-router-dom";
import { apiKey } from "../App";
import { auth } from "../config/firebase";
import {useAuthState} from 'react-firebase-hooks/auth'

function Profile() {
  const [userName, setUserName] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [moviesArray, setMoviesArray] = useState([]);

  const [user,loading] = useAuthState(auth)

  return (
    <div className="profileContainer">
      <div className="profileTitle">
        <div
          className="svgContainer"
          style={{ backgroundImage: `url(${profileBg})` }}
        >
          <img src={profileLogo} alt="profileLogo"></img>
          <h1>{user?.email.split('@')[0].toUpperCase()}</h1>
        </div>
      </div>
      <div className="profileFavorites">
        <div className="favoritesTitle">
          <h1>{user?.email.split('@')[0].toUpperCase()}'s Favorites</h1>
        </div>
        <div className="favoritesContainer">
          {moviesArray.length === favorites.length ? (
            moviesArray.map((el) => {
              return (
                <Link
                  key={`${userName}.${el.id}`}
                  className="movie"
                  to={`/${el.id}`}
                >
                  <div className="movieProfileContainer">
                    <Link to="">
                      <DeleteForever
                        id={el.id}
                        className="deleteIcon"
                      />
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
