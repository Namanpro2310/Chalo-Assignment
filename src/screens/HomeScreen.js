import React from "react";
import Typewriter from "typewriter-effect";
import chaloBackground from "../assets/bus-feature.jpeg";

const HomeScreen = () => {
  return (
    <div
      className="animated-text"
      style={{
        backgroundImage: `url(${chaloBackground})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("Hi! Welcome to Chalo! <br/>")
            .pauseFor(1500)
            .typeString("Click on 'Add Routes' to start adding routes.")
            .start();
        }}
      />
    </div>
  );
};
export default HomeScreen;
