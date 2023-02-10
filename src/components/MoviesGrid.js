import "../styles/MoviesGrid/MoviesGrid.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";


export const imageUrl = "https://image.tmdb.org/t/p/original/";


function MoviesGrid({ results }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div id="moviesContainer">
      {results ? (
        results.map((el) => {
          return (
            <Link key={el.id} className="movie" to={`/${el.id}`}>
              <div className="moviePosterContainer">
                {loading ? (
                  <Skeleton height={304} width={214} />

                ) : (
                  <img
                    className="gridImg"
                    src={`${imageUrl}${el.poster_path}`}
                    alt="Avatar"
                  />
                )}

                <div className="movieDescription">
                  <p>{loading ? <Skeleton /> : el.title}</p>
                  <p>{loading ? <Skeleton /> : el.release_date}</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default MoviesGrid;
