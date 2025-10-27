export type EquipmentRequest = {
  name: string;
  description: string;
  equipmentType: string;
};

export type EquipmentResponse = {
  id: number;
  name: string;
  description: string;
  equipmentType: string;
  creator: string;
};
