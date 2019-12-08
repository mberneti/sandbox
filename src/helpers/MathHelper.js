export const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

export const shuffle = (count, max) => {
  let array = [];
  for (let i = 0; i < count; i++) array.push(getRandomInt(max));
  return array.sort(() => Math.random() - 0.5);
};
