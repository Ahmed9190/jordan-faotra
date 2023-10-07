import { CountryCode } from "../types/country-code.type";

export default interface ISupplier {
  countryCode: CountryCode;
  /** الرقم الضريبي للبائع */
  taxNumber: number;
  /** اسم البائع */
  name: string;
}
