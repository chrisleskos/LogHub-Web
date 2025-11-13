import type { ExerciseInstanceResponse } from "./ExerciseInstance";

export type RoundRequest = {
  name: string;
  exerciseInstanceIds: number[];
};

export type RoundResponse = {
  id: number;
  name: string;
  exerciseInstanceResponses: ExerciseInstanceResponse[];
};
