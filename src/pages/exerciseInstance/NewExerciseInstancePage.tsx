import PageBase from "../../components/base/PageBase";
import styles from "./new-exercise-instance.module.css";

interface NewExerciseInstanceProps {
  baseUrl: string;
}

function NewExerciseInstancePage({ baseUrl }: NewExerciseInstanceProps) {
  return (
    <>
      <PageBase header="New Exercise Instance" />
      <form>
        <div
          className={`${styles["form-page"]} ${styles["exercise-name"]}`}
        ></div>
      </form>
    </>
  );
}

export default NewExerciseInstancePage;
