import React, { useEffect, useState } from "react";
import "../styles/Profile/Profile.css";
import profileBg from "../styles/profileBg.svg";
import profileLogo from "../styles/profileLogo.jpg";
import { DeleteForever } from "@mui/icons-material";
import { imageUrl } from "./MoviesGrid";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector, useDispatch } from "react-redux";
import { getAllFavorites, removeFromFavorites } from "../states/users";
import Skeleton from "react-loading-skeleton";

function Profile() {
  const dispatch = useDispatch();
  const { userFavorites } = useSelector((state) => state.users);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.uid) {
      dispatch(getAllFavorites(user.uid));
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
          {userFavorites?.length ? (
            userFavorites.map((el) => {
              return (
                <Link key={el.id} className="movie" to={`/${el.id}`}>
                  {loading ? (
                    <Skeleton height={414} width={214} borderRadius={20}/>
                  ) : (
                    <div className="movieProfileContainer">
                      <Link
                        onClick={() => {
                          dispatch(
                            removeFromFavorites({
                              movieId: el.id,
                              userId: user.uid,
                            })
                          );
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
                  )}
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
