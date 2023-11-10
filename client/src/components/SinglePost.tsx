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

function SinglePost({ post }: HomeProps) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  //TODO implement GRID to see posts
  console.log("post>>>>", post);

  const deletePost = async (idPostToDelete) => {
    const token = localStorage.getItem("token");
    if (token) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", `Bearer ${token}`);

      var urlencoded = new URLSearchParams();
      urlencoded.append("idPostToDelete", idPostToDelete);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
      };

      fetch("http://localhost:5005/api/post/deletePost", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } else {
      alert("login first");
    }
  };

  useEffect(() => {
    console.log("post", post);
  }, []);

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
