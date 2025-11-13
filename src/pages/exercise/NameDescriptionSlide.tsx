import { useRef } from "react";
import AlertMessage from "../../components/alert/AlertMessage";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import styles from "./new-exercise.module.css";
import type { NewExerciseSlideProps } from "./NewExerciseSlideProps";
import InputField from "../../components/input/InputField";
import TextAreaField from "../../components/input/TextAreaField";

function NameDescriptionSlide({
  exerciseRequest,
  setExerciseRequest,
  nextStep = () => {},
  prevStep = () => {},
}: NewExerciseSlideProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const setexerciseName = (name: string) => {
    setExerciseRequest((prev) => ({
      ...prev,
      name: name,
    }));
  };

  const setexerciseDescription = (description: string) => {
    setExerciseRequest((prev) => ({
      ...prev,
      description: description,
    }));
  };

  const handleNameInputOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setexerciseName(e.currentTarget.value);
  };

  const handleDescInputOnKeyUp = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setexerciseDescription(e.currentTarget.value);
  };
  return (
    <div className={creationFormStyles["form-slide"]} id="slide2">
      <AlertMessage>
        Exercise's <strong>Name</strong> & <strong>Description</strong>.
      </AlertMessage>
      <div className={styles["input-fields"]}>
        <InputField
          placeHolder="Name"
          name="equiupment-name"
          id="exercise-name"
          inputRef={nameInputRef}
          defaultValue={exerciseRequest.name}
          handleOnKeyUp={handleNameInputOnKeyUp}
        />
        <TextAreaField
          placeHolder="Description"
          name="exercise-description"
          id="exercise-description"
          inputRef={descriptionInputRef}
          defaultValue={exerciseRequest.description}
          handleOnKeyUp={handleDescInputOnKeyUp}
        />

        <div className={creationFormStyles["nav-btn-wrap"]}>
          <div
            onClick={() => {
              prevStep();
            }}
            className={creationFormStyles.step}
          >
            &#60; Back
          </div>
          {exerciseRequest.name.trim().length > 0 && (
            <div
              className={creationFormStyles["next-btn"]}
              onClick={() => {
                nextStep();
              }}
            >
              Next
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NameDescriptionSlide;
