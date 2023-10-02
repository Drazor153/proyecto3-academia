export const countDecimals = function (value: number) {
  return value % 1 ? value.toString().split('.')[1].length : 0
}
