export type StandardData = { standardName: string; standardId: number; count: number };

export type StandardWithYear = {
  year: number;
  values: StandardData[];
};
