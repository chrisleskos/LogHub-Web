import { useRef } from "react";
import AlertMessage from "../../components/alert/AlertMessage";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import styles from "./new-sequence.module.css";
import InputField from "../../components/input/InputField";
import TextAreaField from "../../components/input/TextAreaField";
import type { NewSequenceSlideProps } from "./NewSequenceSlideProps";

function NameCommentSlide({
  sequenceRequest,
  setSequenceRequest,
  nextStep = () => {},
}: NewSequenceSlideProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const setSequenceName = (name: string) => {
    setSequenceRequest((prev) => ({
      ...prev,
      name: name,
    }));
  };

  const setSequenceDescription = (description: string) => {
    setSequenceRequest((prev) => ({
      ...prev,
      description: description,
    }));
  };

  const handleNameInputOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setSequenceName(e.currentTarget.value);
  };

  const handleDescInputOnKeyUp = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setSequenceDescription(e.currentTarget.value);
  };
  return (
    <div className={creationFormStyles["form-slide"]} id="slide3">
      <AlertMessage>
        Sequence's <strong>Name</strong> & <strong>Description</strong>
      </AlertMessage>
      <div className={styles["input-fields"]}>
        <InputField
          placeHolder="Name"
          name="equiupment-name"
          id="exercise-name"
          inputRef={nameInputRef}
          defaultValue={sequenceRequest.name}
          handleOnKeyUp={handleNameInputOnKeyUp}
        />
        <TextAreaField
          placeHolder="Comment"
          name="exercise-description"
          id="exercise-description"
          inputRef={descriptionInputRef}
          defaultValue={sequenceRequest.description}
          handleOnKeyUp={handleDescInputOnKeyUp}
        />
      </div>
      <div className={creationFormStyles["nav-btn-wrap"]}>
        {sequenceRequest.name.trim().length > 0 && (
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
