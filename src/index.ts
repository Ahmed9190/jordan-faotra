import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { create } from "xmlbuilder2";
import fs from "fs";
import InvoiceType from "./enums/invoice-type.enum";
import { CustomerPartyIdType } from "./enums/customer-party-id.enum";
import Invoice from "./models/invoice";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const invoice: Invoice = new Invoice(
  {
    id: "EIN00090",
    uuid: "0043e15e-740b-4e1b-889d-8504afdb1d1d",
    invoiceNumber: 1,
    issueDate: new Date(Date.parse("2022-09-27")),
    invoiceType: InvoiceType.createNewCashInvoice,
    note: "ملاحظات 22",
    currencyCode: "JOD",
    supplier: { countryCode: "JO", taxNumber: 8004854, name: "BBBBBB" },
    customer: {
      customerPartyNumberType: CustomerPartyIdType.taxNumber,
      name: "امجد سليمان",
      customerPartyNumber: 33445544,
      postalCode: 33554,
      countryCode: "JO",
      countrySubentityCode: "AZ",
      telephone: "324323434",
    },
    invoiceLines: [
      {
        itemId: String(1),
        currencyId: "JO",
        quantity: 33.0,
        unitPrice: 2.0,
        nameOrDescription: "زهره",
        discount: 2,
        countryCode: "JO",
        taxAmount: 4.48,
        roundingAmount: 68.48,
        generalTaxPercent: 7,
      },
    ],
    incomeSourceSequence: 9932895,
    countryCode: "JO",
    totalDiscount: 2,
    taxAmount: 4.48,
    taxExclusiveAmount: 66,
    taxInclusiveAmount: 68.48,
    allowanceTotalAmount: 2,
    payableAmount: 68.48,
  },
  {
    "Client-Id": "12",
    "Secret-Key": "!Q@F!F!Q#@G#@G",
    Cookie:
      "stickounet=4fdb7136e666916d0e373058e9e5c44e|7480c8b0e4ce7933ee164081a50488f1",
  }
);

console.log(invoice.getFaotraRequestHeaders());

// fs.writeFileSync("x.asocsa", JSON.stringify(invoice.toJson()));
const xmlString = invoice.toXmlString();
const headersString = invoice.getFaotraRequestHeaders();
const jsonString = invoice.toJson();

// fs.writeFileSync("result.xml", xmlString);

// app.get("/generate", (req: Request, res: Response) => {
//   const invoice = create({ version: "1.0", encoding: "UTF-8" })
//     .ele("Invoice", {
//       xmlns: "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
//       "xmlns:cac":
//         "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
//       "xmlns:cbc":
//         "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
//       "xmlns:ext":
//         "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
//     })
//     .ele("cbc:ProfileID")
//     .txt("reporting:1.0")
//     .up()
//     .ele("cbc:ID")
//     .txt("EIN00090")
//     .up()
//     .ele("cbc:UUID")
//     .txt("0043e15e-740b-4e1b-889d-8504afdb1d1d")
//     .up()
//     .ele("cbc:IssueDate")
//     .txt("2022-09-27")
//     .up()
//     .ele("cbc:InvoiceTypeCode", { name: "012" })
//     .txt("388")
//     .up()
//     .ele("cbc:Note")
//     .txt("ملاحظات 22")
//     .up()
//     .ele("cbc:DocumentCurrencyCode")
//     .txt("JOD")
//     .up()
//     .ele("cbc:TaxCurrencyCode")
//     .txt("JOD")
//     .up()
//     .ele("cac:AdditionalDocumentReference")
//     .ele("cbc:ID")
//     .txt("ICV")
//     .up()
//     .ele("cbc:UUID")
//     .txt("1")
//     .up()
//     .up()
//     .ele("cac:AccountingSupplierParty")
//     .ele("cac:Party")
//     .ele("cac:PostalAddress")
//     .ele("cac:Country")
//     .ele("cbc:IdentificationCode")
//     .txt("JO")
//     .up()
//     .up()
//     .up()
//     .ele("cac:PartyTaxScheme")
//     .ele("cbc:CompanyID")
//     .txt("8004854")
//     .up()
//     .ele("cac:TaxScheme")
//     .ele("cbc:ID")
//     .txt("VAT")
//     .up()
//     .up()
//     .up()
//     .ele("cac:PartyLegalEntity")
//     .ele("cbc:RegistrationName")
//     .txt("BBBBBB")
//     .up()
//     .up()
//     .up()
//     .up()
//     .ele("cac:AccountingCustomerParty")
//     .ele("cac:Party")
//     .ele("cac:PartyIdentification")
//     .ele("cbc:ID", { schemeID: "TN" })
//     .txt("33445544")
//     .up()
//     .up()
//     .ele("cac:PostalAddress")
//     .ele("cbc:PostalZone")
//     .txt("33554")
//     .up()
//     .ele("cbc:CountrySubentityCode")
//     .txt("JO-AZ")
//     .up()
//     .ele("cac:Country")
//     .ele("cbc:IdentificationCode")
//     .txt("JO")
//     .up()
//     .up()
//     .up()
//     .ele("cac:PartyTaxScheme")
//     .ele("cbc:CompanyID")
//     .txt("33445544")
//     .up()
//     .ele("cac:TaxScheme")
//     .ele("cbc:ID")
//     .txt("VAT")
//     .up()
//     .up()
//     .up()
//     .ele("cac:PartyLegalEntity")
//     .ele("cbc:RegistrationName")
//     .txt("امجد سليمان")
//     .up()
//     .up()
//     .up()
//     .ele("cac:AccountingContact")
//     .ele("cbc:Telephone")
//     .txt("324323434")
//     .up()
//     .up()
//     .ele("cac:SellerSupplierParty")
//     .ele("cac:Party")
//     .ele("cac:PartyIdentification")
//     .ele("cbc:ID")
//     .txt("9932895")
//     .up()
//     .up()
//     .up()
//     .ele("cac:AllowanceCharge")
//     .ele("cbc:ChargeIndicator")
//     .txt("false")
//     .up()
//     .ele("cbc:AllowanceChargeReason")
//     .txt("discount")
//     .up()
//     .ele("cbc:Amount", { currencyID: "JO" })
//     .txt("2.00")
//     .up()
//     .up()
//     .ele("cac:TaxTotal")
//     .ele("cbc:TaxAmount", { currencyID: "JO" })
//     .txt("4.48")
//     .up()
//     .up()
//     .ele("cac:LegalMonetaryTotal")
//     .ele("cbc:TaxExclusiveAmount", { currencyID: "JO" })
//     .txt("66.00")
//     .up()
//     .ele("cbc:TaxInclusiveAmount", { currencyID: "JO" })
//     .txt("68.48")
//     .up()
//     .ele("cbc:AllowanceTotalAmount", { currencyID: "JO" })
//     .txt("2.00")
//     .up()
//     .ele("cbc:PayableAmount", { currencyID: "JO" })
//     .txt("68.48")
//     .up()
//     .up()
//     .ele("cac:InvoiceLine")
//     .ele("cbc:ID")
//     .txt("1")
//     .up()
//     .ele("cbc:InvoicedQuantity", { unitCode: "PCE" })
//     .txt("33.00")
//     .up()
//     .ele("cbc:LineExtensionAmount", { currencyID: "JO" })
//     .txt("64.00")
//     .up()
//     .ele("cac:TaxTotal")
//     .ele("cbc:TaxAmount", { currencyID: "JO" })
//     .txt("4.48")
//     .up()
//     .ele("cbc:RoundingAmount", { currencyID: "JO" })
//     .txt("68.48")
//     .up()
//     .ele("cac:TaxSubtotal")
//     .ele("cbc:TaxAmount", { currencyID: "JO" })
//     .txt("4.48")
//     .up()
//     .ele("cac:TaxCategory")
//     .ele("cbc:ID", { schemeAgencyID: "6", schemeID: "UN/ECE 5305" })
//     .txt("S")
//     .up()
//     .ele("cbc:Percent")
//     .txt("7.00")
//     .up()
//     .ele("cac:TaxScheme")
//     .ele("cbc:ID", { schemeAgencyID: "6", schemeID: "UN/ECE 5153" })
//     .txt("VAT")
//     .up()
//     .up()
//     .up()
//     .up()
//     .up()
//     .ele("cac:Item")
//     .ele("cbc:Name")
//     .txt("زهره")
//     .up()
//     .up()
//     .ele("cac:Price")
//     .ele("cbc:PriceAmount", { currencyID: "JO" })
//     .txt("2.00")
//     .up()
//     .ele("cac:AllowanceCharge")
//     .ele("cbc:ChargeIndicator")
//     .txt("false")
//     .up()
//     .ele("cbc:AllowanceChargeReason")
//     .txt("DISCOUNT")
//     .up()
//     .ele("cbc:Amount", { currencyID: "JO" })
//     .txt("2.00")
//     .up()
//     .up();

//   const xmlString = invoice.end({ prettyPrint: true });
//   fs.writeFileSync("result.xml", xmlString);

//   console.log(xmlString);
//   res.send(xmlString);

//   // res.send("Express + TypeScript Server");
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
