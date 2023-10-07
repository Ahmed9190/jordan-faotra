import { CountryCode } from "../types/country-code.type";

export default interface IInvoiceLine {
  /**رقم تسلسلي */
  itemId: string;
  /**اسم السلعة أو الخدمة */
  nameOrDescription: string;
  quantity: number;
  /**سعر الوحدة قبل الضريبة */
  unitPrice: number;
  /**قيمة الخصم */
  discount: number;
  currencyId: CountryCode;

  countryCode: CountryCode;
  /** مجموع قيمة الضريبة العامة */
  taxAmount: number;
  /** المبلغ الإجمالي للسلعة أو الخدمة شامل الضريبة */
  roundingAmount: number;
  /** النسبة المئوية الضريبة العامة على السلعة أو الخدمة 0-100*/
  generalTaxPercent: number;
}
