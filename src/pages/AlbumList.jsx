import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createAlbum, fetchAlbumByOwner } from "../api/album";
import { useAuth, useNotification } from "../hooks";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcOpenedFolder } from "react-icons/fc";

const AlbumList = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [albumInfo, setAlbumInfo] = useState([]);

  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const ownerId = authInfo?.userData?.id;

  const fetchAlbum = async () => {
    setLoading(true);
    const { error, albumInfo } = await fetchAlbumByOwner(ownerId);
    // console.log(error);
    if (error) return updateNotification("error", error);
    console.log(albumInfo);
    setAlbumInfo(albumInfo);
    setLoading(false);
  };

  //   console.log(authInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, success } = await createAlbum({ name });
    // console.log(response);
    if (error) return updateNotification("error", error);

    updateNotification("success", success);
    setName("");
    fetchAlbum();
  };

  useEffect(() => {
    if (ownerId) {
      fetchAlbum();
    }
  }, [ownerId]);

  return (
    <div className="container">
      <form
        className="create-album margin-top margin-bottom"
        onSubmit={handleSubmit}
      >
        <div className="flex-center">
          <div className="inline-block margin-right ">
            {/* <label htmlFor="name">Album name: </label> */}
            <input
              type="text"
              name="name"
              placeholder="Enter album name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <button type="submit" className="create-album-button">
            Create
          </button>
        </div>
      </form>

      <h2>
        You have {albumInfo?.length}{" "}
        {albumInfo?.length > 2 ? "albums" : "album"} list:
      </h2>
      {/* {JSON.stringify(albumInfo)} */}
      {albumInfo?.length === 0 ? (
        <h2 className="text-danger center-text">You don't have any album</h2>
      ) : (
        <div className="album-list margin-top">
          {loading ? (
            <div className="spin-style">
              <AiOutlineLoading3Quarters
                className="animate-spin"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            </div>
          ) : (
            albumInfo?.map((album) => (
              <Link to={`/album/${album?._id}`} key={album?._id}>
                <div className="album-content">
                  <div>
                    <span style={{ marginRight: "0.8rem" }}>{album?.name}</span>
                    <small
                      style={{
                        display: "block",
                        fontSize: "0.65rem",
                        marginTop: "5px",
                      }}
                    >
                      Image: {album?.images?.length}
                    </small>
                  </div>
                  <span>
                    <FcOpenedFolder
                      style={{
                        width: "23px",
                        height: "23px",
                        marginTop: "-3px",
                      }}
                    />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumList;
