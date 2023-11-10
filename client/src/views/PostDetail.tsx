import React from "react";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Comments from "../components/Comment";
import { Post } from "../type/customTypes";
// import Home from "../components/SinglePost";
// import SinglePost from "../components/SinglePost";
import { Card } from "react-bootstrap";

function PostDetail() {
  const { postId } = useParams();
  console.log("postid=>>>", postId);

  const [post, setPost] = useState<Post | null>(null);
  const comments = post ? post.comments : [];

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
    <>
      <Card style={{ width: "30rem" }} key={post?._id}>
        <Card.Img variant="top" src={post?.image} />
        <Card.Body>
          <Card.Title>{post?.title}</Card.Title>
          <Card.Text>{post?.captions}</Card.Text>
          <Card.Text>{post?.location.country}</Card.Text>
          <Card.Text>{post?.location.city}</Card.Text>
          {/* <Card.Text>{post?.time}</Card.Text> */}
          {/* <Card.Text>{post?.likes}</Card.Text> */}
          {/* <Card.Text>{post?.saved_by}</Card.Text> */}
          <Card.Text>
            {post && <Comments comments={comments} _id={postId} />}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default PostDetail;
