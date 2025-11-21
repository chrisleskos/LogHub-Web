import { useEffect, useRef, useState } from "react";
import PageBase from "../../components/base/PageBase";
import CreationForm, {
  type CreationFormRef,
} from "../../components/creationForm/CreationForm";
import styles from "./new-exercise-instance.module.css";
import Axios from "axios";
import type { ExerciseInstanceRequest } from "../../interface/ExerciseInstance";
import { useCookies } from "react-cookie";
import ExerciseSelectSlide from "./ExerciseSelectSlide";
import NameCommentSlide from "./NameCommentSlide";
import type { ExerciseResponse } from "../../interface/Exercise";

interface NewExerciseInstanceProps {
  baseUrl: string;
}

function NewExerciseInstancePage({ baseUrl }: NewExerciseInstanceProps) {
  const [cookies] = useCookies(["token"]);
  const exerciseInstanceURL = "exercise-instance/";

  const creationFormRef = useRef<CreationFormRef>(null);

  const nextStep = (steps = 1) => creationFormRef.current?.nextStep(steps);
  const prevStep = () => creationFormRef.current?.prevStep();

  const [selectedExercise, setSelectedExercise] = useState<ExerciseResponse>();
  const [exerciseInstanceRequest, setExerciseInstanceRequest] =
    useState<ExerciseInstanceRequest>({
      exerciseId: -1,
      name: "",
      comment: "",
      equipmentInstanceList: [],
      focus: [],
      goals: [],
      rangeOfMotion: "",
    });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(exerciseInstanceRequest);
    nextStep();

    Axios.post(baseUrl + exerciseInstanceURL, exerciseInstanceRequest, {
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

  useEffect(() => {
    if (exerciseInstanceRequest.exerciseId === -1) return;
    Axios.get(baseUrl + "exercise/" + exerciseInstanceRequest.exerciseId, {
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    }).then((response) => {
      setSelectedExercise(response.data);
    });
  }, [exerciseInstanceRequest]);
  return (
    <>
      <PageBase header="New Exercise Instance" />
      <div className={styles["selected-type"]}>
        {selectedExercise?.name && (
          <span key={"selected-focus-" + focus}>
            {" "}
            #{selectedExercise.name.toLowerCase().replace(/\s+/g, "_")}{" "}
          </span>
        )}
      </div>
      <CreationForm ref={creationFormRef} onSubmitHandler={handleFormSubmit}>
        <ExerciseSelectSlide
          baseUrl={baseUrl}
          exerciseInstanceRequest={exerciseInstanceRequest}
          setExerciseInstanceRequest={setExerciseInstanceRequest}
          nextStep={nextStep}
          prevStep={prevStep}
        />
        <NameCommentSlide
          baseUrl={baseUrl}
          exerciseInstanceRequest={exerciseInstanceRequest}
          setExerciseInstanceRequest={setExerciseInstanceRequest}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </CreationForm>
    </>
  );
}

export default NewExerciseInstancePage;
