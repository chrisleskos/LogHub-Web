import { useCookies } from "react-cookie";
import PageBase from "../../components/base/PageBase";
import styles from "./new-exercise.module.css";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CreationFormRef } from "../../components/creationForm/CreationForm";
import type { ExerciseRequest } from "../../interface/Exercise";
import Axios from "axios";
import CreationForm from "../../components/creationForm/CreationForm";
import InputField from "../../components/input/InputField";
import TextAreaField from "../../components/input/TextAreaField";
import ListElementCard from "../../components/display/list/ListElementCard";

interface NewExerciseInstancePage {
  baseUrl: string;
}

function NewExercisePage({ baseUrl }: NewExerciseInstancePage) {
  const [cookies] = useCookies(["token"]);
  const exerciseURL = "exercise/";
  const exerciseFocusURL = "domain/focus-categories";

  const [exerciseFocusList, setExerciseFocusList] = useState([]);
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
    // Get focus categories
    Axios.get(baseUrl + exerciseFocusURL, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setExerciseFocusList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseUrl, exerciseURL]);

  const prepareFocusCategoriesDOMElements = useMemo(() => {
    return exerciseFocusList.map((focus: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          name: focus
            .replace("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
        }}
        extraClasses={` ${cardStyles["smaller-text"]}`}
        onClickHandler={() => {
          nextStep();
        }}
        key={focus}
      />
    ));
  }, [exerciseFocusList]);
  return (
    <>
      <PageBase header="New exercise" />
      <div className={styles["selected-type"]}></div>
      {showAddition && <div></div>}
      <CreationForm ref={creationFormRef} onSubmitHandler={handleFormSubmit}>
        <div className={creationFormStyles["form-slide"]} id="slide1">
          <div className={styles["form-slide-header"]}>
            Select type of exercise
          </div>
          <div className={styles["-container"]}>
            {prepareFocusCategoriesDOMElements}
          </div>
        </div>
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
            <div
              className={creationFormStyles["next-btn"]}
              onClick={() => {
                nextStep();
              }}
            >
              Next
            </div>
          </div>
        </div>
      </CreationForm>
    </>
  );
}

export default NewExercisePage;
