// import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./views/Register";

// import Instagram from "./views/Instagram";
// import Login from "./views/Login";
// import Logout from "./views/Logout";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Link,
  Outlet,
  createHashRouter,
  createMemoryRouter,
} from "react-router-dom";
import Login from "./views/Login";
import Logout from "./views/Logout";
import MyNavbar from "./components/MyNavbar";
import ErrorPage from "./views/ErrorPage";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Posts from "./views/Posts";
import { AuthContextProvider } from "./context/AuthContext";
import PostDetail from "./views/PostDetail";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="post" element={<Posts />}></Route>
        <Route path="post/:postId" element={<PostDetail />} />

        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
    )
  );
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}
const Root = () => {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
};

export default App;
