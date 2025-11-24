import { useEffect, useRef, useState } from "react";
import PageBase from "../../components/base/PageBase";
import CreationForm, {
  type CreationFormRef,
} from "../../components/creationForm/CreationForm";
import styles from "./new-sequence.module.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import type { SequenceRequest } from "../../interface/Sequence";
import RoundSetUpSlide from "./RoundSetUpSlide";

interface NewSequencePageProps {
  baseUrl: string;
}

function NewSequencePage({ baseUrl }: NewSequencePageProps) {
  const [cookies] = useCookies(["token"]);
  const sequenceURL = "sequence/";

  const creationFormRef = useRef<CreationFormRef>(null);

  const nextStep = (steps = 1) => creationFormRef.current?.nextStep(steps);
  const prevStep = () => creationFormRef.current?.prevStep();

  const [sequenceRequest, setSequenceRequest] = useState<SequenceRequest>({
    name: "",
    rounds: [],
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(sequenceRequest);
    nextStep();

    Axios.post(baseUrl + sequenceURL, sequenceRequest, {
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
      <PageBase header="New Sequence" />
      <CreationForm ref={creationFormRef} onSubmitHandler={handleFormSubmit}>
        <RoundSetUpSlide
          baseUrl={baseUrl}
          sequenceRequest={sequenceRequest}
          setSequenceRequest={setSequenceRequest}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </CreationForm>
    </>
  );
}

export default NewSequencePage;
