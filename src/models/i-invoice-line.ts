import { CountryCode } from "../types/country-code.type";

export default interface IInvoiceLine {
  itemId: string;
  nameOrDescription: string;
  quantity: number;
  unitPrice: number;
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
