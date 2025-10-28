import styles from "./list-display.module.css";

interface AddNewListElementProps {
  responseLocation: string;
}

function AddNewListElement({ responseLocation }: AddNewListElementProps) {
  return (
    <div
      className={styles.element + " " + styles["add-new"]}
      onClick={() => (window.location.href = `/${responseLocation}/new`)}
    >
      <div className={styles["element-image"]}>
        <img src="/add.png" />
      </div>
      <div className={styles["element-text"]}>
        <div className={styles["element-name"]}>Add new</div>
      </div>
    </div>
  );
}

export default AddNewListElement;
