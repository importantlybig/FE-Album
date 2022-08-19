import { Route, Routes } from "react-router-dom";
import Protected from "./routes/Protected";
import Public from "./routes/Public";

import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Scan from "./pages/Scan";
import AlbumList from "./pages/AlbumList";
import SingleAlbum from "./pages/SingleAlbum";
import SingleImage from "./pages/SingleImage";
import NotFound from "./pages/NotFound";

import UserList from "./components/UserList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/album" element={<Album />} />
        <Route path="/enable-2FA" element={<Scan />} /> */}
        <Route path="/" element={<Home />} />
        <Route element={<Public />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<Protected />}>
          <Route path="/enable-2FA" element={<Scan />} />
          <Route path="/album" element={<AlbumList />} />
          <Route path="/album/:albumId" element={<SingleAlbum />} />
          <Route path="/image/:imagePath/:imageId" element={<SingleImage />} />
          <Route path="/userlist" element={<UserList />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
