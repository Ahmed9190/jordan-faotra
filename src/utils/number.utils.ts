export default class NumberUtils {
  static isInt(num: string): boolean {
    const numberString = num;
    return (
      !isNaN(+num) &&
      (function (x) {
        return (x | 0) === x;
      })(parseFloat(numberString))
    );
  }
}
