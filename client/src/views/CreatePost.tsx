import React, { useContext } from "react";
import SubmitPost from "../components/SubmitPost";
import { AuthContext } from "../context/AuthContext";

function CreatePost() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <SubmitPost />
    </div>
  );
}

export default CreatePost;
