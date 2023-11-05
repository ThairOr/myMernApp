import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Comments({ comments, _id }) {
  const { user } = useContext(AuthContext);

  const experienceID = _id;
  console.log("experienceID on commentsComp:>> ", experienceID);

  const [newComment, setNewComment] = useState({
    author: {
      _id: user?._id,
      //   email: user?.email,
      //   username: user?.username,
      //   user_image: user?.user_image,
    },
    date: new Date(),
    // message: "",
    // experienceID: experienceID,
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
      alert("You need to log in first!");
    }

    if (token) {
      console.log("newComment :>> ", newComment);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const urlencoded = new URLSearchParams();
      urlencoded.append("_id", user!._id);
      urlencoded.append("email", user!.email);
      urlencoded.append("username", user!.username);
      urlencoded.append("user_image", user!.user_image);
      //   urlencoded.append("message", newComment.message);
      urlencoded.append("experience", experienceID);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };
      try {
        const response = await fetch(
          `http://localhost:5005/api/experiences/experiences/${_id}/comments`,
          requestOptions
        );

        console.log("results for posting comments :>> ", response);

        const data = await response.json();
        console.log("data for my new comment :>> ", data);
        if (response.ok) {
          const newComment = data.comment;
        } else {
          console.error("Error posting comment:", data.message);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
    setTextInput("");
  };

  //TODO -
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
        `http://localhost:5005/api/experiences/deletecomment/${commentId}`,
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
  // if (window.confirm("Are you SURE you want to delete your comment?"))
  return (
    <div>
      <h2>comments:</h2>
      <form onSubmit={handleSubmitComment}>
        <div className="inputContainer">
          <input
            name="message"
            type="text"
            placeholder="Leave a comment..."
            onChange={handleNewComments}
            value={textInput}
          />
          <button
            style={{ backgroundColor: "white" }}
            className="nakdButton"
            type="submit"
          >
            submit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M2.08337 21.875L23.9584 12.5L2.08337 3.125V10.4167L17.7084 12.5L2.08337 14.5833V21.875Z"
                fill="#EFCB59"
              />
            </svg>
          </button>
        </div>
      </form>

      <div style={{ backgroundColor: "white" }}>
        {comments ? (
          <div>
            {comments.length > 0 ? (
              comments.map((comment, commentIndex) => {
                return (
                  <div className="singleComment" key={commentIndex}>
                    <div className="singleCommentHeader">
                      {/* <h4>{comment.author.username}</h4> */}

                      <p>{comment.date}</p>
                    </div>
                    <div className="commentBody">
                      {/* <p className="commentMsg">{comment.message}</p> */}
                      {/* {user?.email === comment.author.email && (
                        <button
                          onClick={() => {
                            handleDeleteComment(comment._id);
                          }}
                        >
                          Delete
                        </button>
                      )} */}
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
      </div>
    </div>
  );
}

export default Comments;
