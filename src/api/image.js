// import axios from "axios";
import { axiosInterceptor } from "../context/AuthProvider";

const getToken = () => localStorage.getItem("auth-token");

export const uploadSingleImage = async (albumId, dataImage, options) => {
  const token = getToken();
  try {
    const { data } = await axiosInterceptor.post(
      `http://localhost:8000/api/image/upload-single/${albumId}`,
      dataImage,
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
        onUploadProgress: options,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const fetchImageByAlbumId = async (albumId) => {
  try {
    const { data } = await axiosInterceptor.get(
      `http://localhost:8000/api/image/image-by-album/${albumId}`
    );
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getImageById = async (imageId) => {
  const token = getToken();
  try {
    const { data } = await axiosInterceptor.get(
      `http://localhost:8000/api/image/image-by-id/${imageId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const shareImageToUser = async (imageId, userShareId) => {
  const token = getToken();
  try {
    const { data } = await axiosInterceptor.post(
      `http://localhost:8000/api/image/share-image-to-user/${imageId}`,
      { userShareId },
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const deleteImage = async (imageId) => {
  const token = getToken();
  try {
    const { data } = await axiosInterceptor.delete(
      `http://localhost:8000/api/image/delete-image/${imageId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
