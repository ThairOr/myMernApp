import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
type UserImage = {
  userImage: string;
};

interface User extends UserImage {
  userName: string;
  email: string;
  password: string;
  signupTime: Date;
}
function Register() {
  const redirect = useNavigate();
  const [selectedFile, setselectedFile] = useState<File | string>("");

  const [newUser, setNewUser] = useState<User>({
    userName: "",
    email: "",
    password: "",
    userImage: "",
    signupTime: new Date(),
  });

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.target.files?.[0]);
    setselectedFile(e.target.files?.[0] || "");
  };

  const handleImageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create form object for the image input
    const formdata = new FormData();
    formdata.append("userImage", selectedFile);

    // create options for the url
    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      // upload image
      const response = await fetch(
        "http://localhost:5005/api/users/imageUpload",
        requestOptions
      );
      const result = await response.json();
      // get the image response
      const userImage = result.imageUrl as UserImage;
      console.log("result------------- :>> ", result.imageUrl);
      //here we get the URL for the user profile picture
      //update the user data with the uploaded image info and set the new user
      setNewUser({ ...newUser, userImage: userImage });
      console.log(newUser);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleRegisterInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    console.log("e.target.value :>> ", e.target.value);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handelSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    //First upload the image

    //Then upload the user info
    e.preventDefault();
    console.log("newUser :>> ", newUser);
    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append("signupTime", newUser.signupTime);
    urlencoded.append("userImage", newUser.userImage ? newUser.userImage : "");

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/register",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
      redirect("/login");
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <div>
        <Card className="register">
          <Card.Body>
            <Form onSubmit={handelSubmitRegister}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  placeholder="Enter username"
                  onChange={handleRegisterInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleRegisterInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleRegisterInput}
                />
              </Form.Group>
            </Form>
            <Form onSubmit={handleImageSubmit}>
              {" "}
              <Form.Group
                controlId="formFile"
                className="mb-3"
                style={{ width: "18rem" }}
              >
                <Form.Label>{newUser.userImage}</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileInput}
                />
                <Button variant="dark" type="submit" style={{ margin: "1rem" }}>
                  Upload image
                </Button>
              </Form.Group>
            </Form>
            <Form onSubmit={handelSubmitRegister}>
              <Button variant="dark" type="submit">
                Register
              </Button>
            </Form>
          </Card.Body>
          <br />
          <br />
          {newUser.userImage && (
            <div>
              <Card.Img
                variant="top"
                src={newUser.userImage}
                alt="user-avatar-picture"
                style={{ width: "18rem" }}
              />
            </div>
          )}
        </Card>
        {/* 
        <form onSubmit={handleImageSubmit}>
          <input type="file" name="image" onChange={handleFileInput} />
          <Button type="submit">Upload image</Button>
        </form> */}
      </div>
    </div>
  );
}

export default Register;
