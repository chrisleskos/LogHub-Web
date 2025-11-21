import { useRef } from "react";
import AlertMessage from "../../components/alert/AlertMessage";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import styles from "./new-exercise-instance.module.css";
import type { NewExerciseInstanceSlideProps } from "./NewExerciseInstanceSlideProps";
import InputField from "../../components/input/InputField";
import TextAreaField from "../../components/input/TextAreaField";

function NameCommentSlide({
  exerciseInstanceRequest,
  setExerciseInstanceRequest,
  nextStep = () => {},
  prevStep = () => {},
}: NewExerciseInstanceSlideProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const setExerciseInstanceName = (name: string) => {
    setExerciseInstanceRequest((prev) => ({
      ...prev,
      name: name,
    }));
  };

  const setExerciseInstanceDescription = (description: string) => {
    setExerciseInstanceRequest((prev) => ({
      ...prev,
      comment: description,
    }));
  };

  const handleNameInputOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setExerciseInstanceName(e.currentTarget.value);
  };

  const handleDescInputOnKeyUp = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setExerciseInstanceDescription(e.currentTarget.value);
  };
  return (
    <div className={creationFormStyles["form-slide"]} id="slide2">
      <AlertMessage>
        Exercise Instance's <strong>Name</strong> & <strong>Description</strong>
      </AlertMessage>
      <div className={styles["input-fields"]}>
        <InputField
          placeHolder="Name"
          name="equiupment-name"
          id="exercise-name"
          inputRef={nameInputRef}
          defaultValue={exerciseInstanceRequest.name}
          handleOnKeyUp={handleNameInputOnKeyUp}
        />
        <TextAreaField
          placeHolder="Comment"
          name="exercise-description"
          id="exercise-description"
          inputRef={descriptionInputRef}
          defaultValue={exerciseInstanceRequest.comment}
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
          {exerciseInstanceRequest.name.trim().length > 0 && (
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

export default NameCommentSlide;
