import React from "react";
import Lottie from "react-lottie";
import animationData from "../../lotties/flag";

const FlagLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height="auto" width="auto" />;
};

export default FlagLoader;
