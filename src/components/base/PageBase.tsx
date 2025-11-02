import SideBar from "../sidebar/SideBar";
import { useCookies } from "react-cookie";
import styles from "./base.module.css";

interface PageBaseProps {
  header?: string;
}

function PageBase({ header }: PageBaseProps) {
  const [cookies] = useCookies([
    "token",
    "firstname",
    "lastname",
    "email",
    "username",
  ]);

  //   const token = cookies.token;
  const firstname = cookies.firstname;
  const lastname = cookies.lastname;
  const email = cookies.email;
  const username = cookies.username;

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <>
      <SideBar
        onLogout={handleLogout}
        firstname={firstname}
        lastname={lastname}
        username={username}
        email={email}
      />
      <h2>{header}</h2>
    </>
  );
}

export default PageBase;
