import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  //Check User Status
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // const isUserLoggedIn = () => {
  //   const token = localStorage.getItem("token");

  //   return token ? true : false;
  // };

  const submitLogout = () => {
    logout();
    navigate("/login");
  };

  // useEffect(() => {
  //   const isLoggedIn = isUserLoggedIn();

  //   if (isLoggedIn) {
  //     console.log("user LoggedIn");
  //     setIsUserLogged(true);
  //   } else {
  //     console.log("user is NOT logged in");
  //     setIsUserLogged(false);
  //   }
  // }, [isUserLogged]);
  return (
    <div>
      <Button onClick={submitLogout}>logout</Button>
    </div>
  );
}

export default Logout;
