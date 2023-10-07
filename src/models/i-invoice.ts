import InvoiceType from "../enums/invoice-type.enum";
import { CountryCode } from "../types/country-code.type";
import { CurrencyCode } from "../types/currency-code.type";
import ICustomer from "./i-customer";
import IInvoiceLine from "./i-invoice-line";
import ISupplier from "./i-supplier";

export default interface IInvoice {
  /** رقم الفاتورة */
  id: string;
  /**
   * رقم مميز
   * UUID Universal Identifier Unique
   * يتم انشاؤه من قبل نظام المكلف بحيث يشكل ID و UUID معا مفتاحا رئيسياً Primary Key لعدم تكرار الفاتورة المرسلة على النظام
   */
  uuid: string;
  /** عداد الفاتورة */
  invoiceNumber: number;
  /** تاريخ الفاتورة */
  issueDate: Date;
  /** نوع الفاتورة */
  invoiceType: InvoiceType;
  /** ملاحظة أو وصف الفاتورة */
  note: string;
  currencyCode: CurrencyCode;
  countryCode: CountryCode;
  /**البائع */
  supplier: ISupplier;
  /**المشتري */
  customer: ICustomer;
  /** تسلسل مصدر الدخل */
  incomeSourceSequence: number;
  /** سلع الفاتورة */
  invoiceLines: IInvoiceLine[];
  /** قيمة الخصم */
  totalDiscount: number;
  /** قيمة الضريبة العامة للخدمة أو السلعة */
  taxAmount: number;
  /** إجمالي الفاتورة قبل الخصم */
  taxExclusiveAmount: number;
  /** إجمالي الفاتورة */
  taxInclusiveAmount: number;
  /** مجموع قيمة الخصم */
  allowanceTotalAmount: number;
  /** إجمالي الفاتورة */
  payableAmount: number;
}
