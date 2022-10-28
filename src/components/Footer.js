import React from "react";
import { Button } from "@mui/material";
import { SkipPreviousOutlined, SkipNextOutlined } from "@mui/icons-material";

import "../styles/Footer/Footer.css";
import { useLocation } from "react-router";

function Footer({ numberOfPages, setPage, page }) {
  const nextPage = () => {
    if (page < numberOfPages) {
      setPage(page + 1);
    } else alert("This is the last page");
  };
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else alert(`You're on the first page`);
  };
  const currentPath = useLocation().pathname;
  if (currentPath !== "/") return <></>;
  else
    return (
      <div className="pageButtonsContainer">
        <Button
          onClick={previousPage}
          variant="contained"
          startIcon={<SkipPreviousOutlined />}
        >
          Previous Page
        </Button>
        <Button
          onClick={nextPage}
          variant="contained"
          endIcon={<SkipNextOutlined />}
        >
          Next Page
        </Button>
      </div>
    );
}

export default Footer;
