import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/Notification";

export const useNotification = () => useContext(NotificationContext);
export const useAuth = () => useContext(AuthContext);
