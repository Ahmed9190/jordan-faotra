export default class NumberUtils {
  static isInt(num: number): boolean {
    const numberString = num.toString();
    return (
      !isNaN(num) &&
      (function (x) {
        return (x | 0) === x;
      })(parseFloat(numberString))
    );
  }
}
