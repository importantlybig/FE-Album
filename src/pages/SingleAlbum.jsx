import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteImage, uploadSingleImage } from "../api/image";
import { useNotification } from "../hooks";
import { fetchImageByAlbumId, shareImageToUser } from "../api/image";
import UpdateImageForm from "../components/UpdateImageForm";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "../components/Image";
import Modal from "../components/Modal";
import UserList from "../components/UserList";

const SingleAlbum = () => {
  const [name, setName] = useState("");
  // const [nowSelect, setNowSelect] = useState(null);
  const [singleImage, setSingleImage] = useState("");
  const [previewSingleImage, setPreviewSingleImage] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [singleProgress, setSingleProgress] = useState(0);

  const [imageInfo, setImageInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openShareModal, setOpenShareModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [selectUserShareId, setSelectUserShareId] = useState("");
  const [selectImageId, setSelectImageId] = useState("");

  // console.log(selectUserShareId);

  const handleShareAndOpenModal = (image) => {
    setOpenShareModal(true);
    // setNowSelect(image);
    console.log("image id");
    console.log(image?._id);
    setSelectImageId(image?._id);
    // console.log("clicked");
  };

  const handleUpdateAndOpenModal = (image) => {
    setOpenUpdateModal(true);
    console.log("image id in update modal");
    console.log(image?._id);
  };

  const handleDeleteAndOpenModal = (image) => {
    setOpenDeleteModal(true);
    // console.log("delete image id hereee");
    // console.log(image._id);
    setSelectImageId(image?._id);
  };

  // console.log("image Info: ---------------");
  // console.log(imageInfo);

  const params = useParams();
  const { albumId } = params;

  const { updateNotification } = useNotification();

  // console.log(singleImage);

  const handleUploadSingle = (e) => {
    setSingleImage(e.target.files[0]);
    console.log(e.target.files);
    console.log(e.target.files[0]);
    setSingleProgress(0);
  };

  const onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    // console.log(loaded);
    // console.log(total);
    const percentage = Math.round(((loaded / 1000) * 100) / (total / 1000));
    console.log(percentage);
    // console.log(typeof percentage);
    setSingleProgress(percentage);
  };

  const fetchAllImageByAlbumId = async () => {
    setLoading(true);
    const { error, images } = await fetchImageByAlbumId(albumId);
    if (error) return updateNotification("error", error);
    // console.log(images);
    setImageInfo(images);
    setLoading(false);
  };

  const handleSubmitSingle = async (e) => {
    e.preventDefault();
    setUploadStatus(true);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", singleImage);
    formData.append("name", name);
    // console.log(formData);

    const { error, image } = await uploadSingleImage(
      albumId,
      formData,
      onUploadProgress
    );

    if (error) return updateNotification("error", error);

    updateNotification("success", "Upload sucessfully!");
    setName("");
    setSingleImage("");
    setPreviewSingleImage("");
    setUploadStatus(false);
    setLoading(false);
    fetchAllImageByAlbumId();
  };

  const submitShare = async () => {
    console.log("clicked");
    if (selectImageId && selectUserShareId) {
      const { error, result, success } = await shareImageToUser(
        selectImageId,
        selectUserShareId
      );
      if (error) {
        updateNotification("error", error);
        setOpenShareModal(false);
      }
      if (success) {
        updateNotification("success", success);
        window.location.reload();
      }
    }
  };

  const submitDelete = async () => {
    if (selectImageId) {
      const { error, success } = await deleteImage(selectImageId);
      if (error) return updateNotification("error", error);
      if (success) {
        updateNotification("success", success);

        window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (!singleImage) {
      setPreviewSingleImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(singleImage);
    setPreviewSingleImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [singleImage]);

  useEffect(() => {
    fetchAllImageByAlbumId();
  }, [albumId]);

  return (
    <div className="container">
      {openShareModal && (
        <Modal setOpenModal={setOpenShareModal} handleSubmit={submitShare}>
          <h3 className="title margin-top margin-bottom">
            Select 1 User to share.
          </h3>
          <UserList userSelected={setSelectUserShareId} />
        </Modal>
      )}

      {openDeleteModal && (
        <Modal setOpenModal={setOpenDeleteModal} handleSubmit={submitDelete}>
          <h3
            className="title margin-top margin-bottom"
            style={{ textTransform: "uppercase" }}
          >
            Are you sure ?
          </h3>
        </Modal>
      )}

      {openUpdateModal && (
        <Modal setOpenModal={setOpenUpdateModal} handleSubmit={submitDelete}>
          <h3
            className="title margin-top margin-bottom"
            style={{ textTransform: "uppercase" }}
          >
            Choose the new name to image
          </h3>
          <UpdateImageForm />
        </Modal>
      )}
      <h3 className="center-text margin-bottom margin-top">
        UPLOAD SINGLE IMAGE
      </h3>
      {uploadStatus ? (
        <span className="style-circular-progresss margin-bottom">
          <p className="center-text" style={{ marginBottom: "10px" }}>
            Waiting!
          </p>
          <CircularProgressbar
            value={singleProgress}
            text={`${singleProgress}%`}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
              textColor: "#f88",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
            style={{
              display: "block",
            }}
          />
        </span>
      ) : (
        <form className="image-upload-form" onSubmit={handleSubmitSingle}>
          <div className="flex-center">
            <label className="margin-right">
              Choose File
              <input
                type="file"
                hidden
                accept="images/*"
                onChange={(e) => handleUploadSingle(e)}
              />
            </label>

            <div className="inline-block margin-right ">
              {/* <label htmlFor="name">Image name: </label> */}
              <input
                type="text"
                name="name"
                placeholder="Image name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            {singleImage && name && (
              <button type="submit" className="create-album-button">
                Upload
              </button>
            )}
          </div>
        </form>
      )}
      {previewSingleImage && (
        <div className="center-text margin-top margin-bottom">
          <img
            src={previewSingleImage}
            width="120px"
            height="120px"
            alt="Preview upload"
            className="margin-top"
          />
        </div>
      )}
      {loading ? (
        <div className="single-album-spin">
          <AiOutlineLoading3Quarters
            className="animate-spin"
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        </div>
      ) : (
        <>
          <h3 className="margin-bottom margin-top">
            You have {imageInfo?.length}{" "}
            {imageInfo?.length > 1 ? "images" : "image"} :
          </h3>
          {imageInfo?.length > 0 &&
            imageInfo.map((image) => (
              <Image
                image={image}
                key={image?._id}
                handleOnShareClick={() => handleShareAndOpenModal(image)}
                handleOnDeleteClick={() => handleDeleteAndOpenModal(image)}
                handleOnUpdateClick={() => handleUpdateAndOpenModal(image)}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default SingleAlbum;
