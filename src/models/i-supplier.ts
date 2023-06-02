import { CountryCode } from "../types/country-code.type";

export default interface ISupplier {
  countryCode: CountryCode;
  taxNumber: number;
  name: string;
}
