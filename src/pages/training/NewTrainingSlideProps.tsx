import type { TrainingRequest } from "../../interface/Training";

export type NewTrainingSlideProps = {
  baseUrl?: string;
  trainingRequest: TrainingRequest;
  setTrainingRequest: React.Dispatch<React.SetStateAction<TrainingRequest>>;
  nextStep?: () => void;
  prevStep?: () => void;
};
