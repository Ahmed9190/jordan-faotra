import { CustomerPartyIdType } from "../enums/customer-party-id.enum";
import { CountryCode } from "../types/country-code.type";
import { CountrySubEntityCode } from "../types/country-sub-entity-code.type";

export default interface ICustomer {
  customerPartyNumberType: CustomerPartyIdType;

  /** الرقم الضريبي للمشتري */
  customerPartyNumber: string;
  /** الرمز البريدي */
  postalCode: number;
  countryCode: CountryCode;

  /** المدينة */
  countrySubentityCode: CountrySubEntityCode;
  /**
   * اسم المشتري
   * ملاحظة: اسم المشتري اجباري في حال كانت الفاتورة (ذمم) أو كانت قيمة الفاتورة (النقدية) أكثر من عشرة الاف دينار
   */
  name: string;
  /** رقم الهاتف */
  telephone: string;
}
