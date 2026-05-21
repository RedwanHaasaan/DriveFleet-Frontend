"use client";

import Lottie from "lottie-react";

export default function LottiePlayer({
  animationData,
  loop = true,
  autoplay = true,
  className = "",
  style = {},
  onComplete,
}) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
      onComplete={onComplete}
    />
  );
}