export type GoalRequest = {
  goalUnit: string;
  min: number;
  max: number;
  value?: number;
  reserve: number;
  measurmentUnits: string;
};

export type GoalResponse = {
  id: number;
  goalUnit: string;
  min: number;
  max: number;
  value: number;
  reserve: number;
  measurmentUnits: string;
};
