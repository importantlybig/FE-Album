import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BsFolderPlus } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../hooks";

const Header = () => {
  const { pathname } = useLocation();
  const registerPage = pathname === "/register";
  const loginPage = pathname === "/login";
  const albumPage = pathname === "/album";

  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  //console.log(isLoggedIn);

  return (
    <>
      <header>
        <Link to="/" className="unstyle">
          {/* <img
            src="./TAPTAP.png"
            alt="Application logo"
            width="̀30px"
            height="30px"
          /> */}
          <h1>ALBUM</h1>
        </Link>

        <nav className="main-nav">
          <ul className="main-nav-list">
            {isLoggedIn === true ? (
              <>
                <li>
                  <Link
                    to="/album"
                    className={`flex-center unstyle ${
                      albumPage && "currentPage"
                    }`}
                    // className={`album-button ${albumPage && "currentPage"}`}
                  >
                    <span>Album List &nbsp; </span>
                    <span>
                      <BsFolderPlus />
                    </span>
                  </Link>
                </li>
                <li>
                  <div
                    onClick={handleLogout}
                    className="logout-button flex-center"
                    style={{ border: "1px solid #F7CC15" }}
                  >
                    <span>Logout</span> &nbsp;
                    <span>
                      <AiOutlineLogout />
                    </span>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/register"
                    className={`main-nav-link ${registerPage && "currentPage"}`}
                  >
                    Register
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    className={`main-nav-link ${loginPage && "currentPage"}`}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
