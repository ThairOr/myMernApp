import React, {
  useContext,
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, InputGroup } from "react-bootstrap";
import { User, UserImage } from "../type/customTypes";

type UpdateUserType = {
  bio: string;
  email: string;
  userName: string;
};

function UpdateProfile() {
  const { user, getProfile } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState<UpdateUserType>({
    bio: "",
    email: "",
    userName: "",
  });
  const [updatedPhoto, setUpdatedPhoto] = useState<File | string>(
    user!.userImage
  );

  const navigateTo = useNavigate();

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("updatedUser :>> ", updatedUser);

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("no token available");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", `${updatedUser.email}` || `${user?.email}`);
    urlencoded.append(
      "userName",
      `${updatedUser.userName}` || `${user?.userName}`
    );
    urlencoded.append(
      "userImage",
      `${updatedUser.userImage}` || `${user?.userImage}`
    );
    urlencoded.append("bio", `${updatedUser.bio}` || `${user?.bio}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        "http://localhost:5005/api/users/updateuser",
        requestOptions
      );

      console.log("response :>> ", response);

      if (response.ok) {
        const results = await response.json();

        console.log("results for updated User :>> ", results);
        setUpdatedUser(results.updatedUser);
        getProfile();
      }
    } catch (error) {
      console.log("error when trying to update profile :>> ", error);
    }
    alert("Profile updated successfully!");
    console.log("updatedUser :>> ", updatedUser);
    navigateTo("/profile");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log("value, name :>> ", value, name);
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

  const handlePhotoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e :>> ", e);
    setUpdatedPhoto(e.target.files?.[0] || "");
  };

  const handleUpdatedPhotoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userImage", updatedPhoto);

    // console.log("formdata :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/imageUpload",
        requestOptions
      );
      const result = (await response.json()) as UserImage;
      console.log("result single photo:>> ", result);
      setUpdatedUser({ ...updatedUser, userImage: result.imageUrl });
      console.log("Updated user------>", updatedUser);
      // setUpdatedUser((prevUser) => {
      //   return { ...prevUser, userImage: result.imageUrl };
      // });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  console.log("Updated user2------>", updatedUser);
  return (
    <>
      <img
        style={{
          width: "16%",
          height: "16%",
          marginLeft: "70px",
          borderRadius: "50%",
        }}
        src={updatedUser.userImage || user?.userImage}
        alt=""
      />

      <Form
        onSubmit={handleUpdatedPhotoSubmit}
        encType="multipart/form-data"
        method="POST"
      >
        <InputGroup>
          <Form.Control
            name="userImage"
            type="file"
            onChange={handlePhotoInputChange}
          />
        </InputGroup>
        <Button variant="warning" type="submit">
          Upload image
        </Button>
      </Form>

      <Form
        onSubmit={handleUpdateProfile}
        encType="multipart/form-data"
        method="POST"
      >
        <InputGroup className="mb-3">
          <InputGroup.Text>Username</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            name="userName"
            type="text"
            // value={updatedUser.userName || user?.userName || ""}
            placeholder={user?.userName}
            value={updatedUser.userName || ""}
            onChange={handleInputChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>email</InputGroup.Text>
          <Form.Control
            aria-label="email"
            name="email"
            type="text"
            value={updatedUser.email || ""}
            placeholder={user?.email}
            onChange={handleInputChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>bio:</InputGroup.Text>

          <Form.Control
            aria-label="bio"
            name="bio"
            type="text"
            // placeholder={user?.bio}
            placeholder="choose your bio"
            value={updatedUser?.bio ? updatedUser.bio : ""}
            onChange={handleInputChange}
          />
        </InputGroup>

        <Button variant="info" type="submit">
          submit
        </Button>
      </Form>
    </>
  );
}

export default UpdateProfile;
