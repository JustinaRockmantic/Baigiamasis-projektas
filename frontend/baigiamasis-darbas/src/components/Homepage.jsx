import React from "react";
import imageSrc from "../assets/partycat01.png";

const YourHomeComponent = () => {
  const imageStyle = {
    width: "100%",
    height: "auto",
  };

  return (
    <div>
      <h2
        style={{
          color: "cornflowerblue",
        }}
      >
        Hey! Smagu Jus matyti! O dar smagiau žinoti, kad bent ši kodo dalis
        veikia...
      </h2>
      <img src={imageSrc} alt="party cat" style={imageStyle} />
    </div>
  );
};

export const Homepage = () => {
  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "lightpink",
      }}
    >
      <YourHomeComponent />
    </div>
  );
};
