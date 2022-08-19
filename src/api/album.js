import axios from "axios";
import { axiosInterceptor } from "../context/AuthProvider";

const getToken = () => localStorage.getItem("auth-token");

const client = axios.create({ baseURL: "http://localhost:8000/api" });

// export const createAlbum = async (name, axiosInterceptor) => {
export const createAlbum = async (name) => {
  const token = getToken();
  console.log("token in album create 67");
  console.log(token);
  try {
    const { data } = await axiosInterceptor.post(
      "http://localhost:8000/api/album/create",
      name,
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

// export const fetchAlbumByOwner = async (ownerId) => {
//   try {
//     const { data } = await client.get(`/album/getAlbumByOwner/${ownerId}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//     const { response } = error;
//     if (response?.data) return response.data;

//     return { error: error.message || error };
//   }
// };
export const fetchAlbumByOwner = async (ownerId) => {
  try {
    const { data } = await axiosInterceptor.get(
      `http://localhost:8000/api/album/getAlbumByOwner/${ownerId}`
    );
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
