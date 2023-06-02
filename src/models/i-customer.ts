import { CustomerPartyIdType } from "../enums/customer-party-id.enum";
import { CountryCode } from "../types/country-code.type";
import { CountrySubEntityCode } from "../types/country-sub-entity-code.type";

export default interface ICustomer {
  customerPartyNumberType: CustomerPartyIdType;
  /**
   * الرقم                                     |                       النوع
   * --------------------------|-----------------------------------------
   * nationalNumber            |                       الرقم الوطني للمشتري
   * passportOrResidencyNumber |  رقم الوثيقة(رقم جواز السفر، رقم الإقامة، إلخ...)
   * taxNumber                 |                       الرقم الضريبي للمشتري
   */
  customerPartyNumber: number;
  postalCode: number;
  countryCode: CountryCode;
  countrySubentityCode: CountrySubEntityCode;
  name: string;
  telephone: string;
}
