import styles from "./login.module.css";

interface LoginPageProps {
  baseUrl: string;
}

function LoginPage({ baseUrl }: LoginPageProps) {
  return (
    <>
      <div className={styles["login-area"]}></div>
      <div className={styles["login-banner"]}></div>
    </>
  );
}

export default LoginPage;
