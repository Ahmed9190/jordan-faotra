import InvoiceType from "../enums/invoice-type.enum";
import { CountryCode } from "../types/country-code.type";
import { CurrencyCode } from "../types/currency-code.type";
import ICustomer from "./i-customer";
import IInvoiceLine from "./i-invoice-line";
import ISupplier from "./i-supplier";

export default interface IInvoice {
  id: string;
  uuid: string;
  invoiceNumber: number;
  issueDate: Date;
  invoiceType: InvoiceType;
  note: string;
  currencyCode: CurrencyCode;
  countryCode: CountryCode;
  supplier: ISupplier;
  customer: ICustomer;
  /** تسلسل مصدر الدخل */
  incomeSourceSequence: number;
  invoiceLines: IInvoiceLine[];
  totalDiscount: number;
  taxAmount: number;
  taxExclusiveAmount: number;
  taxInclusiveAmount: number;
  allowanceTotalAmount: number;
  payableAmount: number;
}
