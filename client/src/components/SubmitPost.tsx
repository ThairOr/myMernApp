import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import "../style/SubmitPost.css";
import { Button, Form } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { NewPost } from "../type/customTypes";
import { Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

// interface Location {
//   country: string;
//   city: string;
// }
// interface NewPost {
//   captions: string;
//   title: string;
//   location: Location;
// }

function SubmitPost() {
  //TODO Create a link, maybe in HOME, when you see all the posts, to go to the post creation
  const [displayPhoto, setDisplayPhoto] = useState<File | string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<NewPost>({
    captions: "",
    title: "",
    location: {
      country: "",
      city: "",
    },
    time: new Date(),
  });
  const [selectedFile, setselectedFile] = useState<File | string>("");

  //!. Bring user from the AuthContext
  const { user, isLoggedIn, authenticateUser } = useContext(AuthContext);
  // console.log("user on my Submit page :>> ", user);
  const navigateTO = useNavigate();

  const handleFormIput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };
  const handleLocationInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      location: { ...newPost.location, [name]: value },
    });
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.target.files?.[0]);
    setselectedFile(e.target.files?.[0] || "");
  };

  const handleDisplayPhotosSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create form object for the image input
    const formdata = new FormData();
    formdata.append("userImage", selectedFile);

    // create options for the url
    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      // upload image
      const response = await fetch(
        "http://localhost:5005/api/users/imageUpload",
        requestOptions
      );
      const result = await response.json();
      // get the image response
      // const userImage = result.imageUrl;
      console.log("result------------- :>> ", result.imageUrl);
      //here we get the URL for the user profile picture

      //set the uploaded image state value
      setUploadedImageUrl(result.imageUrl);
      setDisplayPhoto({ ...displayPhoto, userImage: result.imageUrl });
      console.log(displayPhoto);
      // console.log(newUser);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleSubmitPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // const imageBodyJSON = JSON.stringify(newPost.image.body);
    //get the image url
    const imageUrl = uploadedImageUrl
      ? uploadedImageUrl
      : "https://www.wheregoesrose.com/wp-content/uploads/2021/07/East-side-gallery.jpg";
    const urlencoded = new URLSearchParams();
    urlencoded.append("image", imageUrl);
    urlencoded.append("country", newPost.location.country);
    urlencoded.append("city", newPost.location.city);
    urlencoded.append("captions", newPost.captions);
    urlencoded.append("title", newPost.title);
    urlencoded.append("email", user.email);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    console.log("newPost", newPost);
    try {
      const response = await fetch(
        "http://localhost:5005/api/post/postsubmission",
        requestOptions
      );
      const results = await response.json();
      console.log("results :>> ", results);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    setNewPost(newPost);
    console.log("newPost :>> ", newPost);
  }, []);

  return (
    <Card border="dark" className="input" key={user?.email}>
      <Form onSubmit={handleSubmitPost} className="form_post">
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            onChange={handleFormIput}
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText1">
          <Form.Label>Captions</Form.Label>
          <Form.Control
            name="captions"
            type="text"
            onChange={handleFormIput}
            placeholder="Enter captions"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            type="text"
            onChange={handleLocationInput}
            placeholder="Enter country"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText3">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            onChange={handleLocationInput}
            placeholder="Enter city"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText4">
          <Form.Label>Story</Form.Label>
          <Form.Control
            name="text_body"
            type="text"
            onChange={handleFormIput}
            placeholder="Enter story"
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label onSubmit={handleDisplayPhotosSubmit}>Photo</Form.Label>
          <Form.Control name="image" type="file" onChange={handleFileInput} />
          <Button
            variant="outline-secondary"
            onClick={handleDisplayPhotosSubmit}
          >
            Upload
          </Button>
        </Form.Group>

        <Button variant="dark" type="submit" className="button_post">
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default SubmitPost;
