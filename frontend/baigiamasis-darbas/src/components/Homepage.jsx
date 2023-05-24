import React from "react";
import Confetti from "react-confetti";
import imageSrc from "../assets/partycat01.png";

const YourHomeComponent = () => {
  const imageStyle = {
    width: "100%",
    height: "auto",
  };

  return (
    <div>
      <h2 style={{ color: "cornflowerblue" }}>
        Hey! Ar Jūs pasiruošę švęsti? 🥂🎉
      </h2>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
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
        position: "relative",
      }}
    >
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <YourHomeComponent />
    </div>
  );
};
