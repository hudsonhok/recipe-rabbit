import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import "../App.css";

function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <div className="content text-center px-4">
            <img src="/images/logo.png" alt="Recipe Rabbit Logo" className="logo-login" />
            <h1 className="welcome-text">Welcome to Recipe Rabbit!</h1>
            <p className="content">
              Login now and start cooking! <br />
              Or if you don't have an account, {" "}
              <Link to="/register/">register</Link>.
            </p>
          </div>
        </div>
        <div className="col-md-6 p-5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
