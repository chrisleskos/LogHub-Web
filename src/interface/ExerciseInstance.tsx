import type { ExerciseResponse } from "./Exercise";
import type { GoalRequest, GoalResponse } from "./Goal";

export type ExerciseInstanceRequest = {
  exerciseId: number;
  comment: string;
  focus: string[];
  rangeOfMotion: string;
  goals: GoalRequest[];
  equipmentInstanceList: [];
};

export type ExerciseInstanceResponse = {
  id: number;
  exercise: ExerciseResponse;
  comment: string;
  focus: string[];
  rangeOfMotion: string;
  goals: GoalResponse[];
  creator: string;
  equipmentInstanceList: [];
};
