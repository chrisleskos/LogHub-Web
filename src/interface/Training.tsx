import type { SequenceRequest, SequenceResponse } from "./Sequence";

export type TrainingRequest = {
  name: string;
  description: string;
  existingSequenceIds: number[]; // already created
  sequenceRequests: SequenceRequest[]; // will be created on persistence
};

export type TrainingResponse = {
  id: number;
  name: string;
  description: string;
  sequenceResponses: SequenceResponse[];
  creator: string;
};
