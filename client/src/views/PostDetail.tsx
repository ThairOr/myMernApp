import React from "react";
import { useState, useEffect } from "react";
import InstgramCard from "../components/InstgramCard";

import { useParams } from "react-router-dom";
import Comments from "../components/comment";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({
    _id: "",
    user: "",
    likrs: "",
    comments: [
      {
        ObjectId: "653284e9a1635f0065c37a18",
      },
    ],
    title: "",
    captions: "",
    location: {
      country: "",
      city: "",
      longitude: "",
      latitude: "",
    },
  });

  const fetchPost = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/post/" + postId,
        requestOptions
      );
      console.log("response=>", response);
      if (response.status === 200) {
        const data = await response.json();
        console.log("data=>", data);
        console.log("posts=>", post);
        setPost(data);
      }
      // console.log("results :>> ", results);

      // if (results.status === 200) {
      //   const data = await results.json();
      //   console.log("data :>> ", data);
      //   const postsList = data.data as Posts[];

      //   console.log("postsList :>> ", postsList);

      //   setPosts(postsList);
      // }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    fetchPost();
    // getLocation();
    console.log(postId);
  }, []);

  return (
    <div>
      <InstgramCard post={post} />
      <Comments comments={post.comments} _id={postId} />
    </div>
  );
}

export default PostDetail;
