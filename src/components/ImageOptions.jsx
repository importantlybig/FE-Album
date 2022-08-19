import React from "react";
import { Link } from "react-router-dom";
import { GrFormView, GrShareOption, GrUpdate } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

const ImageOptions = ({ visible, imagePath, onShare, onDelete, onUpdate }) => {
  if (!visible) return null;

  return (
    <>
      <div className="style-options">
        <Link to={`/image/${imagePath}`}>
          <button
            type="button"
            className="btn-option"
            style={{ marginRight: "3px", cursor: "pointer" }}
          >
            <GrFormView />
          </button>
        </Link>

        <button
          type="button"
          className="btn-option"
          style={{ marginRight: "3px", cursor: "pointer" }}
          onClick={() => {
            onShare();
          }}
        >
          <GrShareOption />
        </button>

        <button
          type="button"
          className="btn-option"
          style={{ marginRight: "3px", cursor: "pointer" }}
          onClick={() => {
            onDelete();
          }}
        >
          <AiOutlineDelete />
        </button>

        <button
          type="button"
          className="btn-option"
          style={{ cursor: "pointer" }}
          onClick={() => {
            onUpdate();
          }}
        >
          <GrUpdate />
        </button>
      </div>
    </>
  );
};

export default ImageOptions;
