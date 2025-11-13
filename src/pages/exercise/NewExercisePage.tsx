import { useCookies } from "react-cookie";
import PageBase from "../../components/base/PageBase";
import styles from "./new-exercise.module.css";
import type { CreationFormRef } from "../../components/creationForm/CreationForm";
import type { ExerciseRequest } from "../../interface/Exercise";
import Axios from "axios";
import CreationForm from "../../components/creationForm/CreationForm";
import FocusTypeSlide from "./FocusTypeSlide";
import NameDescriptionSlide from "./NameDescriptionSlide";
import GoalUnitsSlide from "./GoalUnitsSlide";
import MuscleTargetSelectionSlide from "./MuscleTargetSelectionSlide";
import { useRef, useState } from "react";
import EquipmentSlide from "./EquipmentSlide";

interface NewExerciseInstancePage {
  baseUrl: string;
}

function NewExercisePage({ baseUrl }: NewExerciseInstancePage) {
  const [cookies] = useCookies(["token"]);
  const exerciseURL = "exercise/";

  const [showAddition, setShowAddition] = useState<boolean>(false); // TODO: use to show the new exercise

  const creationFormRef = useRef<CreationFormRef>(null);

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
        <FocusTypeSlide
          baseUrl={baseUrl}
          exerciseRequest={exerciseRequest}
          setExerciseRequest={setExerciseRequest}
          nextStep={nextStep}
        />
        <NameDescriptionSlide
          baseUrl={baseUrl}
          exerciseRequest={exerciseRequest}
          setExerciseRequest={setExerciseRequest}
          nextStep={nextStep}
          prevStep={prevStep}
        />
        <GoalUnitsSlide
          baseUrl={baseUrl}
          exerciseRequest={exerciseRequest}
          setExerciseRequest={setExerciseRequest}
          nextStep={nextStep}
          prevStep={prevStep}
        />
        <MuscleTargetSelectionSlide
          baseUrl={baseUrl}
          exerciseRequest={exerciseRequest}
          setExerciseRequest={setExerciseRequest}
          nextStep={nextStep}
          prevStep={prevStep}
        />
        <EquipmentSlide
          baseUrl={baseUrl}
          exerciseRequest={exerciseRequest}
          setExerciseRequest={setExerciseRequest}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </CreationForm>
    </>
  );
}

export default NewExercisePage;
