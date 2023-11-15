import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  //Check User Status
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Button onClick={submitLogout}>logout</Button>
    </div>
  );
}

export default Logout;
