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
import Window from "../../components/window/Window";

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
  const [selectedMainMuscleGroups, setSelectedMainMuscleGroups] = useState<
    string[]
  >([]);
  const [selectedSecondaryMuscleGroups, setSelectedSecondaryMuscleGroups] =
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

  const setMainMuscleTarget = (target: string) => {
    setExerciseRequest((prev) => ({
      ...prev,
      mainMuscleTarget: prev.mainMuscleTarget.includes(target)
        ? prev.mainMuscleTarget.filter((t) => t !== target)
        : [...prev.mainMuscleTarget, target],
      secondaryMuscleTarget: prev.secondaryMuscleTarget.filter(
        (t) => t !== target
      ),
    }));
  };

  const setSecondaryMuscleTarget = (target: string) => {
    setExerciseRequest((prev) => ({
      ...prev,
      mainMuscleTarget: prev.mainMuscleTarget.filter((t) => t !== target),
      secondaryMuscleTarget: prev.secondaryMuscleTarget.includes(target)
        ? prev.secondaryMuscleTarget.filter((t) => t !== target)
        : [...prev.secondaryMuscleTarget, target],
    }));
  };

  const addNewMainGroupTargets = (muscle: string) => {
    setExerciseRequest((prev) => {
      const secondarySet = new Set(prev.secondaryMuscleTarget);
      const groupTargets = muscleTargetsList
        .filter(
          (t: MuscleTarget) => t.group === muscle && !secondarySet.has(t.name)
        )
        .map((t: MuscleTarget) => t.name);
      console.log(groupTargets);
      return {
        ...prev,
        mainMuscleTarget: Array.from(
          new Set([...prev.mainMuscleTarget, ...groupTargets])
        ),
      };
    });
  };

  const addNewSecondaryGroupTargets = (muscle: string) => {
    setExerciseRequest((prev) => {
      const mainSet = new Set(prev.mainMuscleTarget);
      const groupTargets = muscleTargetsList
        .filter((t: MuscleTarget) => t.group === muscle && !mainSet.has(t.name))
        .map((t: MuscleTarget) => t.name);
      console.log(groupTargets);

      return {
        ...prev,
        secondaryMuscleTarget: Array.from(
          new Set([...prev.secondaryMuscleTarget, ...groupTargets])
        ),
      };
    });
  };

  const removeMainGroupTargets = (muscle: string) => {
    let groupTargets = muscleTargetsList.filter(
      (t: MuscleTarget) =>
        t.group === muscle &&
        !exerciseRequest.secondaryMuscleTarget.includes(t.name)
    );

    setExerciseRequest((prev) => ({
      ...prev,
      mainMuscleTarget: prev.mainMuscleTarget.filter((t) =>
        groupTargets.every((gt: MuscleTarget) => gt.name != t)
      ),
    }));
  };

  const removeSecondaryGroupTargets = (muscle: string) => {
    let groupTargets = muscleTargetsList.filter(
      (t: MuscleTarget) =>
        t.group === muscle && !exerciseRequest.mainMuscleTarget.includes(t.name)
    );

    setExerciseRequest((prev) => ({
      ...prev,
      secondaryMuscleTarget: prev.secondaryMuscleTarget.filter((t) =>
        groupTargets.every((gt: MuscleTarget) => gt.name != t)
      ),
    }));
  };

  const toggleSelectedMainMuscleGroup = (muscle: string) => {
    setSelectedMainMuscleGroups((prev) => {
      if (prev.includes(muscle)) {
        // remove
        removeMainGroupTargets(muscle);
        return prev.filter((m) => m !== muscle);
      } else {
        // add
        addNewMainGroupTargets(muscle);
        return [...prev, muscle];
      }
    });
  };

  const toggleSelectedSecondaryMuscleGroup = (muscle: string) => {
    setSelectedSecondaryMuscleGroups((prev) => {
      if (prev.includes(muscle)) {
        // remove
        removeSecondaryGroupTargets(muscle);
        return prev.filter((m) => m !== muscle);
      } else {
        // add
        addNewSecondaryGroupTargets(muscle);
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
    console.log(exerciseRequest);
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
            .replaceAll("_", " ")
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
            .replaceAll("_", " ")
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

  // The groups displayed in the selection window
  const prepareMainMuscleGroupsDOMElements = useMemo(() => {
    return muscleGroupList.map((muscle: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: muscle
            .replaceAll("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/" + muscle.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles.small} `}
        isSelected={selectedMainMuscleGroups.includes(muscle)}
        onClickHandler={() => {
          toggleSelectedMainMuscleGroup(muscle);
        }}
        key={muscle + "1"}
      />
    ));
  }, [muscleTargetsList, selectedMainMuscleGroups]);

  // The groups displayed in the selection window
  const prepareSecondaryMuscleGroupsDOMElements = useMemo(() => {
    return muscleGroupList.map((muscle: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: muscle
            .replaceAll("_", " ")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/" + muscle.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles.small} `}
        isSelected={selectedSecondaryMuscleGroups.includes(muscle)}
        onClickHandler={() => {
          toggleSelectedSecondaryMuscleGroup(muscle);
        }}
        key={muscle + "2"}
      />
    ));
  }, [muscleTargetsList, selectedSecondaryMuscleGroups]);

  const prepareSelectedMainMuscleGroupsDOMElements = useMemo(() => {
    return selectedMainMuscleGroups.map((muscle: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: muscle
            .replaceAll("_", " ")
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
            <div
              className={`${cardStyles.clickable}
                ${
                  exerciseRequest.mainMuscleTarget.includes(t.name)
                    ? cardStyles.selected
                    : ""
                }
              `}
              onClick={() => setMainMuscleTarget(t.name)}
              key={t.name}
            >
              {exerciseRequest.mainMuscleTarget.includes(t.name) && (
                <span>&#10003;</span>
              )}
              {t.name
                .replaceAll("_", " ")
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() +
                    word.substring(1).toLowerCase()
                )
                .join(" ")}
            </div>
          ))}
      </ListElementCard>
    ));
  }, [
    selectedMainMuscleGroups,
    selectedSecondaryMuscleGroups,
    exerciseRequest,
  ]);

  const prepareSelectedSecondaryMuscleGroupsDOMElements = useMemo(() => {
    return selectedSecondaryMuscleGroups.map((muscle: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: muscle
            .replaceAll("_", " ")
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
            <div
              className={`${cardStyles.clickable}
                ${
                  exerciseRequest.secondaryMuscleTarget.includes(t.name)
                    ? cardStyles.selected
                    : ""
                }
              `}
              onClick={() => setSecondaryMuscleTarget(t.name)}
            >
              {exerciseRequest.secondaryMuscleTarget.includes(t.name) && (
                <span>&#10003;</span>
              )}
              {t.name
                .replaceAll("_", " ")
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() +
                    word.substring(1).toLowerCase()
                )
                .join(" ")}
            </div>
          ))}
      </ListElementCard>
    ));
  }, [
    selectedMainMuscleGroups,
    selectedSecondaryMuscleGroups,
    exerciseRequest,
  ]);

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
          <div className={creationFormStyles["nav-btn-wrap"]}>
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
        </div>
        <div className={creationFormStyles["form-slide"]} id="slide2">
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
        <div className={creationFormStyles["form-slide"]} id="slide3">
          <div className={styles["form-slide-header"]}>
            What units could the performance be measured on?
          </div>
          <div className={styles["focus-categories-container"]}>
            {prepareGoalUnitsDOMElements}
          </div>
          <div className={creationFormStyles["nav-btn-wrap"]}>
            <div
              onClick={() => {
                prevStep();
              }}
              className={creationFormStyles.step}
            >
              &#60; Back
            </div>
            {exerciseRequest.possibleGoalUnits.length > 0 && (
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
        <div className={creationFormStyles["form-slide"]} id="slide4">
          <div className={styles["form-slide-header"]}>
            Select main and secondary muscle targets of the exercise (if any
            specific). They will later help in categorization and statistics.
          </div>
          <div>
            <div className={styles["muscle-header"]}>Main muscle</div>
            <div className={styles["selected-muscles"]}>
              <ListElementCard
                listElementData={{ title: "Add", imageSrc: "/add.png" }}
                extraClasses={cardStyles.small}
                onClickHandler={() => {
                  console.log(exerciseRequest);
                  setShowMainMuscleSelector(true);
                }}
              />
              {prepareSelectedMainMuscleGroupsDOMElements}
            </div>
            <Window
              children={prepareMainMuscleGroupsDOMElements}
              showWindow={showMainMuscleSelector}
              setShowWindow={setShowMainMuscleSelector}
            />
            <div className={styles["muscle-header"]}>Secondary muscle</div>
            <div className={styles["selected-muscles"]}>
              <ListElementCard
                listElementData={{ title: "Add", imageSrc: "/add.png" }}
                extraClasses={cardStyles.small}
                onClickHandler={() => {
                  setShowSecondaryMuscleSelector(true);
                }}
              />
              {prepareSelectedSecondaryMuscleGroupsDOMElements}
            </div>
            <Window
              children={prepareSecondaryMuscleGroupsDOMElements}
              showWindow={showSecondaryMuscleSelector}
              setShowWindow={setShowSecondaryMuscleSelector}
            />
          </div>
          <div className={creationFormStyles["nav-btn-wrap"]}>
            <div
              onClick={() => {
                prevStep();
              }}
              className={creationFormStyles.step}
            >
              &#60; Back
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
        </div>
        <div className={creationFormStyles["form-slide"]} id="slide5">
          <div className={styles["form-slide-header"]}>
            What equipment can be used for this exercise?
          </div>
          <EquipmentList
            baseUrl={baseUrl}
            haveAddBtn={false}
            handleOnElementClick={(id: number) => {
              setPossibleEquipment(id);
            }}
            idList={exerciseRequest.possibleEquipment}
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

            <button>Submit</button>
          </div>
        </div>
      </CreationForm>
    </>
  );
}

export default NewExercisePage;
