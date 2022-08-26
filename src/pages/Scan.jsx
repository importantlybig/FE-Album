import React from "react";
import { useState } from "react";
import { FaHandPointRight, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { enable2FA, verify2FA } from "../api/user";
import { useAuth, useNotification } from "../hooks";

const Scan = () => {
  const [QR, setQR] = useState("");
  const [show, setShow] = useState(false);
  const [tokenOTP, setTokenOTP] = useState("");

  const navigate = useNavigate();
  const { exportUserData } = useAuth();
  const { updateNotification } = useNotification();

  const base32Secret = exportUserData?.base32Secret;

  console.log("user data at scan page");
  console.log(exportUserData);

  const verify = exportUserData?.isVerify;

  const handleEnable2FA = async () => {
    const { renderQR, error } = await enable2FA();
    if (error) return updateNotification("error", error);
    setQR(renderQR);

    setShow(true);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const { error } = await verify2FA({ tokenOTP, base32Secret });
    if (error) return updateNotification("error", error);
    updateNotification("success", "Succesful verification");
    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="container scan-page">
      {verify === false && !show && (
        <div className="center-text margin-top">
          <h2 className="padding-x-5">
            This is the first time you access to the application, please click
            the below button to verify.
          </h2>
          <button className="verify-btn margin-top" onClick={handleEnable2FA}>
            <FaHandPointRight /> Verify
          </button>
        </div>
      )}
      {show && (
        <>
          <div className="center-text scan-placeholder">
            <div className="scan-qr">
              <h3>Use Authenticator application to scan QR</h3>
              <FaArrowDown
                style={{ width: "45px", height: "45px", marginTop: "0.7rem" }}
              />
              <div dangerouslySetInnerHTML={{ __html: QR }}></div>
              <form onSubmit={handleVerify}>
                <input
                  type="text"
                  placeholder="Enter QR  code"
                  name="tokenOTP"
                  onChange={(e) => setTokenOTP(e.target.value)}
                  value={tokenOTP}
                />
                <br />
                <button type="submit" className="scan-button">
                  Submit{" "}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      {/* {verify === true ? <input type="text" placeholder="Enter QR code" /> : ""} */}
      {verify === true ? (
        <div className="center-text scan-placeholder">
          <div className="scan-qr">
            <h3 style={{ padding: "0 12rem" }}>
              You have verified the code before, now just entering the code in
              the Authenticator app
            </h3>

            <form onSubmit={handleVerify}>
              <div>
                <input
                  type="text"
                  placeholder="Enter QR  code"
                  style={{ marginTop: "0.8rem" }}
                  onChange={(e) => setTokenOTP(e.target.value)}
                  value={tokenOTP}
                />
                <br />
                <button type="submit" className="verify-scan-button">
                  Submit{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Scan;
