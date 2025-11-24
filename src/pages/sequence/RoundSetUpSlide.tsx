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
import InputHeader from "../../components/input/InputHeader";
import CloseButton from "../../components/closeBtn/CloseButton";

function RoundSetUpSlide({
  baseUrl = "",
  sequenceRequest,
  setSequenceRequest,
  nextStep = () => {},
  prevStep = () => {},
}: NewSequenceSlideProps) {
  const exerciseInstanceURL = "exercise-instance/";

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

  const handleOnKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    setRoundList((prev) => {
      prev[index] = { ...prev[index], name: e.currentTarget?.value };
      return prev;
    });
  };

  const removeRound = (round: RoundRequest) => {
    setRoundList((prev) => prev.filter((r) => r.name !== round.name));
  };

  const setRoundExercise = (id: number) => {
    operatingRound.exerciseInstanceIds =
      operatingRound.exerciseInstanceIds.includes(id)
        ? operatingRound.exerciseInstanceIds.filter((exid) => exid !== id)
        : [...operatingRound.exerciseInstanceIds, id];
    setRoundList((prev) => [
      ...prev.map((round) =>
        round.name === operatingRound.name
          ? {
              exerciseInstanceIds: operatingRound.exerciseInstanceIds,
              name: operatingRound.name,
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
    setSequenceRequest((prev) => ({
      ...prev,
      rounds: roundList,
    }));
  }, [roundList]);

  const prepareRoundsDOMElements = useMemo(() => {
    console.log(sequenceRequest);
    return roundList.map((r: RoundRequest, i: number) => (
      <div key={r.name + i} className={styles["round-wrapper"]}>
        <CloseButton
          onClickHandler={() => {
            removeRound(r);
          }}
        />
        <InputHeader
          id={"round-header" + i}
          name={"round-header" + i}
          placeHolder={"Round " + (i + 1) + " name"}
          defaultValue={r.name.trim() !== "" ? r.name : "Round " + (i + 1)}
          handleOnKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
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
                  name: existingExInst.exercise.name + " Instance",
                  creator: existingExInst.creator,
                  favorite: false,
                  imageSrc: "/exercise/exercise_instance-icon.png",
                }}
                key={existingExInst.id}
              />
            ))}
          <ListElementCard
            listElementData={{ title: "Add exercise", imageSrc: "/add.png" }}
            extraClasses={cardStyles.small}
            onClickHandler={() => {
              setOperatingRound(r);
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
          idList={operatingRound.exerciseInstanceIds}
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
                { exerciseInstanceIds: [], name: "Round " + (prev.length + 1) },
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
