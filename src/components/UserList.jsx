import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
import { fetchAllUsers } from "../api/user";
import { useNotification } from "../hooks";

const UserList = ({ userSelected }) => {
  const [allUserData, setAllUserData] = useState([]);

  const { updateNotification } = useNotification();

  const fetchUsers = async () => {
    const { users, error } = await fetchAllUsers();
    if (error) return updateNotification("error", error);
    setAllUserData(users);
    // console.log(users);
  };

  //   console.log("line 19");
  //   console.log(selectIdUser);

  //   const handleChangeId = (e) => {
  //     setSelectIdUser()
  //     // console.log("selected");
  //   };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    // <div className="container">
    <select
      className="classic margin-bottom"
      onChange={(e) => {
        userSelected(e.target.value);
      }}
      defaultValue={""}
    >
      <>
        <option disabled value="">
          Please select a user
        </option>
        {allUserData.map((user, index) => (
          <option key={user?._id} value={user?._id}>
            {user?.email}
          </option>
        ))}
      </>
    </select>
    // </div>
  );
};

export default UserList;
