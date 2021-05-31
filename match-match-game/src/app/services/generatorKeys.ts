export const uuid = () => {
  // let timmy = Date.now().toString(36).toLocaleUpperCase();
  const randy = Math.round(Math.random() * 100) + 50 - 2;
  // randy = randy.toString(36).slice(0, 12).padStart(12, '0').toLocaleUpperCase();
  return randy;
};
