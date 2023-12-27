import { CountryCode } from "../types/country-code.type";

export default interface IInvoiceLine {
  /**رقم تسلسلي */
  itemId: string;
  /**اسم السلعة أو الخدمة */
  nameOrDescription: string;
  quantity: string;
  /**سعر الوحدة قبل الضريبة */
  unitPrice: string;
  /**قيمة الخصم */
  discount: string;
  currencyId: CountryCode;
  /** (سعر الوحدة * الكمية) - خصم السلعة أو الخدمة  */
  totalAfterDiscount: string;

  countryCode: CountryCode;
  /** مجموع قيمة الضريبة العامة */
  taxAmount: string;
  /** المبلغ الإجمالي للسلعة أو الخدمة شامل الضريبة */
  roundingAmount: string;
  /** النسبة المئوية الضريبة العامة على السلعة أو الخدمة 0-100*/
  generalTaxPercent: string;
}
