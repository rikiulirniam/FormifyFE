import { createContext, useEffect, useState } from "react";
import { useAxios } from "../hooks";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  function load() {
    axios
      .get("auth/me")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((load) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <h5>Loading...</h5>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
