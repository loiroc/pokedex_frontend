import { useState, useEffect } from "react";

import api from "../../api";
import history from "../../routes/history";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(user, password) {
    await api({
      method: "post",
      url: "/authenticate",
      data: { user: `${user}`, password: `${password}` },
    })
      .then((res) => {
        let token = res.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
        history.push("/home");
      })
      .catch((err) => {
        alert("Wrong combination of username or password");
      });
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
