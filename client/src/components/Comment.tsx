import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import { Button, Card, Form } from "react-bootstrap";

function Comments({ comments, _id }) {
  const { user } = useContext(AuthContext);
  console.log("comments _Id===>", comments, _id);

  const CommentPostID = _id;
  // console.log(" postDetailID:>> ", postDetailID);

  const [newComment, setNewComment] = useState({
    date: new Date(),
  });
  const [updatedComments, setUpdatedComments] = useState<[] | null>(null);
  const [textInput, setTextInput] = useState("");

  const handleNewComments = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You need to log in first!");
    }

    if (token) {
      console.log("newComment :>> ", newComment);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const urlencoded = new URLSearchParams();
      // urlencoded.append("_id", user!._id);
      // urlencoded.append("email", user!.email);
      urlencoded.append("message", textInput);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };
      try {
        const response = await fetch(
          `http://localhost:5005/api/comment/posts/${_id}`,
          requestOptions
        );

        console.log("results for posting comments :>> ", response);

        const data = await response.json();
        console.log("data for my new comment :>> ", data);
        if (response.ok) {
          comments.push(data.comment);
        } else {
          console.error("Error posting comment:", data.message);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
    setTextInput("");
  };

  const handleDeleteComment = async (commentId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found");
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `http://localhost:5005/api/comment/posts/${user}`,
        requestOptions
      );
      if (response.ok) {
        console.log("comment deleted successfully!");
      } else {
        console.log("error with response when deleting comment");
      }
    } catch (error) {
      console.log("error when deleting comment:>> ", error);
    }
  };
  if (window.confirm("Are you SURE you want to delete your comment?"))
    return (
      <div>
        <div style={{ backgroundColor: "white" }}>
          {comments ? (
            <div>
              {comments.length > 0 ? (
                comments.map((comment, commentIndex) => {
                  return (
                    <div className="singleComment" key={commentIndex}>
                      <div className="singleCommentHeader">
                        <h4>{comment.user.username}</h4>

                        <p>{comment.date}</p>
                      </div>
                      <div className="commentBody">
                        <p className="commentMsg">{comment.message}</p>
                        {user?.email === comment.user.email && (
                          <button
                            onClick={() => {
                              handleDeleteComment(comment._id);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <p style={{ color: "black" }}>
                    Be the first one to leave a comment!
                  </p>
                  <br />
                </>
              )}
            </div>
          ) : null}

          <form onSubmit={handleSubmitComment}>
            <div>
              <input
                name="message"
                type="text"
                placeholder="Leave a comment..."
                onChange={handleNewComments}
                value={textInput}
              />
            </div>
          </form>

          <button className="commtButtun" type="submit">
            submit
          </button>
        </div>
      </div>
    );
}

export default Comments;
