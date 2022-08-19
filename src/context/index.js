import React from "react";

import NotificationProvider from "./Notification";
import AuthProvider from "./AuthProvider";

export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <AuthProvider>{children}</AuthProvider>
    </NotificationProvider>
  );
}
