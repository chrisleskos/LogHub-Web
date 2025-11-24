import type { NewSequenceSlideProps } from "./NewSequenceSlideProps";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import styles from "./new-sequence.module.css";
import AlertMessage from "../../components/alert/AlertMessage";
import ListElementCard from "../../components/display/list/ListElementCard";
import { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import type { ExerciseInstanceResponse } from "../../interface/ExerciseInstance";
import type { RoundRequest } from "../../interface/Round";
import Window from "../../components/window/Window";
import ExerciseInstanceList from "../../components/display/list/specifics/ExerciseInstanceList";

function RoundSetUpSlide({
  baseUrl = "",
  sequenceRequest,
  setSequenceRequest,
  nextStep = () => {},
  prevStep = () => {},
}: NewSequenceSlideProps) {
  const exerciseInstanceURL = "exercise-instance";

  const [cookies] = useCookies(["token"]);

  const [roundList, setRoundList] = useState<RoundRequest[]>([]);
  // Round that is currently being set-up via modal window
  const [operatingRound, setOperatingRound] = useState<RoundRequest>({
    exerciseInstanceIds: [],
    name: "",
  });
  const [exerciseInstanceList, setExerciseInstanceList] = useState<
    ExerciseInstanceResponse[]
  >([]);

  const [showWindowModal, setShowWindowModal] = useState<boolean>(false);

  const setRoundExercise = (id: number) => {
    operatingRound.exerciseInstanceIds.push(id);
    setRoundList((prev) => [
      ...prev.filter((r) => r.name !== operatingRound.name),
      {
        exerciseInstanceIds: operatingRound.exerciseInstanceIds,
        name: operatingRound.name,
      },
    ]);
  };

  //   useEffect(() => {
  //     Axios.get(baseUrl + exerciseInstanceURL, {
  //       headers: {
  //         Authorization: "Bearer " + cookies.token,
  //       },
  //     }).then((response) => {
  //       setExerciseInstanceList(response.data);
  //     });
  //   }, []);

  const prepareRoundsDOMElements = useMemo(() => {
    console.log(roundList);
    return roundList.map((r: RoundRequest, i: number) => (
      <div key={r.name + i}>
        <input defaultValue={r.name} />
        <div>{r.exerciseInstanceIds.map((id) => id)}</div>
        <ListElementCard
          listElementData={{ title: "Add exercise", imageSrc: "/add.png" }}
          extraClasses={cardStyles.small}
          onClickHandler={() => {
            setOperatingRound(r);
            setShowWindowModal(true);
          }}
        />
      </div>
    ));
  }, [roundList]);
  return (
    <div className={creationFormStyles["form-slide"]} id="slide3">
      <AlertMessage>
        Specify the <strong>rounds</strong> of the sequence
      </AlertMessage>
      <Window showWindow={showWindowModal} setShowWindow={setShowWindowModal}>
        <ExerciseInstanceList
          baseUrl={baseUrl}
          handleOnElementClick={setRoundExercise}
          haveAddBtn={false}
          idList={operatingRound.exerciseInstanceIds}
        />
      </Window>
      <div>
        {prepareRoundsDOMElements}
        <ListElementCard
          listElementData={{ title: "Add round", imageSrc: "/add.png" }}
          extraClasses={cardStyles.small}
          onClickHandler={() => {
            setRoundList((prev) => [
              ...prev,
              { exerciseInstanceIds: [], name: "Round " + (prev.length + 1) },
            ]);
          }}
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
        {sequenceRequest.name.trim().length > 0 && (
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

export default RoundSetUpSlide;
