export function randomID(size: number) {
  const arr = Array<string>(size);
  for (let i = 0; i < size; i++) {
    const canBeNumber = Math.random() > .8;
    if (canBeNumber) {
      const num = parseInt(Math.floor(Math.random() * 10).toString());
      arr[i] = num.toString();
    } else {
      const char = randomIntFromInterval(97, 123);
      arr[i] = String.fromCharCode(char);
    }
  }

  return arr.join('');
}

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
