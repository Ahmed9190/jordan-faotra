export default class DateUtils {
  static toYyyyMmDd(date: Date): string {
    return DateUtils.withOffset(date).toISOString().slice(0, 10);
  }
  static withOffset(
    date: Date,
    offsetMinutes: number = new Date().getTimezoneOffset() * -1
  ): Date {
    return new Date(date.getTime() + offsetMinutes * 60 * 1000);
  }
}
