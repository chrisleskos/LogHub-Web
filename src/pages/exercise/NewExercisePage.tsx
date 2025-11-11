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
import type { MuscleTarget } from "../../interface/Muscle";

interface NewExerciseInstancePage {
  baseUrl: string;
}

function NewExercisePage({ baseUrl }: NewExerciseInstancePage) {
  const [cookies] = useCookies(["token"]);
  const exerciseURL = "exercise/";
  const goalUnitsUrl = "goal/units";
  const muscleTargetsUrl = "muscle-targets";
  const exerciseFocusURL = "domain/focus-categories";

  const [exerciseFocusList, setExerciseFocusList] = useState([]);
  const [goalUnitsList, setGoalUnitsList] = useState([]);
  const [muscleTargetsList, setMuscleTargetsList] = useState([]);
  const [selectedMainMuscleTargets, setSelectedMainMuscleTargets] = useState<
    string[]
  >([]);
  const [selectedSecondaryMuscleTargets, setSelectedSecondaryMuscleTargets] =
    useState<string[]>([]);
  const [showMainMuscleSelector, setShowMainMuscleSelector] = useState(false);
  const [showSecondaryMuscleSelector, setShowSecondaryMuscleSelector] =
    useState(false);
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

  const setPossibleFocus = (focus: string) => {
    setExerciseRequest((prev) => ({
      ...prev,
      possibleFocus: prev.possibleFocus.includes(focus)
        ? prev.possibleFocus.filter((u) => u !== focus)
        : [...prev.possibleFocus, focus],
    }));
  };

  const setPossibleEquipment = (equipment: number) => {
    setExerciseRequest((prev) => ({
      ...prev,
      possibleEquipment: prev.possibleEquipment.includes(equipment)
        ? prev.possibleEquipment.filter((u) => u !== equipment)
        : [...prev.possibleEquipment, equipment],
    }));
  };

  const setPossibleGoalUnits = (goalUnit: string) => {
    setExerciseRequest((prev) => ({
      ...prev,
      possibleGoalUnits: prev.possibleGoalUnits.includes(goalUnit)
        ? prev.possibleGoalUnits.filter((u) => u !== goalUnit)
        : [...prev.possibleGoalUnits, goalUnit],
    }));
  };

  const addNewGroupTargets = () => {};

  const toggleMainMuscleGroup = (muscle: string) => {
    let a = setSelectedMainMuscleTargets((prev) => {
      if (prev.includes(muscle)) {
        // remove
        return prev.filter((m) => m !== muscle);
      } else {
        // add
        return [...prev, muscle];
      }
    });
    console.log(a);
  };

  const toggleSecondaryMuscleGroup = (muscle: string) => {
    setSelectedSecondaryMuscleTargets((prev) => {
      if (prev.includes(muscle)) {
        // remove
        return prev.filter((m) => m !== muscle);
      } else {
        // add
        return [...prev, muscle];
      }
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

    // Get muscle groups
    Axios.get(baseUrl + exerciseURL + muscleTargetsUrl, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        console.log(response);
        setMuscleTargetsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseUrl, exerciseURL]);

  const muscleGroupList = useMemo(() => {
    return [...new Set(muscleTargetsList.map((t: MuscleTarget) => t.group))];
  }, [muscleTargetsList]);

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
        extraClasses={`${cardStyles.small} `}
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
        extraClasses={`${cardStyles.small} `}
        isSelected={exerciseRequest.possibleGoalUnits.includes(goal)}
        onClickHandler={() => {
          setPossibleGoalUnits(goal);
        }}
        key={goal}
      />
    ));
  }, [goalUnitsList, exerciseRequest]);

  const prepareMainMuscleTargetsDOMElements = useMemo(() => {
    return muscleGroupList.map((muscle: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: muscle
            .replace("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/" + muscle.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles.small} `}
        isSelected={selectedMainMuscleTargets.includes(muscle)}
        onClickHandler={() => {
          toggleMainMuscleGroup(muscle);
        }}
        key={muscle + "1"}
      />
    ));
  }, [muscleTargetsList, selectedMainMuscleTargets]);

  const prepareSecondaryMuscleTargetsDOMElements = useMemo(() => {
    return muscleGroupList.map((muscle: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: muscle
            .replace("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/" + muscle.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles.small} `}
        isSelected={selectedSecondaryMuscleTargets.includes(muscle)}
        onClickHandler={() => {
          toggleSecondaryMuscleGroup(muscle);
        }}
        key={muscle + "2"}
      />
    ));
  }, [muscleTargetsList, selectedSecondaryMuscleTargets]);

  const prepareSelectedMainMuscleTargetsDOMElements = useMemo(() => {
    return selectedMainMuscleTargets.map((muscle: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: muscle
            .replace("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/" + muscle.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles.small} `}
        key={muscle + "11"}
      >
        {muscleTargetsList
          .filter((t: MuscleTarget) => t.group === muscle)
          .map((t: MuscleTarget) => (
            <div>{t.name}</div>
          ))}
      </ListElementCard>
    ));
  }, [selectedMainMuscleTargets]);

  const prepareSelectedSecondaryMuscleTargetsDOMElements = useMemo(() => {
    return selectedSecondaryMuscleTargets.map((muscle: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: muscle
            .replace("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/" + muscle.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles.small} `}
        key={muscle + "11"}
      >
        {muscleTargetsList
          .filter((t: MuscleTarget) => t.group === muscle)
          .map((t: MuscleTarget) => (
            <div>{t.name}</div>
          ))}
      </ListElementCard>
    ));
  }, [selectedSecondaryMuscleTargets]);

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
            Select what the exercise can focus on.
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
        <div className={creationFormStyles["form-slide"]} id="slide4">
          <div className={styles["form-slide-header"]}>
            Select main and secondary muscle targets of the exercise (if any
            specific). They will later help in categorization and statistics.
          </div>
          <div
            onClick={() => {
              prevStep();
            }}
            className={creationFormStyles.step}
          >
            &#60; Back
          </div>
          <div className={styles["focus-categories-containr"]}>
            <div className={styles.header}>Main muscle</div>
            <div className={styles["selected-muscles"]}>
              <ListElementCard
                listElementData={{ title: "Add", imageSrc: "/add.png" }}
                extraClasses={cardStyles.small}
                onClickHandler={() => {
                  setShowMainMuscleSelector(true);
                }}
              />
              {prepareSelectedMainMuscleTargetsDOMElements}
            </div>
            {showMainMuscleSelector && (
              <div className={styles["selector-window"]}>
                <div className={styles.main}>
                  <div
                    className={styles.header}
                    onClick={() => {
                      setShowMainMuscleSelector(false);
                    }}
                  >
                    &times;
                  </div>
                  <div className={styles.body}>
                    {prepareMainMuscleTargetsDOMElements}
                  </div>
                </div>
              </div>
            )}
            <div className={styles.header}>Secondary muscle</div>
            <div className={styles["selected-muscles"]}>
              <ListElementCard
                listElementData={{ title: "Add", imageSrc: "/add.png" }}
                extraClasses={cardStyles.small}
                onClickHandler={() => {
                  setShowSecondaryMuscleSelector(true);
                }}
              />
              {prepareSelectedSecondaryMuscleTargetsDOMElements}
            </div>
            {showSecondaryMuscleSelector && (
              <div className={styles["selector-window"]}>
                <div className={styles.main}>
                  <div
                    className={styles.header}
                    onClick={() => {
                      setShowSecondaryMuscleSelector(false);
                    }}
                  >
                    &times;
                  </div>
                  <div className={styles.body}>
                    {prepareSecondaryMuscleTargetsDOMElements}
                  </div>
                </div>
              </div>
            )}
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
        <div className={creationFormStyles["form-slide"]} id="slide5">
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
          <button>Submit</button>
        </div>
      </CreationForm>
    </>
  );
}

export default NewExercisePage;
