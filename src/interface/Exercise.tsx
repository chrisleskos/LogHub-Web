import type { EquipmentResponse } from "./Equipment";

export type ExerciseRequest = {
  name: string;
  description: string;
  mainMuscleTarget: string[];
  secondaryMuscleTarget: string[];
  possibleFocus: string[];
  possibleEquipment: number[];
  possibleGoalUnits: string[];
};

export type ExerciseResponse = {
  id: number;
  name: string;
  description: string;
  mainMuscleTarget: string[];
  secondaryMuscleTarget: string[];
  possibleFocus: string[];
  possibleEquipment: EquipmentResponse[];
  possibleGoalUnits: string[];
  creator: string;
};
