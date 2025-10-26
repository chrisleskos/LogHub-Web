import { useCookies } from "react-cookie";
import AuthRoutes from "./AuthRoutes";
import { useEffect, useState } from "react";
import Axios from "axios";
import HandleRoutes from "./HandleRoutes";

function App() {
  const host = import.meta.env.VITE_API_HOST;
  const port = import.meta.env.VITE_API_PORT;
  const vaccoonApiPath = import.meta.env.VITE_API_PATH;
  const baseUrl = host + ":" + port + vaccoonApiPath;

  const checkIfLoggedUrl = "auth/check";
  const [cookies, , removeCookie] = useCookies(["token"]);
  const token = cookies.token;

  const [isTokenValid, setTokenValid] = useState(token !== undefined);

  const logoutUrl = "auth/logout";
  const handleLogout = () => {
    Axios.post(baseUrl + logoutUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        removeCookie("token");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (window.location.href.endsWith("/logout")) {
      handleLogout();
      setTokenValid(false);
      return;
    }
    Axios.get(baseUrl + checkIfLoggedUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        setTokenValid(response.data);
      })
      .catch(() => {
        setTokenValid(false);
      });
  }, [baseUrl, checkIfLoggedUrl]);

  return (
    <>
      <div className="App">
        {isTokenValid ? (
          <HandleRoutes baseUrl={baseUrl} />
        ) : (
          <AuthRoutes baseUrl={baseUrl} />
        )}
      </div>
    </>
  );
}

export default App;
