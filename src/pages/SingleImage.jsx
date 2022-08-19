import React, { useEffect, useState } from "react";
import OpenSeaDragonViewer from "../components/OpenSeaDragonViewer ";
import { useNavigate, useParams } from "react-router-dom";
import { getImageById } from "../api/image";
import { useNotification } from "../hooks";

const SingleImage = () => {
  const [singleImageInfo, setSingleImageInfo] = useState(null);
  const [imageStatus, setImageStatus] = useState(false);

  // console.log(imageStatus);

  const params = useParams();
  const { imagePath, imageId } = params;

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const getImage = async () => {
    const { error, result, status } = await getImageById(imageId);
    if (status === false) {
      return navigate("/");
    }

    if (error) return updateNotification("error", error);
    setSingleImageInfo(result);
    setImageStatus(status);
  };

  useEffect(() => {
    getImage();
  }, [imageId]);

  // console.log(singleImageInfo);

  return (
    <div
      className="container"
      id="openseadragon"
      style={{ height: "84vh", display: "flex" }}
    >
      <OpenSeaDragonViewer
        image={{
          source: {
            Image: {
              Format: "png",
              Overlap: 0,
              Size: {
                Height: singleImageInfo?.height,
                Width: singleImageInfo?.width,
              },
              TileSize: 256,
              Url:
                "http://localhost:8000/api/image/get-image-for-os/" +
                imagePath +
                "/",

              xmlns: "http://schemas.microsoft.com/deepzoom/2008",
            },
          },
        }}
      />
    </div>
  );
};

export default SingleImage;
