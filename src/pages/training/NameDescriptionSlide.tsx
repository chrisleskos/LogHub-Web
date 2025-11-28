import { useRef } from "react";
import AlertMessage from "../../components/alert/AlertMessage";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import styles from "./new-training.module.css";
import InputField from "../../components/input/InputField";
import TextAreaField from "../../components/input/TextAreaField";
import type { NewTrainingSlideProps } from "./NewTrainingSlideProps";

function NameCommentSlide({
  trainingRequest,
  setTrainingRequest,
  nextStep = () => {},
}: NewTrainingSlideProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const setTrainingName = (name: string) => {
    setTrainingRequest((prev) => ({
      ...prev,
      name: name,
    }));
  };

  const setTrainingDescription = (description: string) => {
    setTrainingRequest((prev) => ({
      ...prev,
      description: description,
    }));
  };

  const handleNameInputOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setTrainingName(e.currentTarget.value);
  };

  const handleDescInputOnKeyUp = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setTrainingDescription(e.currentTarget.value);
  };
  return (
    <div className={creationFormStyles["form-slide"]} id="slide3">
      <AlertMessage>
        Training's <strong>Name</strong> & <strong>Description</strong>
      </AlertMessage>
      <div className={styles["input-fields"]}>
        <InputField
          placeHolder="Name"
          name="equiupment-name"
          id="exercise-name"
          inputRef={nameInputRef}
          defaultValue={trainingRequest.name}
          handleOnKeyUp={handleNameInputOnKeyUp}
        />
        <TextAreaField
          placeHolder="Comment"
          name="exercise-description"
          id="exercise-description"
          inputRef={descriptionInputRef}
          defaultValue={trainingRequest.description}
          handleOnKeyUp={handleDescInputOnKeyUp}
        />
      </div>
      <div className={creationFormStyles["nav-btn-wrap"]}>
        {trainingRequest.name.trim().length > 0 && (
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
  );
}

export default NameCommentSlide;
