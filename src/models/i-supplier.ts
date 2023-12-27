import { CountryCode } from "../types/country-code.type";

export default interface ISupplier {
  countryCode: CountryCode;
  /** الرقم الضريبي للبائع */
  taxNumber: string;
  /** اسم البائع */
  name: string;
}
