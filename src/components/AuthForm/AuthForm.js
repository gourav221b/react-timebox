import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./AuthForm.css";
const AuthForm = (props) => {
  return (
    <section className="authFormWrapper">
      <section className="authForm col-md-4">
        {props?.type === "login" ? <Login /> : <Register />}
      </section>
      <section className="authFormImage col-md-7"></section>
    </section>
  );
};
const Login = () => {
  const navigate = useNavigate();
  let username = "gg";
  let password = "12345";
  const handleLogin = () => {
    if (
      document?.getElementById("username").value == username &&
      document?.getElementById("password").value == password
    ) {
      navigate("/todo");
    }
  };
  return (
    <div className="authFormSection">
      <div className="authFormTop">
        <div className="authTitle">Log In</div>
        <div className="authDesc">Let's get work started today</div>
      </div>
      <form className="authFormControlDiv">
        <div className="inputDiv">
          <div class="input-group">
            <input
              required
              type="text"
              id="username"
              name="username"
              autocomplete="off"
              class="input"
              placeholder="Enter your username"
            />
          </div>
          <div class="input-group">
            <input
              required
              type="text"
              id="password"
              name="password"
              autocomplete="off"
              class="input"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="btn submitBtn" onClick={() => handleLogin()}>
          Log In
        </div>
        <div className="btn submitBtn googleBtn flex items-center content-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
            alt=""
          />{" "}
          Log In with Google
        </div>
      </form>
      <div className="authFormBottom flex items-center">
        <span>New here ? <Link to="/register">Create New Account</Link></span>
      </div>
    </div>
  );
};
const Register = () => {
  const navigate = useNavigate()
  const handleRegister = () => {
    navigate('/login')
  }
  return (
    <div className="authFormSection">
      <div className="authFormTop">
        <div className="authTitle">Create new account</div>
        <div className="authDesc">Let's get a survey form handled today</div>
      </div>
      <form className="authFormControlDiv">
        <div className="inputDiv">
          <div class="input-group">
            <input
              required
              type="text"
              name="username"
              autocomplete="off"
              class="input"
              placeholder="Enter your username"
            />
          </div>
          <div class="input-group">
            <input
              required
              type="email"
              name="email"
              autocomplete="off"
              class="input"
              placeholder="Enter your email"
            />
          </div>
          <div class="input-group">
            <input
              required
              type="text"
              name="password"
              autocomplete="off"
              class="input"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="btn submitBtn" onClick={() => handleRegister()}>Sign up</div>
        <div className="btn submitBtn googleBtn flex items-center content-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
            alt=""
          />{" "}
          Sign up with Google
        </div>
      </form>
      <div className="authFormBottom flex items-center">
        Already have an account ? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};
export default AuthForm;
