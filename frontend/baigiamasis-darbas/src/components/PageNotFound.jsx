import React from "react";
import { Link } from "react-router-dom";
import imageSrc from "../assets/image.png";

const YourComponent = () => {
  const imageStyle = {
    width: "70%",
    height: "auto",
    marginLeft: "100px",
  };

  return (
    <div>
      <img src={imageSrc} alt="cat on a computer" style={imageStyle} />
      <h2>
        Uch...Panašu, kad pasiklydot... Norėdami grįžti į pagrindinį puslapį
        spauskite{" "}
        <Link style={{ color: " #c770d5" }} to="/">
          ČIA
        </Link>
      </h2>
    </div>
  );
};

export const PageNotFound = () => (
  <div
    style={{
      margin: "50px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "lightpink",
    }}
  >
    <YourComponent />
  </div>
);
