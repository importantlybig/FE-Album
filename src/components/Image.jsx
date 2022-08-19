import React, { useState } from "react";
import ImageOptions from "./ImageOptions";

const Image = ({
  image,
  handleOnShareClick,
  handleOnDeleteClick,
  handleOnUpdateClick,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  // const tokenOwner = localStorage.getItem("auth-token");

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  // const handleOnViewClick = (image) => {
  //   console.log(image);
  // };

  return (
    <div
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className="style-parent-options"
    >
      <img
        src={`http://localhost:8000/api/image/getImage?file=${image?.path}`}
        alt="Image in album"
        height="200px"
        style={{ margin: "0.5rem", borderRadius: "20px" }}
      />

      {image?.owner && (
        <ImageOptions
          image={image}
          visible={showOptions}
          imagePath={`${image?.path?.split(".")[0]}/${image?._id}
          `}
          onShare={handleOnShareClick}
          onDelete={handleOnDeleteClick}
          onUpdate={handleOnUpdateClick}
        />
      )}
    </div>
  );
};

export default Image;
