import ICustomer from "../models/i-customer";
import IInvoice from "../models/i-invoice";

export type CreateInvoiceDto = Omit<
  IInvoice,
  | "uuid"
  | "issueDate"
  | "invoiceType"
  | "currencyCode"
  | "supplier"
  | "customer"
  | "countryCode"
  | "incomeSourceSequence"
> & { customer: Omit<ICustomer, "countryCode"> };
