import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getIsAuth, signInUser } from "../api/user";
import { useNotification } from "../hooks";
import axios from "axios";
import jwt_decode from "jwt-decode";

export let axiosInterceptor = axios.create();

//CHECK REFRESH CODE
const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/refresh",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const AuthContext = createContext();

const defaultAuthInfo = {
  userData: null,
  isLoggedIn: false,
  isVerify: false,
  isPending: false,
  error: "",
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();

  const { userData } = authInfo;
  // console.log("user data auth");
  // console.log({ ...userData });

  axiosInterceptor.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(localStorage.getItem("auth-token"));

      // console.log("user data interceptor");
      // console.log({ ...userData });

      // console.log("---decoded");
      // console.log(decodedToken);

      //millisecond
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        // console.log("dataaaaaaaaa");
        // console.log(data);

        const newUserData = {
          ...userData,
          accessToken: data.accessToken,
        };

        // console.log("new user data 69");
        // console.log(newUserData);

        // await getIsAuth(data.accessToken);

        const refreshUser = {
          ...authInfo,
          accessToken: data.accessToken,
        };

        // console.log("user refresh");
        // console.log(refreshUser);

        const authObjectData = { ...refreshUser };
        authObjectData.userData = newUserData;
        setAuthInfo(authObjectData);
        // console.log("authh infooooo authObjectData");
        // console.log(authObjectData);

        localStorage.setItem("auth-token", data.accessToken);

        config.headers["Authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      console.log("error in interception");
      console.log(err);
      return Promise.reject(err);
    }
  );

  // console.log("line 43");
  // console.log(userData);

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });

    const { error, user } = await signInUser({ email, password });
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    console.log(user);

    navigate("/enable-2FA", { replace: true });

    setAuthInfo({
      userData: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    console.log(user);

    localStorage.setItem("auth-token", user.accessToken);
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    // console.log(token);

    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token, axiosInterceptor);
    if (error) {
      updateNotification("error", `${error}, please login again!!`);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    // console.log("user in isAuth:");
    // console.log(user);

    setAuthInfo({
      userData: { ...user, accessToken: token },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    // localStorage.removeItem("base32Secret");
    setAuthInfo({ ...defaultAuthInfo });
    navigate("/", { replace: true });
  };

  useEffect(() => {
    isAuth();
  }, []);

  const exportUserData = authInfo.userData;

  return (
    <AuthContext.Provider
      value={{ handleLogin, authInfo, handleLogout, exportUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
