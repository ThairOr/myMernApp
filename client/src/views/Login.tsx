import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type loginCredentials = {
  email: string;
  password: string;
};

type User = {
  userName: string;
  email: string;
  userImage?: string;
};

type LoginResponse = {
  msg: string;
  user: User;
  token: string;
};

function Login() {
  const { login } = useContext(AuthContext);
  // Use the navigat from  router to direct the page to 'profile' page on success login
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] =
    useState<loginCredentials | null>(null);

  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("e.target.name:>>", e.target.name);
    setLoginCredentials({
      ...(loginCredentials as loginCredentials),
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    // هذا الكود حتى لا يعيد تحديث الصفحة
    e.preventDefault();
    console.log("loginCredentials :>>", loginCredentials);
    //use await to get the response from the context login function
    const user = await login(loginCredentials);
    if (user) {
      // if user included in the response, switch to the ptofile page
      navigate("/profile");
    } else {
      // else -> print error
      console.log("user or password mismatch");
    }
  };

  return (
    <div>
      <h1>login</h1>
      <div>
        <Form onSubmit={handleSubmitLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleLoginInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleLoginInput}
            />
          </Form.Group>

          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
