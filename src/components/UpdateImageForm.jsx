import React from "react";

const UpdateImageForm = () => {
  return (
    <>
      <div className="inline-block update-image">
        <label htmlFor="name" style={{ marginLeft: "10px" }}>
          New Image Name:{" "}
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter new image name"
          style={{ marginLeft: "10px" }}
          //   onChange={(e) => setName(e.target.value)}
          //   value={name}
        />
      </div>
    </>
  );
};

export default UpdateImageForm;
