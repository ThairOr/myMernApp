
const handleLocationInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience({
      ...newExperience,
      location: {
        ...newExperience.location,
        [name]: value,
      },
    });
  };

const handleTypeInput = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setNewExperience({ ...newExperience, experienceType: e.target.value });
  };

  const handlePhotoInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e :>> ", e);
    setDisplayPhoto(e.target.files?.[0] || "");
  };

  const handleDisplayPhotoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("photo", displayPhoto);
    console.log("formdata :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/experiences/mainphotoupload",
        requestOptions
      );
      const result = (await response.json()) as ExperienceImage;
      console.log("result single photo:>> ", result);

      setNewExperience({ ...newExperience, photo: result.photo });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handlePhotoAlbumInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const photoArray: File[] = [];
      for (let i = 0; i < files.length; i++) {
        photoArray.push(files[i]);
      }
      console.log("photoArray :>> ", photoArray);
      setPhotoAlbum(photoArray);
    }
  };

  const handlePhotoAlbumSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    for (let i = 0; i < photoAlbum.length; i++) {
      formdata.append("photo_body", photoAlbum[i]);
    }

    console.log("formdata :>> ", formdata);
    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/experiences/photoalbumupload",
        requestOptions
      );

      const result = await response.json();
      console.log("result album photo:>> ", result);
      console.log("result.photo_urls :>> ", result.photo_urls);
      // const photosArray = result.photo_urls;
      // console.log("photosArray :>> ", photosArray);
      setNewExperience({ ...newExperience, photo_body: result.photo_urls });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleSubmitExperience = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      console.error("You need to log in first");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const photoBodyJSON = JSON.stringify(newExperience.photo_body);

    const urlencoded = new URLSearchParams();
    // urlencoded.append("a_id", newExperience.author.a_id); //!THIS DOESNT
    urlencoded.append("email", user?.email); //!APPEND MY USER TO NEW EXP
    urlencoded.append("title", newExperience.title);
    urlencoded.append("caption", newExperience.caption);
    urlencoded.append("photo", newExperience.photo);
    urlencoded.append("country", newExperience.location.country);
    urlencoded.append("city", newExperience.location.city);
    urlencoded.append("longitude", newExperience.location.latitude);
    urlencoded.append("latitude", newExperience.location.longitude);
    urlencoded.append("experienceType", newExperience.experienceType);
    urlencoded.append("text_body", newExperience.text_body);
    urlencoded.append("photo_body", photoBodyJSON);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/experiences/experiencesubmission",
        requestOptions
      );
      const results = await response.json();
      console.log("results :>> ", results);
    } catch (error) {
      console.log("error :>> ", error);
    }
    alert("yey!"); //!Replace with modal/toast ++ redirect to story page
    navigateTo("/experiences");
    console.log("newExperience :>> ", newExperience);
  };

  useEffect(() => {
    setNewExperience(newExperience);
    console.log("newExperience :>> ", newExperience);
  }, [isLoggedIn]);

  //Do delete + edit experience (not sure where// show in grid and details)