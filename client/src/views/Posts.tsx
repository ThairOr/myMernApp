import React from "react";
import { useState, useEffect } from "react";
import InstgramCard from "../components/InstgramCard";

function Posts() {
  const [posts, setPosts] = useState([
    {
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
    },
  ]);

  /////////////////
  //! Exercise to show how to find the location usin the IP, and use the coordinates to fetch information about those coordinates
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
        console.log("posts=>", posts);
        setPosts(data.allPost);
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
      {posts &&
        posts.map((singlePost) => {
          return <InstgramCard post={singlePost} />;
        })}
    </div>
  );
}

export default Posts;
