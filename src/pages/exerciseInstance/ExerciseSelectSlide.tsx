import ExerciseList from "../../components/display/list/specifics/ExerciseList";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import AlertMessage from "../../components/alert/AlertMessage";
import type { NewExerciseInstanceSlideProps } from "./NewExerciseInstanceSlideProps";

function ExerciseSelectSlide({
  baseUrl = "",
  setExerciseInstanceRequest,
  nextStep = () => {},
}: NewExerciseInstanceSlideProps) {
  const setExercise = (id: number) => {
    setExerciseInstanceRequest((prev) => ({
      ...prev,
      exerciseId: id,
    }));
    nextStep();
  };
  return (
    <div className={creationFormStyles["form-slide"]} id="slide1">
      <AlertMessage>
        Select <strong>exercise</strong>
      </AlertMessage>
      <ExerciseList
        baseUrl={baseUrl}
        haveAddBtn={false}
        handleOnElementClick={setExercise}
      />
    </div>
  );
}

export default ExerciseSelectSlide;
