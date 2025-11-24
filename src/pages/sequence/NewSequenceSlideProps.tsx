import type { SequenceRequest } from "../../interface/Sequence";

export type NewSequenceSlideProps = {
  baseUrl?: string;
  sequenceRequest: SequenceRequest;
  setSequenceRequest: React.Dispatch<React.SetStateAction<SequenceRequest>>;
  nextStep?: () => void;
  prevStep?: () => void;
};
