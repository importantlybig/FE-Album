import React, { useEffect, useState } from "react";
import OpenSeaDragon from "openseadragon";

const OpenSeaDragonViewer = ({ image }) => {
  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    if (image && viewer) {
      viewer.open(image.source);
    }
  }, [image]);
  const InitOpenseadragon = () => {
    viewer && viewer.destroy();
    setViewer(
      OpenSeaDragon({
        id: "openSeaDragon",
        prefixUrl: "//openseadragon.github.io/openseadragon/images/",
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 1,
        visibilityRatio: 1,
        zoomPerScroll: 2,
      })
    );
  };
  useEffect(() => {
    InitOpenseadragon();
    return () => {
      viewer && viewer.destroy();
    };
  }, []);
  const height = `${
    (image?.source.Image.Size.Height / image?.source.Image.Size.Width) * 600
  }px`;
  // console.log(image);
  // console.log(height);
  return (
    <div
      id="openSeaDragon"
      style={{
        height: height,
        width: "600px",
        backgroundColor: "black",
        margin: "auto",
      }}
    ></div>
  );
};

export default OpenSeaDragonViewer;
