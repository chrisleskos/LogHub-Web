import { useState, type RefObject } from "react";
import styles from "./authForm.module.css";

export interface AuthInputProps {
  ref: RefObject<HTMLInputElement | null>;
  fieldName: string;
  icon: string | React.ReactNode;
  autocomplete?: string;
  password?: boolean;
  handleKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function AuthInput(inputProps: AuthInputProps) {
  const [focusedUsername, setFocusedUsername] = useState(false);
  return (
    <div className={styles["input-wrap"]}>
      <span
        className={`
              ${styles.icon} ${focusedUsername ? styles.activated : ""}`}
      >
        {inputProps.icon}
      </span>
      <input
        id={inputProps.fieldName.toLowerCase().replace(" ", "-")}
        placeholder={
          inputProps.fieldName.charAt(0).toUpperCase() +
          inputProps.fieldName.substring(1).toLowerCase()
        }
        autoComplete={inputProps.autocomplete}
        onFocus={() => setFocusedUsername(true)}
        onBlur={() => setFocusedUsername(false)}
        type={inputProps.password ? "password" : "text"}
        ref={inputProps.ref}
        onKeyUp={inputProps.handleKeyUp}
      />
    </div>
  );
}

export default AuthInput;
