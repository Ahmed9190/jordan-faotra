import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { InvoiceXmlBuilder } from "./invoice-xml-builder";

export default class SellerSupplierPartyBuilder extends InvoiceXmlBuilder {
  constructor(protected xmlBuilder: XMLBuilder) {
    super();
  }

  public create(incomeSourceSequence: number): this {
    const xmlBuilderTemp = this.xmlBuilder;
    this.xmlBuilder = this.xmlBuilder
      .ele("cac:SellerSupplierParty")
      .ele("cac:Party");

    this.withPartyIdentification(incomeSourceSequence);

    this.xmlBuilder.up();
    this.xmlBuilder = xmlBuilderTemp;
    return this;
  }

  private withPartyIdentification(incomeSourceSequence: number): this {
    this.xmlBuilder
      .ele("cac:PartyIdentification")
      .ele("cbc:ID")
      .txt(incomeSourceSequence.toString())
      .up()
      .up();

    return this;
  }
}
