// import { NavLink } from "react-bootstrap";
import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function MyNavbar() {
  const { isUserLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("use nav component:", isUserLoggedIn);
  }, []);

  const submitLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Home
          </Navbar.Brand>
          <Navbar.Brand as={NavLink} to="/post">
            InstgramPosts
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* login component should only be accessable if the user is not logged in */}
            {!isUserLoggedIn() && (
              <Nav.Link as={NavLink} to="/login">
                Login{" "}
              </Nav.Link>
            )}

            {/* login component should only be accessable if the user is already logged in  or registered.
                Logout link will not navigate to logout component, instead it will call logout function and navigate 
                to the login page.
            */}
            {isUserLoggedIn() && (
              <Nav.Link onClick={() => submitLogout()}>Logout </Nav.Link>
            )}
            {!isUserLoggedIn() && (
              <Nav.Link as={NavLink} to="/register">
                {" "}
                Register{" "}
              </Nav.Link>
            )}
            {isUserLoggedIn() && (
              <Nav.Link as={NavLink} to="/profile">
                Profile
              </Nav.Link>
            )}
            {/* <Nav.Link  as={NavLink} to="/login">Login</Nav.Link> */}
          </Nav>{" "}
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
