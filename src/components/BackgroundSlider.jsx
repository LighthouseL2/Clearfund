"use client";
import { useState, useEffect } from "react";

export default function BackgroundSlider() {
  const images = [
    "/good-builders-bg.png",
    "/celo-public-good-bg.png",
    // "/gitcoin-public-good-bg.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 9000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="
        relative w-full mx-auto overflow-hidden rounded-2xl
        aspect-[16/9]               /* Mobile: responsive aspect ratio */
        md:aspect-auto md:h-[280px] md:max-w-5xl
      "
    >
      {/* Background Image */}
      <div
        className="
          absolute inset-0 bg-center transition-opacity duration-700
          bg-contain bg-no-repeat   
        "
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>

      {/* <div className="absolute inset-0 bg-black/10"></div> */}

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black w-8 h-8 rounded-full flex items-center justify-center z-10"
      >
        <span className="text-lg">&larr;</span>
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black w-8 h-8 rounded-full flex items-center justify-center z-10"
      >
        <span className="text-lg">&rarr;</span>
          </button>
          
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/60"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
