import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../component/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  }); //setting up our state, and those value are the accepted value for registration

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();

  //selecting value from our state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

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

    if (password !== password2) {
      toast.error("Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>

        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              className="from-control"
              required
            />
          </div>
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
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm your password"
              className="from-control"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
