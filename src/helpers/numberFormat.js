export default function numberFormat(v) {
  return new Intl.NumberFormat().format(v);
}
