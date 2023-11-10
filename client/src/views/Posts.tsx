import React from "react";
import { useState, useEffect } from "react";

import { Post } from "../type/customTypes";

import SinglePost from "../components/SinglePost";
import { Container, Row } from "react-bootstrap";

function Posts() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  /////////////////
  /////////////////
  // const getLocation = () => {
  //   navigator.geolocation.getCurrentPosition(position);
  // };
  // async function position(coordinates) {
  //   console.log("coordinates>>>>", coordinates);
  //   const response = await fetch(
  //     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=en`
  //   );
  //   const result = await response.json();
  //   console.log("location information", result);
  // }
  /////////////////
  /////////////////
  const fetchPosts = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/post/all",
        requestOptions
      );
      console.log("response=>", response);
      if (response.status === 200) {
        const data = await response.json();
        console.log("data=>", data);

        setPosts(data.allPost);
      } else {
        console.log("posts set to null");
        setPosts(null);
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
    fetchPosts();
    // getLocation();
  }, []);

  return (
    <div>
      <h1>Berlinstagram Posts</h1>
      <Container>
        <Row>
          {posts &&
            posts.map((singlePost) => {
              return <SinglePost post={singlePost} />;
            })}
        </Row>
      </Container>
    </div>
  );
}

export default Posts;
