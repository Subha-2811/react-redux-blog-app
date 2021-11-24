import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { Avatar } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

import "../styling/navbar.css";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("tech");

  const userData = useSelector(selectUserData);
  const isSignedIn = useSelector(selectSignedIn);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };
  return (
    <div className="navbar">
      <h1 className="navbar-brand">Blog App</h1>
      {isSignedIn && (
        <div className="blog-search">
          <input
            type="search"
            placeholder="search"
            value={inputValue}
            className="search"
            onChange={(event) => setInputValue(event.target.value)}
          ></input>
          <button className="submit" onClick={(e) => handleSearch(e)}>
            Search
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="navbar-user-data">
          <Avatar
            className="user"
            src={userData?.imageUrl}
            alt={userData?.name}
          />
          <h1 className="signedIn">{userData?.givenName}</h1>
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
        <div className="notSignedIn">User Not Available</div>
      )}
    </div>
  );
};

export default Navbar;

// (<div>
//   <img src={userData?.imageUrl} alt={userData?.name} />
//   <p>{userData?.givenName}</p>
//   <GoogleLogout
//     clientId="787177928504-b71486tdph99pv8p67468schqgt46eql.apps.googleusercontent.com"
//     render={(renderProps) => (
//       <button
//         onClick={renderProps.onClick}
//         disabled={renderProps.disabled}
//         className="logout-btn"
//       >
//         Logout
//       </button>
//     )}
//     onLogoutSuccess={logout}
//   >
//     Logout
//   </GoogleLogout>
// </div>):()
