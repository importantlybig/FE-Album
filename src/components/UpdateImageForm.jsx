import React from "react";

const UpdateImageForm = ({ updateName, setUpdateName }) => {
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
          onChange={(e) => setUpdateName(e.target.value)}
          value={updateName}
        />
      </div>
    </>
  );
};

export default UpdateImageForm;
