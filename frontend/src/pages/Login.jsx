import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

import Spinner from "../component/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); //setting up our state, and we only select email and password as the accepted login details

  const { email, password } = formData; //destructure form data

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //selecting value from our state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //like any use effect we are trying to load this as soon as the page loads
  useEffect(() => {
    //if theres an error
    if (isError) {
      toast.error(message);
    }

    //redirect when login
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset);
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handling form submittion
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>

        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              className="from-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              className="from-control"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
