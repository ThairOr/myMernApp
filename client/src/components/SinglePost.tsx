import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Post } from "../type/customTypes";
// import Posts from "../views/Posts";
import { Col } from "react-bootstrap";

interface HomeProps {
  post: Post;
}

function SinglePost({ post, fetchPosts }: HomeProps) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  //TODO implement GRID to see posts
  console.log("post>>>>", post);

  const deletePost = async (idPostToDelete) => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const urlencoded = new URLSearchParams();
      urlencoded.append("idPostToDelete", idPostToDelete);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
      };

      fetch("http://localhost:5005/api/post/deletePost", requestOptions)
        .then((response) => {
          response.json();
        })
        .then((result) => {
          console.log("delete post function", result);
          fetchPosts();
        })
        .catch((error) => console.log("error", error));
    } else {
      alert("login first");
    }
  };

  useEffect(() => {
    console.log("post", post);
  }, []);
  console.log("user", user);
  console.log("post", post);
  return (
    <Col>
      <Card style={{ width: "18rem" }} key={post?._id}>
        <Card.Img variant="top" src={post.image} />
        <Card.Body>
          <Card.Title>{post.captions}</Card.Title>

          <Button
            variant="primary"
            onClick={() => navigate("/post/" + post._id)}
          >
            Details
          </Button>
          {user && user.id === post?.user && (
            <Button
              variant="outline-danger"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default SinglePost;
