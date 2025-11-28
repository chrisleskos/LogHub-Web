import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import type { CreationFormRef } from "../../components/creationForm/CreationForm";
import type { TrainingRequest } from "../../interface/Training";
import Axios from "axios";
import CreationForm from "../../components/creationForm/CreationForm";
import PageBase from "../../components/base/PageBase";
import NameDescriptionSlide from "./NameDescriptionSlide";

interface NewTrainingPageProps {
  baseUrl: string;
}

function NewTrainingPage({ baseUrl }: NewTrainingPageProps) {
  const [cookies] = useCookies(["token"]);
  const trainingURL = "training/";

  const creationFormRef = useRef<CreationFormRef>(null);

  const nextStep = (steps = 1) => creationFormRef.current?.nextStep(steps);
  const prevStep = () => creationFormRef.current?.prevStep();

  const [trainingRequest, setTrainingRequest] = useState<TrainingRequest>({
    name: "",
    description: "",
    existingSequenceIds: [],
    sequenceRequests: [],
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(trainingRequest);
    nextStep();

    Axios.post(baseUrl + trainingURL, trainingRequest, {
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
      <PageBase header="New Training" />
      <CreationForm ref={creationFormRef} onSubmitHandler={handleFormSubmit}>
        <NameDescriptionSlide
          baseUrl={baseUrl}
          trainingRequest={trainingRequest}
          setTrainingRequest={setTrainingRequest}
          nextStep={nextStep}
        />
      </CreationForm>
    </>
  );
}

export default NewTrainingPage;
