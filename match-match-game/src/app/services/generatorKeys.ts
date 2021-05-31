export const uuid = () => {
  const randy = Math.round(Math.random() * 100) + 50 - 2;
  return randy;
};
