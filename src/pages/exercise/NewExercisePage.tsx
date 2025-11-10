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
import EquipmentList from "../../components/display/list/specifics/EquipmentList";

interface NewExerciseInstancePage {
  baseUrl: string;
}

function NewExercisePage({ baseUrl }: NewExerciseInstancePage) {
  const [cookies] = useCookies(["token"]);
  const exerciseURL = "exercise/";
  const goalUnitsUrl = "goal/units";
  const exerciseFocusURL = "domain/focus-categories";

  const [exerciseFocusList, setExerciseFocusList] = useState([]);
  const [goalUnitsList, setGoalUnitsList] = useState([]);
  const [showAddition, setShowAddition] = useState<boolean>(false); // TODO: use to show the new exercise

  const creationFormRef = useRef<CreationFormRef>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const nextStep = (steps = 1) => creationFormRef.current?.nextStep(steps);
  const prevStep = () => creationFormRef.current?.prevStep();

  const [exerciseRequest, setExerciseRequest] = useState<ExerciseRequest>({
    name: "",
    description: "",
    mainMuscleTarget: [],
    secondaryMuscleTarget: [],
    possibleFocus: [],
    possibleEquipment: [],
    possibleGoalUnits: [],
  });

  const setexerciseName = (name: string) => {
    setExerciseRequest({
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
    setExerciseRequest({
      name: exerciseRequest.name,
      description: description,
      mainMuscleTarget: exerciseRequest.mainMuscleTarget,
      secondaryMuscleTarget: exerciseRequest.secondaryMuscleTarget,
      possibleFocus: exerciseRequest.possibleFocus,
      possibleEquipment: exerciseRequest.possibleEquipment,
      possibleGoalUnits: exerciseRequest.possibleGoalUnits,
    });
  };

  const setPossibleFocus = (focus: string) => {
    let focusArrToBeSet = exerciseRequest.possibleFocus;
    let index = focusArrToBeSet.indexOf(focus);

    if (index === -1) {
      focusArrToBeSet.push(focus);
    } else {
      focusArrToBeSet.splice(index, 1);
    }

    setExerciseRequest({
      name: exerciseRequest.name,
      description: exerciseRequest.description,
      mainMuscleTarget: exerciseRequest.mainMuscleTarget,
      secondaryMuscleTarget: exerciseRequest.secondaryMuscleTarget,
      possibleFocus: focusArrToBeSet,
      possibleEquipment: exerciseRequest.possibleEquipment,
      possibleGoalUnits: exerciseRequest.possibleGoalUnits,
    });
  };

  const setPossibleEquipment = (equipment: number) => {
    let equipmentIdArrToBeSet = exerciseRequest.possibleEquipment;
    let index = equipmentIdArrToBeSet.indexOf(equipment);

    if (index === -1) {
      equipmentIdArrToBeSet.push(equipment);
    } else {
      equipmentIdArrToBeSet.splice(index, 1);
    }

    setExerciseRequest({
      name: exerciseRequest.name,
      description: exerciseRequest.description,
      mainMuscleTarget: exerciseRequest.mainMuscleTarget,
      secondaryMuscleTarget: exerciseRequest.secondaryMuscleTarget,
      possibleFocus: exerciseRequest.possibleFocus,
      possibleEquipment: equipmentIdArrToBeSet,
      possibleGoalUnits: exerciseRequest.possibleGoalUnits,
    });
  };

  const setPossibleGoalUnits = (goalUnit: string) => {
    let goalUnitsArrToBeSet = exerciseRequest.possibleGoalUnits;
    let index = goalUnitsArrToBeSet.indexOf(goalUnit);

    if (index === -1) {
      goalUnitsArrToBeSet.push(goalUnit);
    } else {
      goalUnitsArrToBeSet.splice(index, 1);
    }

    setExerciseRequest({
      name: exerciseRequest.name,
      description: exerciseRequest.description,
      mainMuscleTarget: exerciseRequest.mainMuscleTarget,
      secondaryMuscleTarget: exerciseRequest.secondaryMuscleTarget,
      possibleFocus: exerciseRequest.possibleFocus,
      possibleEquipment: exerciseRequest.possibleEquipment,
      possibleGoalUnits: goalUnitsArrToBeSet,
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
      .then(() => {
        nextStep();
      })
      .catch(() => {
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

    // Get goal units
    Axios.get(baseUrl + goalUnitsUrl, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setGoalUnitsList(response.data);
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
          title: focus
            .replace("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/" + focus.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles["smaller-text"]} `}
        isSelected={exerciseRequest.possibleFocus.includes(focus)}
        onClickHandler={() => {
          setPossibleFocus(focus);
        }}
        key={focus}
      />
    ));
  }, [exerciseFocusList, exerciseRequest]);

  const prepareGoalUnitsDOMElements = useMemo(() => {
    return goalUnitsList.map((goal: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: goal
            .replace("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/" + goal.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles["smaller-text"]} `}
        isSelected={exerciseRequest.possibleGoalUnits.includes(goal)}
        onClickHandler={() => {
          setPossibleGoalUnits(goal);
        }}
        key={goal}
      />
    ));
  }, [exerciseFocusList, exerciseRequest]);
  return (
    <>
      <PageBase header="New exercise" />
      <div className={styles["selected-type"]}>
        {exerciseRequest.possibleFocus.map((focus) => (
          <span key={"selected-focus-" + focus}> #{focus.toLowerCase()} </span>
        ))}
      </div>
      {showAddition && <div></div>}
      <CreationForm ref={creationFormRef} onSubmitHandler={handleFormSubmit}>
        <div className={creationFormStyles["form-slide"]} id="slide1">
          <div className={styles["form-slide-header"]}>
            Select type of exercise
          </div>
          <div className={styles["focus-categories-container"]}>
            {prepareFocusCategoriesDOMElements}
          </div>
          {exerciseRequest.possibleFocus.length > 0 && (
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
        <div className={creationFormStyles["form-slide"]} id="slide3">
          <div className={styles["form-slide-header"]}>
            What equipment can be used for this exercise?
          </div>
          <div
            onClick={() => {
              prevStep();
            }}
            className={creationFormStyles.step}
          >
            &#60; Back
          </div>
          <EquipmentList
            baseUrl={baseUrl}
            haveAddBtn={false}
            handleOnElementClick={(id: number) => {
              setPossibleEquipment(id);
            }}
            idList={exerciseRequest.possibleEquipment}
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
        <div className={creationFormStyles["form-slide"]} id="slide4">
          <div className={styles["form-slide-header"]}>
            What units could the performance be measured on?
          </div>
          <div
            onClick={() => {
              prevStep();
            }}
            className={creationFormStyles.step}
          >
            &#60; Back
          </div>
          <div className={styles["focus-categories-container"]}>
            {prepareGoalUnitsDOMElements}
          </div>
          <div
            className={creationFormStyles["next-btn"]}
            onClick={() => {
              nextStep();
            }}
          >
            Next
          </div>
        </div>
      </CreationForm>
    </>
  );
}

export default NewExercisePage;
