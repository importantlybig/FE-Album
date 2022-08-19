import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeOutId;
export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");

  const updateNotification = (type, value) => {
    if (timeOutId) clearTimeout(timeOutId);

    switch (type) {
      case "error":
        setClasses("bg-red");
        break;
      case "success":
        setClasses("bg-success");
        break;
      case "warning":
        setClasses("bg-orange");
        break;
      default:
        setClasses("bg-red");
    }
    setNotification(value);

    timeOutId = setTimeout(() => {
      setNotification("");
    }, 3500);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="wrapper-notification">
          <div className="bounce-custom custom-notification">
            <p className={classes + " content-notification"}>{notification}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
