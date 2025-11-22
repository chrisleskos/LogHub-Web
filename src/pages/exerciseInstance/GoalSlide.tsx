import { useMemo } from "react";
import ListElementCard from "../../components/display/list/ListElementCard";
import type { NewExerciseInstanceSlideProps } from "./NewExerciseInstanceSlideProps";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import styles from "./new-exercise-instance.module.css";
import AlertMessage from "../../components/alert/AlertMessage";
import type { GoalRequest } from "../../interface/Goal";

interface GoalSlideProps extends NewExerciseInstanceSlideProps {
  possibleGoalUnits: string[];
}

function GoalSlide({
  exerciseInstanceRequest,
  setExerciseInstanceRequest,
  nextStep = () => {},
  prevStep = () => {},
  possibleGoalUnits,
}: GoalSlideProps) {
  const setGoals = (goal: GoalRequest) => {
    console.log(goal);
    setExerciseInstanceRequest((prev) => ({
      ...prev,
      goals: isGoalEmpty(goal)
        ? [
            ...prev.goals.filter(
              (prevGoal) => prevGoal.goalUnit !== goal.goalUnit
            ),
          ]
        : [
            // Remove the goal that had the same unit. No goals with same unit allowed
            ...prev.goals.filter(
              (prevGoal) => prevGoal.goalUnit !== goal.goalUnit
            ),
            goal,
          ],
    }));
  };

  const isGoalEmpty = (goal: GoalRequest) => {
    return goal.min === 0 && goal.max === 0;
  };

  const prepareGoalUnitsDOMElements = useMemo(() => {
    return possibleGoalUnits.map((goalUnit: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: goalUnit
            .split("_")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/goal/" + goalUnit.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles.small} `}
        isSelected={
          exerciseInstanceRequest.goals.filter(
            (existingGoal) => existingGoal.goalUnit === goalUnit
          ).length > 0
        }
        key={goalUnit}
        initChildrenShown={false}
      >
        <div>
          <span>Unit</span>
          <select>
            <option>KG</option>
            <option>LBS</option>
          </select>
        </div>
        <div>
          <input
            type="number"
            placeholder="Min"
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              const existingGoalOfUnit = exerciseInstanceRequest.goals.filter(
                (goal) => goal.goalUnit === goalUnit
              );

              if (existingGoalOfUnit.length === 0) {
                return setGoals({
                  goalUnit: goalUnit,
                  measurmentUnits: "",
                  reserve: 0,
                  min: Number(e.currentTarget.value),
                  max: Number(e.currentTarget.value),
                });
              }

              setGoals({
                goalUnit: goalUnit,
                measurmentUnits: existingGoalOfUnit[0].measurmentUnits,
                min: Number(e.currentTarget.value),
                max:
                  existingGoalOfUnit[0].max > Number(e.currentTarget.value)
                    ? existingGoalOfUnit[0].max
                    : Number(e.currentTarget.value),
                reserve: existingGoalOfUnit[0].reserve,
              });
            }}
            defaultValue={
              exerciseInstanceRequest.goals.filter(
                (goal) => goal.goalUnit === goalUnit
              )[0]?.min
            }
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Max"
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              const existingGoalOfUnit = exerciseInstanceRequest.goals.filter(
                (goal) => goal.goalUnit === goalUnit
              );

              if (existingGoalOfUnit.length === 0) {
                return setGoals({
                  goalUnit: goalUnit,
                  measurmentUnits: "",
                  reserve: 0,
                  min: Number(e.currentTarget.value),
                  max: Number(e.currentTarget.value),
                });
              }

              setGoals({
                goalUnit: goalUnit,
                measurmentUnits: existingGoalOfUnit[0].measurmentUnits,
                min:
                  existingGoalOfUnit[0].min < Number(e.currentTarget.value)
                    ? existingGoalOfUnit[0].min
                    : Number(e.currentTarget.value),
                max: Number(e.currentTarget.value),
                reserve: existingGoalOfUnit[0].reserve,
              });
            }}
            defaultValue={
              exerciseInstanceRequest.goals.filter(
                (goal) => goal.goalUnit === goalUnit
              )[0]?.max
            }
          />
        </div>
        <div>
          <input type="number" placeholder="Reserve" />
        </div>
        <div>
          <span>Static</span>
          <input type="checkbox" />
        </div>
      </ListElementCard>
    ));
  }, [possibleGoalUnits]);
  return (
    <div className={creationFormStyles["form-slide"]} id="slide1">
      <AlertMessage>
        Set exercise instance <strong>goals</strong>
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
        {exerciseInstanceRequest.goals.length > 0 && (
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

export default GoalSlide;
