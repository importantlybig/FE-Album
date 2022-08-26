import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  deleteImage,
  uploadSingleImage,
  uploadMultipleImages,
} from "../api/image";
import { useNotification } from "../hooks";
import {
  fetchImageByAlbumId,
  shareImageToUser,
  updateImage,
} from "../api/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import UpdateImageForm from "../components/UpdateImageForm";
import Image from "../components/Image";
import Modal from "../components/Modal";
import UserList from "../components/UserList";

const SingleAlbum = () => {
  const [name, setName] = useState("");
  // upload mutiple
  const [multipleNames, setMultipleNames] = useState([]);

  console.log("multiple name");
  console.log(multipleNames);

  const [singleImage, setSingleImage] = useState("");
  // upload multiple
  const [multipleImages, setMultipleImages] = useState("");
  const [previewSingleImage, setPreviewSingleImage] = useState("");
  // Upload multiple
  const [previewMultipleImages, setPreviewMultipleImages] = useState([]);
  const [uploadSingleStatus, setUploadSingleStatus] = useState(false);
  const [uploadMultipleStatus, setUploadMultipleStatus] = useState(false);
  const [singleProgress, setSingleProgress] = useState(0);
  // upload multiple
  const [multipleProgress, setMultipleProgress] = useState(0);

  const [imageInfo, setImageInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openShareModal, setOpenShareModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [selectUserShareId, setSelectUserShareId] = useState("");
  const [selectImageId, setSelectImageId] = useState("");

  const [updateName, setUpdateName] = useState("");

  const [typeOfMultipleUpload, setTypeOfMultipleUpload] = useState(false);

  // console.log('update name value');
  // console.log(updateName);

  const handleShareAndOpenModal = (image) => {
    setOpenShareModal(true);
    // console.log("image id in share");
    // console.log(image?._id);
    setSelectImageId(image?._id);
  };

  const handleUpdateAndOpenModal = (image) => {
    setOpenUpdateModal(true);
    console.log("image id in update modal");
    console.log(image?._id);
    setSelectImageId(image?._id);
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

  const handleChangeSingle = () => {
    setTypeOfMultipleUpload(true);
  };
  const handleChangeMultiple = () => {
    setTypeOfMultipleUpload(false);
  };

  const handleUploadSingle = (e) => {
    setSingleImage(e.target.files[0]);
    // console.log(e.target.files);
    // console.log(e.target.files[0]);
    setSingleProgress(0);
  };

  const handleUploadMultiple = (e) => {
    setMultipleImages(e.target.files);
    setMultipleProgress(0);
  };

  const onSingleUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    // console.log(loaded);
    // console.log(total);
    const percentage = Math.round(((loaded / 1000) * 100) / (total / 1000));
    console.log(percentage);
    // console.log(typeof percentage);
    setSingleProgress(percentage);
  };
  const onMultipleUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    // console.log(loaded);
    // console.log(total);
    const percentage = Math.round(((loaded / 1000) * 100) / (total / 1000));
    console.log(percentage);
    // console.log(typeof percentage);
    setMultipleProgress(percentage);
  };

  const fetchAllImageByAlbumId = async () => {
    setLoading(true);
    const { error, images } = await fetchImageByAlbumId(albumId);
    if (error) return updateNotification("error", error);
    // console.log(images);
    setImageInfo(images);
    setLoading(false);
  };

  // SUBMIT SINGLE IMAGE
  const handleSubmitSingle = async (e) => {
    e.preventDefault();
    setUploadSingleStatus(true);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", singleImage);
    formData.append("name", name);
    // console.log(formData);

    const { error, image } = await uploadSingleImage(
      albumId,
      formData,
      onSingleUploadProgress
    );

    if (error) return updateNotification("error", error);

    updateNotification("success", "Upload sucessfully!");
    setName("");
    setSingleImage("");
    setPreviewSingleImage("");
    setUploadSingleStatus(false);
    setLoading(false);
    fetchAllImageByAlbumId();
  };

  // SUBMIT MULTIPLE IMAGE
  const handleSubmitMultiple = async (e) => {
    e.preventDefault();
    setUploadMultipleStatus(true);
    setLoading(true);
    const formData = new FormData();
    formData.append("multipleNames", JSON.stringify(multipleNames));
    for (let i = 0; i < multipleImages.length; i++) {
      formData.append("images", multipleImages[i]);
    }

    const { error, success } = await uploadMultipleImages(
      albumId,
      formData,
      onMultipleUploadProgress
    );

    if (error) return updateNotification("error", error);

    updateNotification("success", success);
    setMultipleNames([]);
    setMultipleImages([]);
    setPreviewMultipleImages([]);
    setUploadMultipleStatus(false);
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

  const submitUpdate = async () => {
    console.log("update image click");
    if (selectImageId) {
      const { success, error } = await updateImage(selectImageId, updateName);
      if (error) return updateNotification("error", error);
      if (success) {
        updateNotification("success", success);
        window.location.reload();
      }
    }
  };

  //PRE VIEW SINGLE IMAGE
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

  //PRE VIEW MULTIPLE IMAGES
  useEffect(() => {
    if (multipleImages.length > 0) {
      // remove url before
      for (let i = 0; i < previewMultipleImages.length; i++) {
        URL.revokeObjectURL(previewMultipleImages[i]);
      }

      //create new url
      const listURL = [];
      for (let i = 0; i < multipleImages.length; i++) {
        listURL.push(URL.createObjectURL(multipleImages[i]));
      }
      setPreviewMultipleImages(listURL);

      setMultipleNames(new Array(listURL.length).fill("")); // ["", ""]
    }
  }, [multipleImages]);

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
        <Modal setOpenModal={setOpenUpdateModal} handleSubmit={submitUpdate}>
          <h3
            className="title margin-top margin-bottom"
            style={{ textTransform: "uppercase" }}
          >
            Choose the new name to image
          </h3>
          <UpdateImageForm
            updateName={updateName}
            setUpdateName={setUpdateName}
          />
        </Modal>
      )}
      {typeOfMultipleUpload === false ? (
        <span
          className="change-upload-mode margin-top"
          onClick={handleChangeSingle}
        >
          CHANGE MODE: Upload Multiple
        </span>
      ) : (
        <span
          className="change-upload-mode margin-top"
          onClick={handleChangeMultiple}
        >
          CHANGE MODE: Upload Single
        </span>
      )}

      {typeOfMultipleUpload === false ? (
        <h3 className="center-text margin-bottom margin-top">
          UPLOAD SINGLE IMAGE
        </h3>
      ) : (
        <h3 className="center-text margin-bottom margin-top">
          UPLOAD MULTIPLE IMAGES
        </h3>
      )}

      {uploadSingleStatus && (
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
      )}

      {typeOfMultipleUpload === false && uploadSingleStatus === false && (
        <div>
          <form className="image-upload-form" onSubmit={handleSubmitSingle}>
            <div className="flex-center">
              <label className="margin-right">
                Choose Single File
                <input
                  type="file"
                  hidden
                  accept="images/*"
                  onChange={(e) => handleUploadSingle(e)}
                />
              </label>

              <div className="inline-block margin-right ">
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
        </div>
      )}

      {uploadMultipleStatus && (
        <span className="style-circular-progresss margin-bottom">
          <p className="center-text" style={{ marginBottom: "10px" }}>
            Waiting!
          </p>
          <CircularProgressbar
            value={multipleProgress}
            text={`${multipleProgress}%`}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
              textColor: "#f88",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
            style={{
              display: "block",
            }}
          />
        </span>
      )}

      {typeOfMultipleUpload === true && uploadMultipleStatus === false && (
        <div>
          <form className="image-upload-form" onSubmit={handleSubmitMultiple}>
            <div className="flex-center">
              <label className="margin-right">
                Choose Multiple Files
                <input
                  type="file"
                  hidden
                  accept="images/*"
                  multiple
                  onChange={(e) => handleUploadMultiple(e)}
                />
              </label>

              {multipleImages && multipleNames && (
                <button type="submit" className="create-album-button">
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* {uploadSingleStatus ? (
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
        <>
          {typeOfMultipleUpload === false && (
            <div>
              <form className="image-upload-form" onSubmit={handleSubmitSingle}>
                <div className="flex-center">
                  <label className="margin-right">
                    Choose Single File
                    <input
                      type="file"
                      hidden
                      accept="images/*"
                      onChange={(e) => handleUploadSingle(e)}
                    />
                  </label>

                  <div className="inline-block margin-right ">
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
            </div>
          )}

          {typeOfMultipleUpload === true && (
            <div>
              <form
                className="image-upload-form"
                onSubmit={handleSubmitMultiple}
              >
                <div className="flex-center">
                  <label className="margin-right">
                    Choose Multiple Files
                    <input
                      type="file"
                      hidden
                      accept="images/*"
                      multiple
                      onChange={(e) => handleUploadMultiple(e)}
                    />
                  </label>

                  <button type="submit" className="create-album-button">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )} */}

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

      {multipleImages && (
        <div className="preview-multi-wrap">
          {previewMultipleImages.map((image, index) => (
            <div className="preview-multi-style" key={index}>
              <img
                src={image}
                width="140px"
                height="140px"
                alt="Preview upload"
                className="margin-top"
                style={{ borderRadius: "5px" }}
              />

              <div className="form-multi-style">
                <input
                  type="text"
                  name="name"
                  placeholder="Image Name"
                  id={"name-upload-" + index}
                  onChange={(e) => {
                    const copyNewName = [...multipleNames];
                    copyNewName[index] = e.target.value;
                    setMultipleNames(copyNewName);
                  }}
                  // value={multipleNames}
                />
              </div>
            </div>
          ))}
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
