import type { NewSequenceSlideProps } from "./NewSequenceSlideProps";
import creationFormStyles from "../../components/creationForm/creation-form.module.css";
import cardStyles from "../../components/display/list/list-display.module.css";
import styles from "./new-sequence.module.css";
import AlertMessage from "../../components/alert/AlertMessage";
import ListElementCard from "../../components/display/list/ListElementCard";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import type { ExerciseInstanceResponse } from "../../interface/ExerciseInstance";
import type { RoundRequest, RoundUI } from "../../interface/Round";
import Window from "../../components/window/Window";
import ExerciseInstanceList from "../../components/display/list/specifics/ExerciseInstanceList";
import InputHeader from "../../components/input/InputHeader";
import CloseButton from "../../components/closeBtn/CloseButton";

function RoundSetUpSlide({
  baseUrl = "",
  sequenceRequest,
  setSequenceRequest,
  prevStep = () => {},
}: NewSequenceSlideProps) {
  const exerciseInstanceURL = "exercise-instance/";

  const [cookies] = useCookies(["token"]);

  const [roundList, setRoundList] = useState<RoundUI[]>([]);
  // Round that is currently being set-up via modal window
  const [operatingRoundIndex, setOperatingRoundIndex] = useState<number>(-1);
  const [exerciseInstanceList, setExerciseInstanceList] = useState<
    ExerciseInstanceResponse[]
  >([]);

  const [showWindowModal, setShowWindowModal] = useState<boolean>(false);

  const handleOnKeyUp = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newName = e.currentTarget.value;
    setRoundList((prev) =>
      prev.map((r, i) => (i === index ? { ...r, name: newName } : r))
    );
  };

  const removeRound = (index: number) => {
    setRoundList((prev) => prev.filter((_r, i) => i !== index));
  };

  const setRoundExercise = (id: number) => {
    const newRoundExerciseInstanceList = roundList[
      operatingRoundIndex
    ].exerciseInstanceIds.includes(id)
      ? roundList[operatingRoundIndex].exerciseInstanceIds.filter(
          (exInst) => exInst !== id
        )
      : [...roundList[operatingRoundIndex].exerciseInstanceIds, id];
    setRoundList((prev) => [
      ...prev.map((round, i) =>
        i === operatingRoundIndex
          ? {
              ...round,
              exerciseInstanceIds: newRoundExerciseInstanceList,
            }
          : round
      ),
    ]);

    // if id doesn't exist in the list
    if (
      !exerciseInstanceList.some((e: ExerciseInstanceResponse) => e.id === id)
    ) {
      loadNewExerciseInstance(id);
    }
  };

  const loadNewExerciseInstance = (id: number) => {
    Axios.get(baseUrl + exerciseInstanceURL + id, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    })
      .then((response) => {
        setExerciseInstanceList((prev) => [...prev, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("!Round updated in use effect: ");
    console.log(roundList);
    setSequenceRequest((prev) => ({
      ...prev,
      rounds: roundList.map(({ key, ...realRound }) => realRound), //strip key off of RoundUI
    }));

    console.log("!Sequence Request is: ");
    console.log(sequenceRequest);
  }, [roundList]);

  const prepareRoundsDOMElements = useMemo(() => {
    return roundList.map((r: RoundUI, i: number) => (
      <div key={r.key} className={styles["round-wrapper"]}>
        <CloseButton
          onClickHandler={() => {
            removeRound(i);
          }}
        />
        <InputHeader
          id={"round-header" + i}
          name={"round-header" + i}
          placeHolder={"Round " + (i + 1) + " name"}
          defaultValue={r.name}
          handleOnKeyUp={(e: ChangeEvent<HTMLInputElement>) =>
            handleOnKeyUp(e, i)
          }
        />
        <div className={styles["round-container"]}>
          {exerciseInstanceList
            .filter((exInst: ExerciseInstanceResponse) =>
              r.exerciseInstanceIds.some((id) => id === exInst.id)
            )
            .map((existingExInst: ExerciseInstanceResponse) => (
              <ListElementCard
                extraClasses={cardStyles.small}
                listElementData={{
                  id: existingExInst.id,
                  name: existingExInst.name,
                  creator: existingExInst.creator,
                  favorite: false,
                  imageSrc: "/exercise/exercise_instance-icon.png",
                }}
                key={"round" + i + "-exInst" + existingExInst.id}
              />
            ))}
          <ListElementCard
            listElementData={{ title: "Add exercise", imageSrc: "/add.png" }}
            extraClasses={cardStyles.small}
            onClickHandler={() => {
              setOperatingRoundIndex(i);
              setShowWindowModal(true);
            }}
          />
        </div>
      </div>
    ));
  }, [roundList, exerciseInstanceList]);
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
          idList={roundList[operatingRoundIndex]?.exerciseInstanceIds}
        />
      </Window>
      <div>
        {prepareRoundsDOMElements}
        <div className={styles["add-round-wrapper"]}>
          <ListElementCard
            listElementData={{ title: "Add round", imageSrc: "/add.png" }}
            extraClasses={cardStyles.small}
            onClickHandler={() => {
              setRoundList((prev) => [
                ...prev,
                { key: crypto.randomUUID(), exerciseInstanceIds: [], name: "" },
              ]);
            }}
          />
        </div>
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
        {sequenceRequest.rounds.length > 0 &&
          !sequenceRequest.rounds.some((r) => r.name === "") &&
          !sequenceRequest.rounds.some(
            (r) => r.exerciseInstanceIds.length === 0
          ) && <button>Submit</button>}
      </div>
    </div>
  );
}

export default RoundSetUpSlide;
