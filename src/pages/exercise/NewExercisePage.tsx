import { useCookies } from "react-cookie";
import PageBase from "../../components/base/PageBase";
import styles from "./new-exercise.module.css";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import { useEffect, useRef, useState } from "react";
import type { CreationFormRef } from "../../components/creationForm/CreationForm";
import type { ExerciseRequest } from "../../interface/Exercise";
import Axios from "axios";
import CreationForm from "../../components/creationForm/CreationForm";
import InputField from "../../components/input/InputField";
import TextAreaField from "../../components/input/TextAreaField";

interface NewExerciseInstancePage {
  baseUrl: string;
}

function NewExercisePage({ baseUrl }: NewExerciseInstancePage) {
  const [cookies] = useCookies(["token"]);
  const exerciseURL = "exercise/";
  const exerciseTypesURL = "types";

  const [exerciseTypesList, setExerciseTypesList] = useState([]);
  const [showAddition, setShowAddition] = useState<boolean>(false); // TODO: use to show the new exercise

  const creationFormRef = useRef<CreationFormRef>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const nextStep = (steps = 1) => creationFormRef.current?.nextStep(steps);
  const prevStep = () => creationFormRef.current?.prevStep();

  const [exerciseRequest, setexerciseRequest] = useState<ExerciseRequest>({
    name: "",
    description: "",
    mainMuscleTarget: [],
    secondaryMuscleTarget: [],
    possibleFocus: [],
    possibleEquipment: [],
    possibleGoalUnits: [],
  });

  const setexerciseName = (name: string) => {
    setexerciseRequest({
      name: name,
      description: exerciseRequest.description,
      mainMuscleTarget: exerciseRequest.mainMuscleTarget,
      secondaryMuscleTarget: exerciseRequest.secondaryMuscleTarget,
      possibleFocus: exerciseRequest.possibleFocus,
      possibleEquipment: exerciseRequest.possibleEquipment,
      possibleGoalUnits: exerciseRequest.possibleGoalUnits,
    });
  };

  const setexerciseDescription = (description: string) => {
    setexerciseRequest({
      name: exerciseRequest.name,
      description: description,
      mainMuscleTarget: exerciseRequest.mainMuscleTarget,
      secondaryMuscleTarget: exerciseRequest.secondaryMuscleTarget,
      possibleFocus: exerciseRequest.possibleFocus,
      possibleEquipment: exerciseRequest.possibleEquipment,
      possibleGoalUnits: exerciseRequest.possibleGoalUnits,
    });
  };

  const handleNameInputOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setexerciseName(e.currentTarget.value);
  };

  const handleDescInputOnKeyUp = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setexerciseDescription(e.currentTarget.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    nextStep();

    Axios.post(baseUrl + exerciseURL, exerciseRequest, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        nextStep();
      })
      .catch((error) => {
        nextStep(2);
      });
  };

  useEffect(() => {
    // Get exercise Types
    Axios.get(baseUrl + exerciseURL + exerciseTypesURL, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setExerciseTypesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseUrl, exerciseURL]);

  // const prepareDOMElements = useMemo(() => {
  //   return exerciseTypesList.map((type: string) => (
  //     <ListElementCard
  //       listElement={{
  //         // Edit the string enum format
  //         name: type
  //           .replace("_", " ")
  //           .split(" ")
  //           .map(
  //             (word) =>
  //               word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
  //           )
  //           .join(" "),
  //       }}
  //       extraClasses={`${styles["exercise-type-card"]} ${cardStyles["smaller-text"]}`}
  //       onClickHandler={() => {
  //         setexerciseType(type);
  //         nextStep();
  //       }}
  //       key={type}
  //     />
  //   ));
  // }, [exerciseTypesList]);
  return (
    <>
      <PageBase header="New exercise" />
      <div className={styles["selected-type"]}></div>
      {showAddition && <div></div>}
      <CreationForm ref={creationFormRef} onSubmitHandler={handleFormSubmit}>
        {/* <div
          className={creationFormStyles["form-slide"]}
          id="slide1"
        >
          <div className={styles["form-slide-header"]}>
            Select type of exercise
            <div className={styles["types-container"]}>
              {prepareDOMElements}
            </div>
          </div>
          <div className={styles["type-select-container"]}>
            <div className={styles.types}></div>
          </div>
        </div> */}
        <div className={creationFormStyles["form-slide"]} id="slide2">
          <div
            onClick={() => {
              prevStep();
            }}
            className={creationFormStyles.step}
          >
            &#60; Back
          </div>
          <div className={styles["input-fields"]}>
            <InputField
              placeHolder="Name"
              name="equiupment-name"
              id="exercise-name"
              inputRef={nameInputRef}
              handleOnKeyUp={handleNameInputOnKeyUp}
            />
            <TextAreaField
              placeHolder="Description"
              name="exercise-description"
              id="exercise-description"
              inputRef={descriptionInputRef}
              handleOnKeyUp={handleDescInputOnKeyUp}
            />
            <button>Submit</button>
          </div>
        </div>
      </CreationForm>
    </>
  );
}

export default NewExercisePage;
