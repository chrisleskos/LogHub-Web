import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

interface HandleRoutesProps {
  baseUrl: string;
}

function AuthRoutes({ baseUrl }: HandleRoutesProps) {
  return (
    <Routes>
      <Route
        path="/register"
        element={<RegisterPage baseUrl={baseUrl} path="auth/register" />}
      />
      <Route
        path="*"
        element={<LoginPage baseUrl={baseUrl} path="auth/authenticate" />}
      />
    </Routes>
  );
}

export default AuthRoutes;
