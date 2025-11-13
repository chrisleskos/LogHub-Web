import { useEffect, useMemo, useState } from "react";
import AlertMessage from "../../components/alert/AlertMessage";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import ListElementCard from "../../components/display/list/ListElementCard";
import styles from "./new-exercise.module.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import type { NewExerciseSlideProps } from "./NewExerciseSlideProps";

function GoalUnitsSlide({
  baseUrl,
  exerciseRequest,
  setExerciseRequest,
  nextStep = () => {},
  prevStep = () => {},
}: NewExerciseSlideProps) {
  const goalUnitsUrl = "goal/units";

  const [cookies] = useCookies(["token"]);
  const [goalUnitsList, setGoalUnitsList] = useState([]);

  const setPossibleGoalUnits = (goalUnit: string) => {
    setExerciseRequest((prev) => ({
      ...prev,
      possibleGoalUnits: prev.possibleGoalUnits.includes(goalUnit)
        ? prev.possibleGoalUnits.filter((u) => u !== goalUnit)
        : [...prev.possibleGoalUnits, goalUnit],
    }));
  };

  const prepareGoalUnitsDOMElements = useMemo(() => {
    return goalUnitsList.map((goal: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: goal
            .split("_")
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

  useEffect(() => {
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
  }, []);

  return (
    <div className={creationFormStyles["form-slide"]} id="slide3">
      <AlertMessage>
        What <strong>units</strong> could the performance be measured on?
      </AlertMessage>
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
  );
}

export default GoalUnitsSlide;
