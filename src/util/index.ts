export const now = () => new Date();

export const nowExcludeTime = () => new Date(now().setHours(0, 0, 0, 0));

export const getGridCols = (width: number) => {
  if (width < 420) return 1;
  if (width < 570) return 2;
  if (width < 768) return 3;
  if (width < 918) return 2;
  if (width < 1068) return 3;
  if (width < 1218) return 4;
  return 4;
};
