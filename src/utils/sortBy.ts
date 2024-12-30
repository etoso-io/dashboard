// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortBy(arr: any[], key: string) {
  return [...arr].sort((item1, item2) =>
    item1[key] > item2[key] ? 1 : item2[key] > item1[key] ? -1 : 0,
  );
}
