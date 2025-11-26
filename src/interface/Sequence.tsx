import type { RoundRequest, RoundResponse } from "./Round";

export type SequenceRequest = {
  name: string;
  description: string;
  rounds: RoundRequest[];
};

export type SequenceResponse = {
  id: number;
  name: string;
  description: string;
  rounds: RoundResponse[];
  creator: string;
};
