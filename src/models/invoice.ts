import { InvoiceBuilder } from "../builders/invoice-builder";
import IFaotraRequestHeaders from "./i-faotra-request-headers";
import IInvoice from "./i-invoice";

export default class Invoice {
  private xmlString: string | undefined;

  constructor(
    private readonly invoiceData: IInvoice,
    private readonly faotraRequestHeaders: Omit<
      IFaotraRequestHeaders,
      "Content-Type"
    >,
    private readonly invoiceBuilder: InvoiceBuilder = new InvoiceBuilder()
  ) {}

  toJson(): { invoice: string } {
    if (!this.xmlString) this.xmlString = this.toXmlString();

    const invoiceBase64 = Buffer.from(this.xmlString).toString("base64");

    return { invoice: invoiceBase64 };
  }

  toXmlString(): string {
    this.xmlString = this.invoiceBuilder
      .create({
        id: this.invoiceData.id,
        uuid: this.invoiceData.uuid,
        invoiceNumber: this.invoiceData.invoiceNumber,
        issueDate: this.invoiceData.issueDate,
        invoiceType: this.invoiceData.invoiceType,
        note: this.invoiceData.note,
        currencyCode: this.invoiceData.currencyCode,
        supplier: this.invoiceData.supplier,
        customer: this.invoiceData.customer,
        invoiceLines: this.invoiceData.invoiceLines,
        incomeSourceSequence: this.invoiceData.incomeSourceSequence,
        countryCode: this.invoiceData.countryCode,
        totalDiscount: this.invoiceData.totalDiscount,
        taxAmount: this.invoiceData.taxAmount,
        taxExclusiveAmount: this.invoiceData.taxExclusiveAmount,
        taxInclusiveAmount: this.invoiceData.taxInclusiveAmount,
        allowanceTotalAmount: this.invoiceData.allowanceTotalAmount,
        payableAmount: this.invoiceData.payableAmount,
      })
      .build();

    return this.xmlString!;
  }

  getFaotraRequestHeaders(): IFaotraRequestHeaders {
    return { ...this.faotraRequestHeaders, "Content-Type": "application/json" };
  }
}
