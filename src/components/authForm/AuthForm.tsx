import type { ReactNode } from "react";
import styles from "./authForm.module.css";
import AuthInput, { type AuthInputProps } from "./AuthInput";

interface AuthFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputFields: AuthInputProps[];
  children?: ReactNode;
}

function AuthForm({ onSubmit, inputFields, children }: AuthFormProps) {
  return (
    <>
      <form onSubmitCapture={onSubmit} className={styles.auth}>
        <div className={styles.logo}>
          <img src="/logo-trnsp.png" />
        </div>
        {inputFields.map((field, i) => (
          <AuthInput
            fieldName={field.fieldName}
            icon={field.icon}
            ref={field.ref}
            password={field.password}
            handleKeyUp={field.handleKeyUp}
            autocomplete={field.autocomplete}
            key={i}
          />
        ))}
        {/* Buttons and  */}
        {children}
      </form>
    </>
  );
}

export default AuthForm;
