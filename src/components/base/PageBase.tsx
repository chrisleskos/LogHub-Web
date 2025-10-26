import Axios from "axios";
import SideBar from "../sidebar/SideBar";
import { useCookies } from "react-cookie";

interface PageBaseProps {
  baseUrl: string;
}

function PageBase({ baseUrl }: PageBaseProps) {
  const [cookies, , removeCookie] = useCookies([
    "token",
    "firstname",
    "lastname",
    "email",
    "username",
  ]);

  const token = cookies.token;
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
    </>
  );
}

export default PageBase;
