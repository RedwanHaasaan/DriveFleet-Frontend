"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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
