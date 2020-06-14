
const formatNumToSeconds = (number: number):string => {
  if (!+number) return '0:00';
  const minutes = Math.floor(+number / 60);
  const seconds = +number % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default formatNumToSeconds;
