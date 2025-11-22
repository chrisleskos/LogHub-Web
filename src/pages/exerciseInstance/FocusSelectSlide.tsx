import { useMemo } from "react";
import type { NewExerciseInstanceSlideProps } from "./NewExerciseInstanceSlideProps";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import ListElementCard from "../../components/display/list/ListElementCard";
import AlertMessage from "../../components/alert/AlertMessage";
import styles from "./new-exercise-instance.module.css";

interface FocusSelectSlideProps extends NewExerciseInstanceSlideProps {
  possibleFocus: string[];
}

function FocusSelectSlide({
  exerciseInstanceRequest,
  setExerciseInstanceRequest,
  nextStep = () => {},
  prevStep = () => {},
  possibleFocus,
}: FocusSelectSlideProps) {
  const setFocus = (focus: string) => {
    setExerciseInstanceRequest((prev) => ({
      ...prev,
      focus: prev.focus.includes(focus)
        ? prev.focus.filter((u) => u !== focus)
        : [...prev.focus, focus],
    }));
  };

  const prepareFocusCategoriesDOMElements = useMemo(() => {
    return possibleFocus.map((focus: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: focus
            .split("_")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/focus/" + focus.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles.small} `}
        isSelected={exerciseInstanceRequest.focus.includes(focus)}
        onClickHandler={() => {
          setFocus(focus);
        }}
        key={focus}
      />
    ));
  }, [possibleFocus]);
  return (
    <div className={creationFormStyles["form-slide"]} id="slide2">
      <AlertMessage>
        From the selected exercise's focus list, select the{" "}
        <strong>implementation focus</strong>.
      </AlertMessage>
      <div className={styles["focus-categories-container"]}>
        {prepareFocusCategoriesDOMElements}
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
        {exerciseInstanceRequest.focus.length > 0 && (
          <div
            className={creationFormStyles["next-btn"]}
            onClick={() => {
              nextStep === undefined ? () => {} : nextStep();
            }}
          >
            Next
          </div>
        )}
      </div>
    </div>
  );
}

export default FocusSelectSlide;
