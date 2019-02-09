const starsRound = (stars: number)  => {
  if (stars < 1000) {return `${stars}`}
  const rounded = parseFloat((stars / 1000).toFixed(1));
  return (rounded * 10 % 10 === 0) ? rounded.toFixed(0)+'K' : `${rounded}K`
}
export default starsRound;