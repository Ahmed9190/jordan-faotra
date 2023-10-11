import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { InvoiceXmlBuilder } from "./invoice-xml-builder";
import InvoiceType from "../enums/invoice-type.enum";
import type { CurrencyCode } from "../types/currency-code.type";
import { create } from "xmlbuilder2";
import DateUtils from "../utils/date.utils";
import { InvoiceLineBuilder } from "./lnvoice-line";
import IInvoiceLine from "../models/i-invoice-line";
import Invoice from "../models/i-invoice";
import AccountingSupplierPartyBuilder from "./accounting-supplier-party-builder";
import ISupplier from "../models/i-supplier";
import AccountingCustomerPartyBuilder from "./accounting-customer-party-builder";
import ICustomer from "../models/i-customer";
import SellerSupplierPartyBuilder from "./seller-supplier-party-builder";
import { CountryCode } from "../types/country-code.type";

export class InvoiceBuilder extends InvoiceXmlBuilder {
  constructor(
    protected readonly xmlBuilder: XMLBuilder = create({
      version: "1.0",
      encoding: "UTF-8",
    }).ele("Invoice", {
      xmlns: "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
      "xmlns:cac":
        "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
      "xmlns:cbc":
        "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
      "xmlns:ext":
        "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
    }),
    private readonly invoiceLineBuilder: InvoiceLineBuilder = new InvoiceLineBuilder(
      xmlBuilder
    ),
    private readonly accountingSupplierPartyBuilder: AccountingSupplierPartyBuilder = new AccountingSupplierPartyBuilder(
      xmlBuilder
    ),
    private readonly accountingCustomerPartyBuilder: AccountingCustomerPartyBuilder = new AccountingCustomerPartyBuilder(
      xmlBuilder
    ),
    private readonly sellerSupplierPartyBuilder: SellerSupplierPartyBuilder = new SellerSupplierPartyBuilder(
      xmlBuilder
    )
  ) {
    super();
  }

  public create({
    id,
    uuid,
    issueDate,
    invoiceType,
    note,
    currencyCode,
    invoiceLines,
    supplier,
    customer,
    invoiceNumber,
    incomeSourceSequence,
    countryCode,
    totalDiscount,
    taxAmount,
    taxExclusiveAmount,
    taxInclusiveAmount,
    allowanceTotalAmount,
    payableAmount,
  }: Invoice): this {
    this.withProfileID()
      .withID(id)
      .withUUID(uuid)
      .withIssueDate(issueDate)
      .withInvoiceTypeCode(invoiceType)
      .withNote(note)
      .withDocumentCurrencyCode(currencyCode)
      .withTaxCurrencyCode(currencyCode)
      .withAdditionalDocumentReference(invoiceNumber)
      .withAccountingSupplierParty(supplier)
      .withAccountingCustomerParty(customer)
      .withSellerSupplierPartyBuilder(incomeSourceSequence)
      .withAllowanceCharge(countryCode, totalDiscount)
      .withTaxTotal(countryCode, taxAmount)
      .withLegalMonetaryTotal({
        countryCode,

        taxExclusiveAmount,
        taxInclusiveAmount,
        allowanceTotalAmount,
        payableAmount,
      })
      .withInvoiceLines(invoiceLines);

    return this;
  }

  private withProfileID(): this {
    this.xmlBuilder.ele("cbc:ProfileID").txt("reporting:1.0").up();

    return this;
  }

  /** example: private withID("EIN00090") */
  private withID(invoiceId: string): this {
    this.xmlBuilder.ele("cbc:ID").txt(invoiceId).up();
    return this;
  }

  /** example: private withUUID("0043e15e-740b-4e1b-889d-504afdb1d1d") */
  private withUUID(uuid: string): this {
    this.xmlBuilder.ele("cbc:UUID").txt(uuid).up();
    return this;
  }

  /** example: private withIssueDate(new Date()) */
  private withIssueDate(issueDate: Date): this {
    const issueDateFormated = DateUtils.toYyyyMmDd(issueDate);
    this.xmlBuilder.ele("cbc:IssueDate").txt(issueDateFormated).up();
    return this;
  }

  /** example: private withInvoiceTypeCode(InvoiceType.createNewCashInvoice) */
  private withInvoiceTypeCode(invoiceType: InvoiceType): this {
    switch (invoiceType) {
      case InvoiceType.createNewCashInvoice:
        this.xmlBuilder
          .ele("cbc:InvoiceTypeCode", { name: "012" })
          .txt("388")
          .up();
    }

    return this;
  }

  /** example: private withNote("Note") */
  private withNote(notes: string): this {
    this.xmlBuilder.ele("cbc:Note").txt(notes).up();

    return this;
  }

  /** example: private withDocumentCurrencyCode("JOD") */
  private withDocumentCurrencyCode(documentCurrencyCode: CurrencyCode): this {
    this.xmlBuilder
      .ele("cbc:DocumentCurrencyCode")
      .txt(documentCurrencyCode)
      .up();
    return this;
  }

  /** example: private withTaxCurrencyCode("JOD") */
  private withTaxCurrencyCode(taxCurrencyCode: CurrencyCode): this {
    this.xmlBuilder.ele("cbc:TaxCurrencyCode").txt(taxCurrencyCode).up();
    return this;
  }

  /** example: private withAdditionalDocumentReference(1) */
  private withAdditionalDocumentReference(invoiceNumber: number): this {
    this.xmlBuilder
      .ele("cac:AdditionalDocumentReference")
      .ele("cbc:ID")
      .txt("ICV")
      .up()
      .ele("cbc:UUID")
      .txt(invoiceNumber.toString())
      .up()
      .up();

    return this;
  }

  private withAccountingSupplierParty(supplier: ISupplier): this {
    this.accountingSupplierPartyBuilder.create(supplier);

    return this;
  }

  private withAccountingCustomerParty(customer: ICustomer): this {
    this.accountingCustomerPartyBuilder.create(customer);

    return this;
  }

  private withSellerSupplierPartyBuilder(incomeSourceSequence: number): this {
    this.sellerSupplierPartyBuilder.create(incomeSourceSequence);
    return this;
  }

  private withAllowanceCharge(
    currencyId: CountryCode,
    totalDiscount: number
  ): this {
    this.xmlBuilder
      .ele("cac:AllowanceCharge")
      .ele("cbc:ChargeIndicator")
      .txt("false")
      .up()
      .ele("cbc:AllowanceChargeReason")
      .txt("discount")
      .up()
      .ele("cbc:Amount", { currencyID: currencyId })
      .txt(totalDiscount.toString())
      .up()
      .up();
    return this;
  }

  private withTaxTotal(countryCode: CountryCode, taxAmount: number): this {
    this.xmlBuilder
      .ele("cac:TaxTotal")
      .ele("cbc:TaxAmount", { currencyID: countryCode })
      .txt(taxAmount.toString())
      .up()
      .up();
    return this;
  }

  private withLegalMonetaryTotal({
    countryCode,
    taxExclusiveAmount,
    taxInclusiveAmount,
    allowanceTotalAmount,
    payableAmount,
  }: {
    countryCode: CountryCode;
    taxExclusiveAmount: number;
    taxInclusiveAmount: number;
    allowanceTotalAmount: number;
    payableAmount: number;
  }): this {
    this.xmlBuilder
      .ele("cac:LegalMonetaryTotal")
      .ele("cbc:TaxExclusiveAmount", { currencyID: countryCode })
      .txt(taxExclusiveAmount.toString())
      .up()
      .ele("cbc:TaxInclusiveAmount", { currencyID: countryCode })
      .txt(taxInclusiveAmount.toString())
      .up()
      .ele("cbc:AllowanceTotalAmount", { currencyID: countryCode })
      .txt(allowanceTotalAmount.toString())
      .up()
      .ele("cbc:PayableAmount", { currencyID: countryCode })
      .txt(payableAmount.toString())
      .up()
      .up();

    return this;
  }

  private withInvoiceLines(invoiceLines: IInvoiceLine[]): this {
    invoiceLines.forEach((invoiceLine) =>
      this.invoiceLineBuilder.create(invoiceLine)
    );

    return this;
  }
}
