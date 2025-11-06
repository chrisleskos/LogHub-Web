import { useRef, useState } from "react";
import AuthForm from "../../components/authForm/AuthForm";
import styles from "./login.module.css";
import autFormStyles from "../../components/authForm/authForm.module.css";
import { useCookies } from "react-cookie";
import Axios from "axios";
import type { AuthInputProps } from "../../components/authForm/AuthInput";

interface LoginPageProps {
  baseUrl: string;
  path: string;
}

function LoginPage({ baseUrl, path }: LoginPageProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [, setCookie] = useCookies([
    "token",
    "firstname",
    "lastname",
    "email",
    "username",
  ]);
  const username: AuthInputProps = {
    ref: useRef<HTMLInputElement>(null),
    fieldName: "username",
    icon: "@",
  };
  const password: AuthInputProps = {
    ref: useRef<HTMLInputElement>(null),
    fieldName: "password",
    icon: <i className="fa-solid fa-lock"></i>,
    password: true,
  };

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameValue = username.ref.current!.value;
    const passwordVal = password.ref.current!.value;

    setShowAlert(false);

    Axios.post(baseUrl + path, {
      emailOrUsername: usernameValue,
      password: passwordVal,
      rememberMe: true,
    })
      .then(function (response) {
        const token = response.data.token;
        const firstname = response.data.firstname;
        const lastname = response.data.lastname;
        const email = response.data.email;
        const username = response.data.username;
        setCookie("token", token, {
          path: "/",
          secure: false,
          httpOnly: false,
        });
        setCookie("firstname", firstname, {
          path: "/",
          secure: false,
          httpOnly: false,
        });
        setCookie("lastname", lastname, {
          path: "/",
          secure: false,
          httpOnly: false,
        });
        setCookie("email", email, {
          path: "/",
          secure: false,
          httpOnly: false,
        });
        setCookie("username", username, {
          path: "/",
          secure: false,
          httpOnly: false,
        });
        window.location.href = "/home";
      })
      .catch(function (error) {
        if (error.code === "ERR_BAD_REQUEST") {
          setShowAlert(true);
          setAlertMessage("Wrong credentials");
        }
      })
      .finally(() => {
        password.ref.current!.value = "";
      });
  };

  return (
    <>
      <div className={styles["login-page-wrap"]}>
        <div className={styles["login-area"]}>
          {/* <div className={styles.welcome}>Welcome back!</div> */}
          <AuthForm onSubmit={submitLogin} inputFields={[username, password]}>
            <div className={autFormStyles.forgot}>Forgot password?</div>
            <div className={autFormStyles["buttons-container"]}>
              <button type="submit">Submit</button>
              <button className={autFormStyles.google}>
                <img src="/google.png" />
                Google
              </button>
            </div>
            <div
              className={autFormStyles.signup}
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Sign up
            </div>
          </AuthForm>
        </div>
        <div className={styles["login-banner"]}>
          <div>Track.</div>
          <div>Improve.</div>
          <div>Repeat.</div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
