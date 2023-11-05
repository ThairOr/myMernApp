import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function InstgramCard({ post }) {
  const navigate = useNavigate();
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={post.image} />
        <Card.Body>
          <Card.Title>{post._id}</Card.Title>

          <Button
            variant="primary"
            onClick={() => navigate("/post/" + post._id)}
          >
            Go somewhere
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default InstgramCard;
