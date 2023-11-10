import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type User = {
  userName: string;
  email: string;
  userImage: string;
};

function Profile() {
  // For the "Profile" component we need only the user from the context
  const { user, getProfile, deleteUser } = useContext(AuthContext);
  const [info, setInfo] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log("user", user);
  // const userID = user!._id;
  // console.log("userID", userID);

  // const submitGetProfile = () => {
  //   getProfile();
  // };

  useEffect(() => {
    // getProfile();
    if (!user) {
      setInfo("Please login to view your profile");
    }
  }, []);

  const handleDeleteUser = (userID: string) => {
    deleteUser(userID);
    navigate("/");
  };

  return (
    user && (
      <div>
        <h2>{user ? user.userName : ""} Profile</h2>

        <div>
          <Card style={{ width: "30rem" }} className="profile" key={user.email}>
            <Card.Img
              variant="top"
              src={user.userImage}
              alt="profile picture"
            />
            <Card.Body>
              <Card.Text>username:{user?.username}</Card.Text>
              <hr />
              <Card.Text>email:{user?.email}</Card.Text>
              <hr />
              <Card.Text>member since:{user?.signupTime}</Card.Text>
              <hr />
              <Card.Text>bio:{user?.bio}</Card.Text>
              <hr />
              <Button
                variant="dark"
                onClick={() => {
                  handleDeleteUser(user?.id);
                }}
              >
                Delete account
              </Button>
            </Card.Body>
          </Card>
        </div>

        {/* <button onClick={getProfile}>get Profile</button> */}
      </div>
    )
  );
}

export default Profile;
