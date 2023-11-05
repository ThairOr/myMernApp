import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

type User = {
  userName: string;
  email: string;
  userImage: string;
};

function Profile() {
  // For the "Profile" component we need only the user from the context
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState<string | null>(null);

  const submitGetProfile = () => {
    getProfile();
  };

  useEffect(() => {
    if (!user) {
      setInfo("Please login to view your profile");
    }
  }, []);

  return (
    <div>
      <h2>{user ? user.userName : ""} Profile</h2>
      {/* <button onClick={getProfile}>get Profile</button> */}
      {info && <span>{info}</span>}
      {user && (
        <img
          src={user.userImage}
          alt="profile picture"
          style={{ width: "200px" }}
        />
      )}
    </div>
  );
}

export default Profile;
