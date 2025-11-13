import type { RoundRequest, RoundResponse } from "./Round";

export type SequenceRequest = {
  name: string;
  rounds: RoundRequest[];
};

export type SequenceResponse = {
  id: number;
  name: string;
  rounds: RoundResponse[];
  creator: string;
};
