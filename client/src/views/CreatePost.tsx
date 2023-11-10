import React, { useContext } from "react";
import SubmitPost from "../components/SubmitPost";
import { AuthContext } from "../context/AuthContext";

function CreatePost() {
  const { user } = useContext(AuthContext);
  // create state variable to store all the berlinstagram posts
  //create a fetch function that fetches the url "localhost:5005/api/post/all", and set the state variable with the response
  //create a useEffect that calls the fetch function when the component is rendered
  //TODO Home should be the component when we see the posts. Not where we write the posts
  return (
    <div>
      <SubmitPost />
      {/* map over the variable containing all the posts, and do conditional render to prevent errors at first render */}
      {/* {berlinPosts &&
        berlinposts.map((singlePost) => {
          return <Post singlePost={singlePost} />;
        })} */}
    </div>
  );
}

export default CreatePost;
