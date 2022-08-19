import React from "react";
import { useState, useEffect } from "react";
import { ImSpinner3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../hooks";
import { createUser } from "../api/user";

const validateUserInfo = ({ name, email, password }) => {
  //const isValidName = /^[a-z A-Z]+$/;
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!name.trim()) return { ok: false, error: 'Missing "name" field!' };
  //if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: 'Missing "email" field!' };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim())
    return { ok: false, error: 'Missing "password" field!' };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  // console.log(`regis: ${isLoggedIn}`);

  //console.log({ ...userInfo });

  const handleChange = ({ target }) => {
    //console.log(target.value, target.name);
    const { value, name } = target;
    //console.log({ ...userInfo });
    //console.log({ [name]: value });
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) {
      setLoading(false);
      updateNotification("error", error);
    }

    const response = await createUser(userInfo);
    //console.log(response);
    if (response.error) return console.log(response.error);
    updateNotification("success", "Successful Registration!");
    setLoading(false);

    navigate("/login");
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const { name, email, password } = userInfo;

  return (
    <div className="container container-center">
      <div className=" grid grid--2-cols">
        <div className="register-image">
          <img
            src="./TAPTAP01.png"
            width="60%"
            height="60%"
            alt="TAPTAP register"
          />
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="center-text">Register Form</h2>
          <div className="margin-bottom">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              value={name}
            />
          </div>
          <div className="margin-bottom">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="margin-bottom">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              value={password}
            />
          </div>

          <button type="submit">
            {loading ? <ImSpinner3 className="animate-spin" /> : "Register"}
          </button>

          <span className="center-text">
            You already have an account ? <Link to="/login">Login</Link> here
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
