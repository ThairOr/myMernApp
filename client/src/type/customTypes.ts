 export interface Location {
  country: string;
  city: string;
}
export interface NewPost {
  captions: string;
  title: string;
  location: Location;
  time: Date;
}


export interface User {
  userName: string;
  email: string;
  userImage: string;
  signupTime: Date;
  _id: string;
  bio: string;

}
export interface CommentsType {
  _id: string;
  user: {
    userName: string,
    email: string;
  };
  message: string;
  date: Date;
  posts: string;

}

export interface Location {
  city: string;
  country: string;
  latitude?: string;
  longitude?:string
}
export interface SavedBy {
  _id:string
}
export interface Post {
  _id: string;
  captions: string;
  comments: CommentsType[];
  image: string;
  likes: number;
  location:Location
  title: string;
  time: Date;
  user: string;
  saved_by:SavedBy[]
}

  export interface UserImage {
    userImage: string;
  }