import type { ReactNode } from "react";
import CloseButton from "../closeBtn/CloseButton";
import styles from "./window.module.css";

interface WindowProps {
  children: ReactNode;
  showWindow: boolean;
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

function Window({ children, showWindow, setShowWindow }: WindowProps) {
  return showWindow ? (
    <div className={styles["selector-window"]}>
      <div className={styles.main}>
        <div className={styles.header}>
          <CloseButton
            onClickHandler={() => {
              setShowWindow(false);
            }}
          />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Window;
