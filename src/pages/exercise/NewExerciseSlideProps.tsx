import type { ExerciseRequest } from "../../interface/Exercise";

export type NewExerciseSlideProps = {
  baseUrl: string;
  exerciseRequest: ExerciseRequest;
  setExerciseRequest: React.Dispatch<React.SetStateAction<ExerciseRequest>>;
  nextStep?: () => void;
  prevStep?: () => void;
};
