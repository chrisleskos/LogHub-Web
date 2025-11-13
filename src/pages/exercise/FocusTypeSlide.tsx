import { useEffect, useMemo, useState } from "react";
import AlertMessage from "../../components/alert/AlertMessage";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import ListElementCard from "../../components/display/list/ListElementCard";
import styles from "./new-exercise.module.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import type { NewExerciseSlideProps } from "./NewExerciseSlideProps";

function FocusTypeSlide({
  exerciseRequest,
  baseUrl,
  setExerciseRequest,
  nextStep = () => {},
}: NewExerciseSlideProps) {
  const [cookies] = useCookies(["token"]);
  const exerciseFocusURL = "domain/focus-categories";

  const [exerciseFocusList, setExerciseFocusList] = useState([]);

  const setPossibleFocus = (focus: string) => {
    setExerciseRequest((prev) => ({
      ...prev,
      possibleFocus: prev.possibleFocus.includes(focus)
        ? prev.possibleFocus.filter((u) => u !== focus)
        : [...prev.possibleFocus, focus],
    }));
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
  }, []);

  const prepareFocusCategoriesDOMElements = useMemo(() => {
    return exerciseFocusList.map((focus: string) => (
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

  return (
    <div className={creationFormStyles["form-slide"]} id="slide1">
      <AlertMessage>
        Select what the exercise can <strong>focus</strong> on.
      </AlertMessage>
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
  );
}

export default FocusTypeSlide;
