import { useState, type RefObject } from "react";
import styles from "./authForm.module.css";

interface AuthFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fields: [
    {
      ref: RefObject<HTMLInputElement | null>;
      fieldName: string;
      icon: string;
    },
    { ref: RefObject<HTMLInputElement | null>; fieldName: string; icon: string }
  ];
}

function AuthForm({ onSubmit }: AuthFormProps) {
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedUsername, setFocusedUsername] = useState(false);

  return (
    <>
      <form onSubmitCapture={onSubmit} className={styles.auth}>
        <div className={styles.logo}>
          <img src="./logo-trnsp.png" />
        </div>
        <div className={styles["input-wrap"]}>
          <span
            className={`
              ${styles.icon} ${focusedUsername ? styles.activated : ""}`}
          >
            @
          </span>
          <input
            id="username"
            placeholder="Username"
            autoComplete="username"
            onFocus={() => setFocusedUsername(true)}
            onBlur={() => setFocusedUsername(false)}
          />
        </div>
        <div className={styles["input-wrap"]}>
          <span
            className={`
              ${styles.icon} ${focusedPassword ? styles.activated : ""}`}
          >
            *
          </span>
          <input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            key="1"
            onFocus={() => setFocusedPassword(true)}
            onBlur={() => setFocusedPassword(false)}
          />
        </div>
        <div className={styles.forgot}>Forgot password?</div>
        <div className={styles["buttons-container"]}>
          <button>Submit</button>
          <button className={styles.google}>
            <img src="./google.png" />
            Google
          </button>
        </div>
        <div className={styles.signup}>Sign up</div>
      </form>
    </>
  );
}

export default AuthForm;
