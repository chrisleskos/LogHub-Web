import type { TrainingRequest, TrainingResponse } from "./Training";

export type ProgramRequest = {
  name: string;
  trainingList: TrainingRequest[];
};

export type ProgramResponse = {
  id: number;
  name: string;
  trainingList: TrainingResponse[];
  creator: string;
};
