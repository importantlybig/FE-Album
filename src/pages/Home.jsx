import React from "react";
import { Link } from "react-router-dom";
import { BsFolderPlus } from "react-icons/bs";
import { useAuth } from "../hooks";
import axios from "axios";

const Home = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  console.log("page  HOME:");
  console.log({ authInfo });

  // console.log("page 10 HOME:");
  // console.log({ ...userData });
  // const accessToken = localStorage.getItem("auth-token");
  // console.log(`Home accesstoken ${accessToken}`);

  // const refreshToken = () => {
  //   axios.post(
  //     "http://localhost:8000/api/user/refresh",
  //     {},
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // };

  // const refreshToken = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/user/refresh",
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const click = () => {
  //   axios.get("http://localhost:8000/api/user/getCookie", {
  //     withCredentials: true,
  //   });
  // };

  return (
    <div className="container">
      <div className="center-text">
        <h2 className="margin-top">
          It's look like you don't have any album of your own!
        </h2>
        <button className="create-album-btn margin-top">
          <Link to={isLoggedIn ? "/album" : "/login"} className="unstyle">
            Create now &nbsp; <BsFolderPlus />
          </Link>
        </button>

        {/* <button style={{ cursor: "pointer" }} onClick={() => click()}>
          Get cookie
        </button>

        <button style={{ cursor: "pointer" }} onClick={() => refreshToken()}>
          Refresh Cookie
        </button> */}
      </div>
    </div>
  );
};

export default Home;
