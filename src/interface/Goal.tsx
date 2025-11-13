export type GoalRequest = {
  goalUnit: string;
  value: number;
  reserve: number;
  measurmentUnits: string;
};

export type GoalResponse = {
  id: number;
  goalUnit: string;
  value: number;
  reserve: number;
  measurmentUnits: string;
};
