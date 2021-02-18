export default function enumerate(num, dec) {
  let number = num;
  if (num > 100) number %= 100;
  if (num <= 20 && num >= 10) return dec[2];
  if (num > 20) number %= 10;
  if (number === 1) return dec[0];
  return number > 1 && number < 5 ? dec[1] : dec[2];
}
