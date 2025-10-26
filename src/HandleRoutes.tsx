import Axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";

interface HandleRoutesProps {
  baseUrl: string;
}

function HandleRoutes({ baseUrl }: HandleRoutesProps) {
  // const checkIfLoggedUrl = "/auth/check";
  // const [cookies] = useCookies(["token"]);
  // const token = cookies.token;

  // const [isTokenValid, setTokenValid] = useState(token !== undefined);
  // useEffect(() => {
  //   Axios.get(baseUrl + checkIfLoggedUrl, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then(function (response) {
  //       setTokenValid(response.data);
  //     })
  //     .catch(function (error) {
  //       setTokenValid(false);
  //     });
  // }, [baseUrl, checkIfLoggedUrl]);

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage baseUrl={baseUrl} url="auth/authenticate" />}
      />
      {/* <Route path="/login" element={<HomePage baseUrl={baseUrl} />} /> */}
    </Routes>
  );
}

export default HandleRoutes;
