import { useEffect, useState, createContext } from "react";
import { User } from "../type/customTypes";

interface AuthContextType {
  user: User | null;
  isUserLogged: boolean;
  login: (loginCredentials: any) => Promise<void>;
  logout: () => void;
  deleteUser: () => void;
  register: (newUser: User) => Promise<void>;
}
const initialContext = {
  user: null,
  isUserLogged: false,
  login: () => {
    throw Error("no provider");
  },
  logout: () => {},
  deleteUser: () => {},
  register: () => {
    throw Error("no provider");
  },
};

// export const AuthContext = createContext<AuthContextType | undefined>();
export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLogged, setIsUserLogged] = useState(false);
  //! login
  const login = async (loginCredentials) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginCredentials!.email);
    urlencoded.append("password", loginCredentials!.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        "http://localhost:5005/api/users/login",
        requestOptions
      );
      console.log("response", response);
      if (response.ok) {
        const result: LoginResponse = await response.json();
        console.log("result:>>", result);
        const token = result.token;
        if (token) localStorage.setItem("token", token);
        setUser(result.user);
        return result.user;
      }
    } catch (err) {
      const error = err as Error;
      console.log("error:>>", error.message);
      return null;
    }
  };

  //! isUserLoggedIn
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  //! logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsUserLogged(false);
    setUser(null);
  };

  //! user profile
  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("you need to login first");
      //either warn the user, or redirect him to login
    }

    if (token) {
      //send request

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          requestOptions
        );
        console.log("response :>> ", response);
        if (!response.ok) {
          alert(response.statusText);
        }
        if (response.ok) {
          const result = await response.json();
          console.log("result :>> ", result);
          const user = result.user as User;
          setUser(user);
        }
      } catch (err) {
        const error = err as Error;
        console.log("error :>> ", error.message);
      }
    }
  };

  const checkUserStats = async () => {
    const token = localStorage.getItem("token");
    console.log("%c check user status", "color:orange");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/checkUserStatus",
          requestOptions
        );
        console.log("%c response", "color:orange", response);
        const result = await response.json();
        console.log("result>>>", result);
        setUser(result.user);
      } catch (error) {
        console.log("error checkng user Status", error);
      }
    } else {
      alert("you need to login first");
    }
  };

  // In this function, we are taking our token from our local storage, after we check that we have a token, we take the
  //code from Postman, and execute it only if there is a token  [if (token)]

  const deleteUser = async (userID: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("no token found");
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `http://localhost:5005/api/users/deleteuser/${userID}`,
        requestOptions
      );
      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("profile deleted successfully!");
        setUser(null);
      } else {
        console.log("error with response when deleting profile");
      }
    } catch (error) {
      console.log("error when trying to delete a user :>> ", error);
    }
  };

  console.log("HERE IS ACTIVE USER", user);

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();

    if (isLoggedIn) {
      console.log("user LoggedIn");
      setIsUserLogged(true);
    } else {
      console.log("user is NOT logged in");
      setIsUserLogged(false);
    }
    checkUserStats();
  }, [isUserLogged]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isUserLoggedIn, getProfile, deleteUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
