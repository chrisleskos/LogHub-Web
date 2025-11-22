import type { ExerciseInstanceRequest } from "../../interface/ExerciseInstance";

export type NewExerciseInstanceSlideProps = {
  baseUrl?: string;
  exerciseInstanceRequest: ExerciseInstanceRequest;
  setExerciseInstanceRequest: React.Dispatch<
    React.SetStateAction<ExerciseInstanceRequest>
  >;
  nextStep?: () => void;
  prevStep?: () => void;
};
