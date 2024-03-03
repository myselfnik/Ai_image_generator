import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import defaultImg from "../Assets/default_image.svg";

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const [loading, setloading] = useState(false);
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setloading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setloading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={image_url === "/" ? defaultImg : image_url}
            alt="AI Default Image"
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
        <div className="search-box">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Describe the image you wanna create."
          />

          <div
            className="generate-btn"
            onClick={() => {
              imageGenerator();
            }}
          >
            Generate
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
