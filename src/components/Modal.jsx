import React from "react";

const Modal = ({ setOpenModal, handleSubmit, children }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        {/* <div className="title">
        <h3>Are You Sure You Want to Continue?</h3>
      </div>
      <div className="body">
        <p>The next page looks amazing. Hope you want to go there!</p>
      </div> */}
        {children}
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
