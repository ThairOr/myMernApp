import { useEffect, useState, createContext } from "react";
import { User } from "../type/customTypes";

interface AuthContextType {
  user: User | null;
  isUserLogged: boolean;
  login: (loginCredentials: any) => Promise<void>;
  logout: () => void;
  register: (newUser: User) => Promise<void>;
}
// const initialContext = {
//   user: null,
//   isUserLogged: false,

// };

// export const AuthContext = createContext<AuthContextType | undefined>();
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
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

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();

    if (isLoggedIn) {
      console.log("user LoggedIn");
      setIsUserLogged(true);
    } else {
      console.log("user is NOT logged in");
      setIsUserLogged(false);
    }
  }, [isUserLogged]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isUserLoggedIn, getProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
