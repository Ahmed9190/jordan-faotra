import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { InvoiceXmlBuilder } from "./invoice-xml-builder";
import ISupplier from "../models/i-supplier";
import { CountryCode } from "../types/country-code.type";

export default class AccountingSupplierPartyBuilder extends InvoiceXmlBuilder {
  constructor(protected xmlBuilder: XMLBuilder) {
    super();
  }

  public create({ countryCode, name: sellerName, taxNumber }: ISupplier): this {
    const xmlBuilderTemp = this.xmlBuilder;
    this.xmlBuilder = this.xmlBuilder
      .ele("cac:AccountingSupplierParty")
      .ele("cac:Party");

    this.withPostalAddress(countryCode)
      .withPartyTaxScheme(taxNumber)
      .withPartyLegalEntity(sellerName);

    this.xmlBuilder.up();
    this.xmlBuilder.up();
    this.xmlBuilder = xmlBuilderTemp;
    return this;
  }

  private withPostalAddress(countryCode: CountryCode): this {
    this.xmlBuilder
      .ele("cac:PostalAddress")
      .ele("cac:Country")
      .ele("cbc:IdentificationCode")
      .txt(countryCode)
      .up()
      .up()
      .up();

    return this;
  }

  private withPartyTaxScheme(taxNumber: number): this {
    this.xmlBuilder
      .ele("cac:PartyTaxScheme")
      .ele("cbc:CompanyID")
      .txt(taxNumber.toString())
      .up()
      .ele("cac:TaxScheme")
      .ele("cbc:ID")
      .txt("VAT")
      .up()
      .up()
      .up();

    return this;
  }

  private withPartyLegalEntity(sellerName: string): this {
    this.xmlBuilder
      .ele("cac:PartyLegalEntity")
      .ele("cbc:RegistrationName")
      .txt(sellerName)
      .up()
      .up();

    return this;
  }
}
