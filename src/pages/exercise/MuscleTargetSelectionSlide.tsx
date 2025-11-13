import { useEffect, useMemo, useState } from "react";
import AlertMessage from "../../components/alert/AlertMessage";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import ListElementCard from "../../components/display/list/ListElementCard";
import styles from "./new-exercise.module.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import type { NewExerciseSlideProps } from "./NewExerciseSlideProps";
import type { MuscleTarget } from "../../interface/Muscle";
import Window from "../../components/window/Window";

function MuscleTargetSelectionSlide({
  baseUrl,
  exerciseRequest,
  setExerciseRequest,
  nextStep = () => {},
  prevStep = () => {},
}: NewExerciseSlideProps) {
  const muscleTargetsUrl = "exercise/muscle-targets";

  const [cookies] = useCookies(["token"]);

  const [muscleTargetsList, setMuscleTargetsList] = useState([]);
  const [selectedMainMuscleGroups, setSelectedMainMuscleGroups] = useState<
    string[]
  >([]);
  const [selectedSecondaryMuscleGroups, setSelectedSecondaryMuscleGroups] =
    useState<string[]>([]);
  const [showMainMuscleSelector, setShowMainMuscleSelector] = useState(false);
  const [showSecondaryMuscleSelector, setShowSecondaryMuscleSelector] =
    useState(false);

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

  const muscleGroupList = useMemo(() => {
    return [...new Set(muscleTargetsList.map((t: MuscleTarget) => t.group))];
  }, [muscleTargetsList]);

  // The groups displayed in the selection window
  const prepareMainMuscleGroupsDOMElements = useMemo(() => {
    return muscleGroupList.map((muscle: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: muscle
            .split("_")
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
            .split("_")
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
            .split("_")
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
                .split("_")
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
            .split("_")
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
                .split("_")
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

  useEffect(() => {
    // Get muscle groups
    Axios.get(baseUrl + muscleTargetsUrl, {
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
  }, [baseUrl]);

  return (
    <div className={creationFormStyles["form-slide"]} id="slide4">
      <AlertMessage>
        Select main & secondary <strong>muscles </strong>
        the exercise targets.
      </AlertMessage>
      <div>
        <div className={styles["muscle-header"]}>Main muscles</div>
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
        <div className={styles["muscle-header"]}>Secondary muscles</div>
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
  );
}

export default MuscleTargetSelectionSlide;
