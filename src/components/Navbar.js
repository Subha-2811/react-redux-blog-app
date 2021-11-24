import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";

import { useSelector, useDispatch } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("tech");
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };
  return (
    <div className="navbar">
      <h1 className="navbar-brand">Blog App</h1>
      {useSelector(selectSignedIn) ? (
        <div className="blog-search">
          <input
            type="search"
            placeholder="search"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          ></input>
          <img src={userData?.imageUrl} alt={userData?.name} />
          <p>{userData?.givenName}</p>
          <GoogleLogout
            clientId="787177928504-b71486tdph99pv8p67468schqgt46eql.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout-btn"
              >
                Logout
              </button>
            )}
            onLogoutSuccess={logout}
          >
            Logout
          </GoogleLogout>
        </div>
      ) : (
        <div>User data not available</div>
      )}
    </div>
  );
};

export default Navbar;
