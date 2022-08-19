import axios from "axios";
import { axiosInterceptor } from "../context/AuthProvider";
const client = axios.create({ baseURL: "http://localhost:8000/api" });

// const accessToken = localStorage.getItem("auth-token");
const getToken = () => localStorage.getItem("auth-token");

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-up", userInfo);
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-in", userInfo, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

// export const getIsAuth = async (token) => {
//   try {
//     const { data } = await client.get("/user/is-auth", {
//       headers: {
//         Authorization: "Bearer " + token,
//         accept: "application/json",
//       },
//     });
//     return data;
//   } catch (error) {
//     const { response } = error;
//     if (response?.data) return response.data;

//     return { error: error.message || error };
//   }
// };

export const getIsAuth = async (token, axiosInterceptor) => {
  try {
    const { data } = await axiosInterceptor.get(
      "http://localhost:8000/api/user/is-auth",
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const enable2FA = async () => {
  const token = getToken();
  try {
    const { data } = await axiosInterceptor.post(
      "http://localhost:8000/api/user/enable2FA",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    const { response } = error;
    console.log(response?.data);
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verify2FA = async (scanInfo) => {
  const token = getToken();
  try {
    const { data } = await axiosInterceptor.post(
      "http://localhost:8000/api/user/verify2FA",
      scanInfo,
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      }
    );
    console.log(`data api ${data}`);
    return data;
  } catch (error) {
    const { response } = error;
    console.log(response?.data);
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const fetchAllUsers = async () => {
  const token = getToken();
  try {
    const { data } = await axiosInterceptor.get(
      "http://localhost:8000/api/user/users",
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      }
    );

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
