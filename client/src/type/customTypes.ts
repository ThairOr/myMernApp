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
    username: string;
    email: string;
  userImage: string;
  signupTime: Date;
}
export interface Comments {
  _id:string
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
  comments: Comments[];
  image: string;
  likes: number;
  location:Location
  title: string;
  time: Date;
  user: string;
  saved_by:SavedBy[]
}