import React from "react";
import { useState, useEffect } from "react";
import { ImSpinner3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../hooks";

const validateUserInfo = ({ email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email.trim()) return { ok: false, error: 'Missing "email" field!' };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim())
    return { ok: false, error: 'Missing "password" field!' };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    handleLogin(userInfo.email, userInfo.password);
    updateNotification("success", "Login successfully!");
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <div className="container container-center">
      <div className=" grid grid--2-cols">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="center-text">Login Form</h2>
          <div className="margin-bottom">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter you email"
              onChange={handleChange}
              value={userInfo.email}
            />
          </div>
          <div className="margin-bottom">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              value={userInfo.password}
            />
          </div>

          <button type="submit">
            {isPending ? <ImSpinner3 className="animate-spin" /> : "Submit"}
          </button>

          <span className="center-text">
            You need an account ? <Link to="/register">Register</Link> here
          </span>
        </form>

        <div>
          <img
            src="./TAPTAP02.png"
            width="90%"
            height="90%"
            alt="TAPTAP Login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
