import AlertMessage from "../../components/alert/AlertMessage";
import type { NewExerciseInstanceSlideProps } from "./NewExerciseInstanceSlideProps";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import styles from "./new-exercise-instance.module.css";
import { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import ListElementCard from "../../components/display/list/ListElementCard";

function RangeOfMotionSlide({
  baseUrl,
  exerciseInstanceRequest,
  setExerciseInstanceRequest,
  nextStep = () => {},
  prevStep = () => {},
}: NewExerciseInstanceSlideProps) {
  const [cookies] = useCookies(["token"]);

  const [rangesList, setRangesList] = useState([]);

  const setRangeOfMotion = (range: string) => {
    setExerciseInstanceRequest((prev) => ({
      ...prev,
      rangeOfMotion: range,
    }));
  };

  useEffect(() => {
    Axios.get(baseUrl + "exercise-instance/ranges", {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    }).then((response) => {
      setRangesList(response.data);
    });
  }, [baseUrl]);

  const prepareRangesDOMElements = useMemo(() => {
    return rangesList.map((range: string) => (
      <ListElementCard
        listElementData={{
          // Edit the string enum format
          title: range
            .split("_")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" "),
          imageSrc: "/range/" + range.toLowerCase() + "-icon.png",
        }}
        extraClasses={`${cardStyles.small} `}
        isSelected={exerciseInstanceRequest.rangeOfMotion === range}
        onClickHandler={() => {
          setRangeOfMotion(range);
        }}
        key={range}
      />
    ));
  }, [rangesList, exerciseInstanceRequest]);

  return (
    <div className={creationFormStyles["form-slide"]} id="slide3">
      <AlertMessage>
        Select desired <strong>range of motion</strong>
      </AlertMessage>
      <div className={styles["range-categories-container"]}>
        {prepareRangesDOMElements}
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
        {exerciseInstanceRequest.rangeOfMotion.length > 0 && (
          <button>Submit</button>
        )}
      </div>
    </div>
  );
}

export default RangeOfMotionSlide;
