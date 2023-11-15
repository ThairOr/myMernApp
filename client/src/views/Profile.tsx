import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";

type User = {
  userName: string;
  email: string;
  userImage: string;
  _id: string;
  bio: string;
  signupTime: Date;
};

function Profile() {
  // For the "Profile" component we need only the user from the context
  const { user, getProfile, deleteUser } = useContext(AuthContext);
  const [info, setInfo] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log("user", user);

  useEffect(() => {
    getProfile();
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
            <Nav.Link
              as={NavLink}
              style={{ textAlign: "right", margin: "1rem" }}
              to={`/updateprofile/${user!.email}`}
            >
              <BsFillPencilFill />
            </Nav.Link>

            <Card.Img
              variant="top"
              src={user.userImage}
              alt="profile picture"
            />
            <Card.Body>
              <Card.Text>username:{user?.userName}</Card.Text>
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
      </div>
    )
  );
}

export default Profile;
