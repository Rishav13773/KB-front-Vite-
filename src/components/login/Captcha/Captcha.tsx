// Captcha.tsx

import React from "react";

interface CaptchaProps {
  imgSrc: string;
  captchaString: string;
}

const Captcha: React.FC<CaptchaProps> = ({ imgSrc, captchaString }) => {
  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomSpacing = () => {
    const spacing = getRandomValue(0, 10); // Adjust the range as needed
    return `${spacing}px`;
  };

  const getRandomSize = () => {
    return getRandomValue(30, 56); // Adjust the range as needed
  };

  const getRandomWeight = () => {
    return getRandomValue(100, 900); // Adjust the range as needed
  };

  const getRandomColor = () => {
    const darkColors = ["text-red-800", "text-orange-500", "text-lime-700", "text-indigo-800", "text-amber-400", "ext-green-800"];
    const randomIndex = getRandomValue(0, darkColors.length - 1);
    return darkColors[randomIndex];
  };

  const spacedCaptchaString = captchaString
    .split("")
    .map((char, index) => (
      <span
        key={index}
        style={{
          marginRight: getRandomSpacing(),
          fontSize: `${getRandomSize()}px`,
          fontWeight: getRandomWeight(),
          color: getRandomColor(),
        }}
      >
        {char}
      </span>
    ));

  return (
    <div className="relative w-48 h-auto">
      <img src={imgSrc} alt="Captcha" className="w-full h-auto" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full">
        <h2>{spacedCaptchaString}</h2>
      </div>
    </div>
  );
};

export default Captcha;
