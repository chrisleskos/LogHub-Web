import type { ReactNode } from "react";
import styles from "./alert.module.css";

interface AlertProps {
  children?: ReactNode;
  onClose?: () => void;
  alertType?: string;
  closeable?: boolean;
}

function AlertMessage({
  children,
  onClose,
  alertType = "info",
  closeable,
}: AlertProps) {
  return (
    <div
      className={`alert alert-${alertType} alert-dismissible fade show ${styles["custom-alert-general"]}`}
      role="alert"
    >
      {children}
      {closeable && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}
    </div>
  );
}

export default AlertMessage;
