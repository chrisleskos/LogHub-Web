import styles from "./sidebar.module.css";

interface SideBarProps {
  onLogout: () => void;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

function SideBar({
  onLogout,
  firstname,
  lastname,
  email,
  username,
}: SideBarProps) {
  return (
    <>
      <div className={styles["menu-button-container"]}>
        <div
          className={styles["side-menu-button"]}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          &equiv;
        </div>
        <img
          src="./logo-trnsp.png"
          className={
            styles["transp-logo"] + " " + styles["hide-when-on-mobile"]
          }
          onClick={() => {
            window.location.href = "/home";
          }}
        />
      </div>

      <div
        className={"offcanvas offcanvas-start sidebar"}
        data-bs-scroll="true"
        data-bs-backdrop="true"
        tabIndex={-1}
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className={"offcanvas-header " + styles["sidebar-head"]}>
          <img
            src="./logo-trnsp.png"
            className={styles["transp-logo"]}
            onClick={() => {
              window.location.href = "/home";
            }}
          />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <div className={styles["profile-container"]}>
            <div className={styles["user-image"]}>
              <img src="./user-icon.png" />
            </div>
            <div className={styles["user-details"]}>
              <div>
                <span
                  className={styles.fullname}
                  onClick={() => (window.location.href = `/${username}`)}
                >
                  {firstname + " " + lastname}
                </span>
                <figcaption className="figure-caption">@{username}</figcaption>
              </div>
            </div>
          </div>
          {/* <DevidingLine /> */}
          <nav>
            <a className={"" + styles["nav-button"]} href="/home">
              Home
            </a>
          </nav>
          {/* <DevidingLine /> */}
          <nav>
            <a className={"" + styles["nav-button"]} href="/about">
              About
            </a>
            <a className={"" + styles["nav-button"]} href="/help">
              Help
            </a>
            <button
              className={"btn btn-dark " + styles["logout"]}
              onClick={onLogout}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}

export default SideBar;
