export type StandardData = {
  standardName: string;
  standardId: number;
  count: number;
  standardFullName: string;
};

export type StandardWithYear = {
  year: number;
  values: StandardData[];
};
