import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

interface ContextProps {
  user: { name: string; email: string; url: string; links: []; image: string };
  setUser: Dispatch<SetStateAction<object[]>>;
  unauthorized: Boolean;
  loading: Boolean;
  loggedOut: Boolean;
}

export const UserContext = createContext<ContextProps>({
  user: { name: "", email: "", url: "", links: [], image: "" },
  setUser: ({}) => {},
  unauthorized: null,
  loading: null,
  loggedOut: null,
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchUser();
  }, []);

  const unauthorized = user && user.message === "Unauthorized";
  const loading = !user && !error;
  const loggedOut = error && error.status === 403;

  return (
    <UserContext.Provider
      value={{ user, setUser, unauthorized, loading, loggedOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
