import PageBase from "../../components/base/PageBase";
import styles from "./new-exercise.module.css";

interface NewExerciseInstancePage {
  baseUrl: string;
}

function NewExercisePage({ baseUrl }: NewExerciseInstancePage) {
  return (
    <>
      <PageBase />
      <div>NewExercisePage</div>
      <form>
        <div className={styles["input-wrap"]}>
          <span>Name</span>
          <input />
        </div>
      </form>
    </>
  );
}

export default NewExercisePage;
