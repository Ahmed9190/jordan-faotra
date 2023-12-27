import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { InvoiceXmlBuilder } from "./invoice-xml-builder";
import ICustomer from "../models/i-customer";
import { CustomerPartyIdType } from "../enums/customer-party-id.enum";
import { CountrySubEntityCode } from "../types/country-sub-entity-code.type";
import { CountryCode } from "../types/country-code.type";

export default class AccountingCustomerPartyBuilder extends InvoiceXmlBuilder {
  constructor(protected xmlBuilder: XMLBuilder) {
    super();
  }

  public create({
    countryCode,
    countrySubentityCode,
    customerPartyNumber,
    customerPartyNumberType,
    name,
    postalCode,
    telephone,
  }: ICustomer): this {
    const xmlBuilderTemp = this.xmlBuilder;
    this.xmlBuilder = this.xmlBuilder
      .ele("cac:AccountingCustomerParty")
      .ele("cac:Party");

    this.withPartyIdentification(customerPartyNumberType, customerPartyNumber)
      .withPostalAddress({
        postalCode,
        countryCode,
        countrySubentityCode,
      })
      .withPartyTaxScheme(customerPartyNumber)
      .withPartyLegalEntity(name);

    this.xmlBuilder = this.xmlBuilder.up(); //close cac:Party tag

    this.withAccountingContact(telephone);

    this.xmlBuilder.up();
    this.xmlBuilder = xmlBuilderTemp;
    return this;
  }

  private withPartyIdentification(
    customerPartyNumberType: CustomerPartyIdType,
    customerPartyNumber: string
  ): this {
    this.xmlBuilder
      .ele("cac:PartyIdentification")
      .ele("cbc:ID", { schemeID: customerPartyNumberType })
      .txt(customerPartyNumber)
      .up()
      .up();

    return this;
  }

  private withPostalAddress({
    countryCode,
    countrySubentityCode,
    postalCode,
  }: {
    postalCode: string;
    countryCode: CountryCode;
    countrySubentityCode: CountrySubEntityCode;
  }): this {
    this.xmlBuilder
      .ele("cac:PostalAddress")
      .ele("cbc:PostalZone")
      .txt(postalCode)
      .up()
      .ele("cbc:CountrySubentityCode")
      .txt(`${countryCode}-${countrySubentityCode}`)
      .up()
      .ele("cac:Country")
      .ele("cbc:IdentificationCode")
      .txt(countryCode)
      .up()
      .up()
      .up();

    return this;
  }

  private withPartyTaxScheme(customerPartyNumber: string): this {
    this.xmlBuilder
      .ele("cac:PartyTaxScheme")
      .ele("cbc:CompanyID")
      .txt(customerPartyNumber)
      .up()
      .ele("cac:TaxScheme")
      .ele("cbc:ID")
      .txt("VAT")
      .up()
      .up()
      .up();

    return this;
  }

  private withPartyLegalEntity(customerName: string): this {
    this.xmlBuilder
      .ele("cac:PartyLegalEntity")
      .ele("cbc:RegistrationName")
      .txt(customerName)
      .up()
      .up();

    return this;
  }

  private withAccountingContact(telephone: string): this {
    this.xmlBuilder
      .ele("cac:AccountingContact")
      .ele("cbc:Telephone")
      .txt(telephone)
      .up()
      .up();

    return this;
  }
}
