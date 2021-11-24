import React from "react";
import GoogleLogin from "react-google-login";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";

import "../styling/home.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  };
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div className="home-page" style={{ display: isSignedIn ? "none" : "" }}>
      {!isSignedIn ? (
        <div className="login-message">
          <h2>
            <i className="fas fa-book"></i>
          </h2>
          <h1>A Readers favourite place!</h1>
          <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs.
          </p>
          <GoogleLogin
            clientId="787177928504-b71486tdph99pv8p67468schqgt46eql.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login-btn"
              >
                Login with Google
              </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;
