import "../styles/MoviesGrid/MoviesGrid.css";
import React from "react";
import { Link } from "react-router-dom";
export const imageUrl = "https://image.tmdb.org/t/p/original/";

function MoviesGrid({ results, user }) {
  return (
    <>
      <h1 className="title">TMDB</h1>
      <div id="moviesContainer">
        {results ? (
          results.map((el) => {
            return (
              <Link key={el.id} className="movie" to={`/${el.id}`}>
                <div>
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
          <p>Loading</p>
        )}
      </div>
    </>
  );
}

export default MoviesGrid;
