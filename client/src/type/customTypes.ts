 export interface Location {
  country: string;
  city: string;
}
export interface NewPost {
  captions: string;
  title: string;
  location: Location;
}

export interface User {
    username: string;
    email: string;
    userImage: string;
}