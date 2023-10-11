import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { InvoiceXmlBuilder } from "./invoice-xml-builder";
import { assert } from "console";
import NumberUtils from "../utils/number.utils";
import IInvoiceLine from "../models/i-invoice-line";
import { CountryCode } from "../types/country-code.type";

export class InvoiceLineBuilder extends InvoiceXmlBuilder {
  constructor(protected xmlBuilder: XMLBuilder) {
    super();
  }

  public create({
    itemId,
    nameOrDescription,
    quantity,
    unitPrice,
    discount,
    currencyId,
    countryCode,
    taxAmount,
    roundingAmount,
    generalTaxPercent,
  }: IInvoiceLine): this {
    const xmlBuilderTemp = this.xmlBuilder;
    this.xmlBuilder = this.xmlBuilder.ele("cac:InvoiceLine");

    this.withID(itemId)
      .withInvoicedQuantity(quantity)
      .withLineExtensionAmount({ currencyId, discount, quantity, unitPrice })
      .withTaxTotal({
        countryCode,
        taxAmount,
        roundingAmount,
        generalTaxPercent,
      })
      .withNameOrDescription(nameOrDescription)
      .withPrice({ currencyId, unitPrice, discount });

    this.xmlBuilder.up();
    this.xmlBuilder = xmlBuilderTemp;
    return this;
  }

  private withID(itemId: string): this {
    this.xmlBuilder.ele("cbc:ID").txt(itemId).up();
    return this;
  }
  private withInvoicedQuantity(quantity: number): this {
    this.xmlBuilder
      .ele("cbc:InvoicedQuantity", { unitCode: "PCE" })
      .txt(quantity.toString())
      .up();
    return this;
  }

  private withLineExtensionAmount({
    currencyId,
    unitPrice,
    quantity,
    discount,
  }: {
    currencyId: CountryCode;
    unitPrice: number;
    quantity: number;
    discount: number;
  }): this {
    assert(unitPrice > 0, "unitPrice must be positive");
    assert(discount >= 0, "discount must be positive or zero");
    assert(quantity > 0, "quantity must be positive");
    // assert(NumberUtils.isInt(quantity), "quantity must be integer");

    const total = unitPrice * quantity - discount;

    assert(
      total > 0,
      `Total is negative. Please note that discount must be less than ${
        unitPrice * quantity
      }`
    );

    this.xmlBuilder
      .ele("cbc:LineExtensionAmount", { currencyID: currencyId })
      .txt(total.toString())
      .up();

    return this;
  }

  private withTaxTotal({
    countryCode,
    taxAmount,
    roundingAmount,
    generalTaxPercent,
  }: {
    countryCode: CountryCode;
    taxAmount: number;
    roundingAmount: number;
    generalTaxPercent: number;
  }): this {
    this.xmlBuilder
      .ele("cac:TaxTotal")
      .ele("cbc:TaxAmount", { currencyID: countryCode })
      .txt(taxAmount.toString())
      .up()

      .ele("cbc:RoundingAmount", { currencyID: countryCode })
      .txt(roundingAmount.toString())
      .up()

      .ele("cac:TaxSubtotal")
      .ele("cbc:TaxAmount", { currencyID: countryCode })
      .txt(taxAmount.toString())
      .up()

      .ele("cac:TaxCategory")
      .ele("cbc:ID", { schemeAgencyID: "6", schemeID: "UN/ECE 5305" })
      .txt("S")
      .up()

      .ele("cbc:Percent")
      .txt(generalTaxPercent.toString())
      .up()

      .ele("cac:TaxScheme")
      .ele("cbc:ID", { schemeAgencyID: "6", schemeID: "UN/ECE 5153" })
      .txt("VAT")
      .up()
      .up()
      .up()
      .up()
      .up();
    return this;
  }

  private withNameOrDescription(nameOrDescription: string): this {
    this.xmlBuilder
      .ele("cac:Item")
      .ele("cbc:Name")
      .txt(nameOrDescription)
      .up()
      .up();
    return this;
  }

  private withPrice({
    currencyId,
    unitPrice,
    discount,
  }: {
    currencyId: CountryCode;
    unitPrice: number;
    discount: number;
  }): this {
    assert(unitPrice > 0, "unitPrice must be positive");
    assert(discount >= 0, "discount must be positive or zero");

    this.xmlBuilder
      .ele("cac:Price")
      .ele("cbc:PriceAmount", { currencyID: currencyId })
      .txt(unitPrice.toString())
      .up()
      .ele("cac:AllowanceCharge")
      .ele("cbc:ChargeIndicator")
      .txt("false")
      .up()
      .ele("cbc:AllowanceChargeReason")
      .txt("DISCOUNT")
      .up()
      .ele("cbc:Amount", { currencyID: currencyId })
      .txt(discount.toString())
      .up()
      .up()
      .up();
    return this;
  }
}
