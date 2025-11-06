import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import type { AuthInputProps } from "../../components/authForm/AuthInput";
import AuthForm from "../../components/authForm/AuthForm";
import autFormStyles from "../../components/authForm/authForm.module.css";

interface RegisterPageProps {
  baseUrl: string;
  path: string;
}

function RegisterPage({ baseUrl, path }: RegisterPageProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [, setCookie] = useCookies([
    "token",
    "firstname",
    "lastname",
    "email",
    "username",
  ]);

  const [repeatPasswordIcon, setRepeatPasswrodIcon] = useState<React.ReactNode>(
    <i className="fa-solid fa-repeat"></i>
  );

  const handleRepeatKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      repeatPassword.ref.current?.value != "" &&
      repeatPassword.ref.current?.value === password.ref.current?.value
    ) {
      setRepeatPasswrodIcon(<i className="fa-solid fa-check"></i>);
    } else {
      setRepeatPasswrodIcon(<i className="fa-solid fa-repeat"></i>);
    }
  };

  // Fields
  const fullname: AuthInputProps = {
    ref: useRef<HTMLInputElement>(null),
    fieldName: "Full name",
    icon: <i className="fa-solid fa-id-card"></i>,
    autocomplete: "cc-name",
  };
  const email: AuthInputProps = {
    ref: useRef<HTMLInputElement>(null),
    fieldName: "Email",
    icon: <i className="fa-solid fa-envelope"></i>,
    autocomplete: "email",
  };
  const username: AuthInputProps = {
    ref: useRef<HTMLInputElement>(null),
    fieldName: "username",
    icon: "@",
    autocomplete: "username",
  };
  const password: AuthInputProps = {
    ref: useRef<HTMLInputElement>(null),
    fieldName: "password",
    icon: <i className="fa-solid fa-lock"></i>,
    password: true,
    handleKeyUp: handleRepeatKeyUp,
    autocomplete: "off",
  };
  const repeatPassword: AuthInputProps = {
    ref: useRef<HTMLInputElement>(null),
    fieldName: "repeat password",
    icon: repeatPasswordIcon,
    password: true,
    handleKeyUp: handleRepeatKeyUp,
    autocomplete: "off",
  };

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameVal = username.ref.current!.value;
    const passwordVal = password.ref.current!.value;
    const emailVal = email.ref.current!.value;
    const fullnameParts = fullname.ref.current!.value.split(" ");
    const lastname = fullnameParts.pop() || "";
    const firstname = fullnameParts.join(" ");

    setShowAlert(false);

    Axios.post(baseUrl + path, {
      email: emailVal,
      username: usernameVal,
      firstname: firstname,
      lastname: lastname,
      password: passwordVal,
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
      });
  };

  return (
    <AuthForm
      onSubmit={submitLogin}
      inputFields={[fullname, username, email, password, repeatPassword]}
    >
      <div className={autFormStyles["buttons-container"]}>
        <button type="submit">Submit</button>
        <button className={autFormStyles.google}>
          <img src="./google.png" />
          Google
        </button>
      </div>
      <div
        className={autFormStyles.signup}
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        Login
      </div>
    </AuthForm>
  );
}

export default RegisterPage;
