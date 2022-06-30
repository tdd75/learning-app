export const ratioToPercentage = (ratio: string): number => {
  const [num, den] = ratio.split('/');
  return (parseInt(num) * 100) / parseInt(den);
};
