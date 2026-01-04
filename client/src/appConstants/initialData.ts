export const getInitialDataObjByMonth = <T>(initialData: T) => {
  return Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => [`${i + 1}월`, initialData]),
  );
};
