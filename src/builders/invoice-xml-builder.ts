import { XMLBuilder } from "xmlbuilder2/lib/interfaces";

export abstract class InvoiceXmlBuilder {
  protected readonly xmlBuilder!: XMLBuilder;

  build(): string {
    return this.xmlBuilder.end({ prettyPrint: true });
  }
}
