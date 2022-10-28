import React from "react";
import "../styles/NotFound/NotFound.css";
import { SentimentDissatisfied } from "@mui/icons-material";

function NotFound() {
  return (
    <div className="notFound">
      <h1>404 Not Found </h1>
      <SentimentDissatisfied className="sadFace" />
    </div>
  );
}

export default NotFound;
