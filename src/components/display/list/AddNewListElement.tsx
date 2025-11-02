import styles from "./list-display.module.css";

interface AddNewListElementProps {}

function AddNewListElement({}: AddNewListElementProps) {
  return (
    <div
      className={styles.element + " " + styles["add-new"]}
      onClick={() =>
        (window.location.href += window.location.href.endsWith("/")
          ? `new`
          : "/new")
      }
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
