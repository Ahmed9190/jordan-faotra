import { create } from "xmlbuilder2";

export function generateXML(data: XmlInvoice): string {
  const doc = create({ version: "1.0", encoding: "UTF-8" })
    .ele("Invoice", {
      xmlns: "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
      "xmlns:cac":
        "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
      "xmlns:cbc":
        "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
      "xmlns:ext":
        "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
    })
    .ele("cbc:ProfileID")
    .txt(data.ProfileID)
    .up()
    .ele("cbc:ID")
    .txt(data.ID)
    .up()
    .ele("cbc:UUID")
    .txt(data.UUID)
    .up()
    .ele("cbc:IssueDate")
    .txt(data.IssueDate)
    .up()
    .ele("cbc:InvoiceTypeCode", { name: data.InvoiceType.name })
    .txt(data.InvoiceType.code)
    .up()
    .ele("cbc:Note")
    .txt(data.Note)
    .up()
    .ele("cbc:DocumentCurrencyCode")
    .txt(data.DocumentCurrencyCode)
    .up()
    .ele("cbc:TaxCurrencyCode")
    .txt(data.TaxCurrencyCode)
    .up()
    .ele("cac:AdditionalDocumentReference")
    .ele("cbc:ID")
    .txt(data.AdditionalDocumentReference.ID)
    .up()
    .ele("cbc:UUID")
    .txt(data.AdditionalDocumentReference.UUID)
    .up()
    .up()
    .ele("cac:AccountingSupplierParty")
    .ele("cac:Party")
    .ele("cac:PostalAddress")
    .ele("cac:Country")
    .ele("cbc:IdentificationCode")
    .txt(
      data.AccountingSupplierParty.Party.PostalAddress.Country
        .IdentificationCode
    )
    .up()
    .up()
    .up()
    .ele("cac:PartyTaxScheme")
    .ele("cbc:CompanyID")
    .txt(data.AccountingSupplierParty.PartyTaxScheme.CompanyID)
    .up()
    .ele("cac:TaxScheme")
    .ele("cbc:ID")
    .txt(data.AccountingSupplierParty.PartyTaxScheme.TaxScheme.ID)
    .up()
    .up()
    .up()
    .ele("cac:PartyLegalEntity")
    .ele("cbc:RegistrationName")
    .txt(data.AccountingSupplierParty.PartyLegalEntity.RegistrationName)
    .up()
    .up()
    .up()
    .up()
    .ele("cac:AccountingCustomerParty")
    .ele("cac:Party")
    .ele("cac:PartyIdentification")
    .ele("cbc:ID", {
      schemeID: data.AccountingCustomerParty.Party.PartyIdentification.schemeID,
    })
    .txt(data.AccountingCustomerParty.Party.PartyIdentification.ID)
    .up()
    .up()
    .ele("cac:PostalAddress")
    .ele("cbc:PostalZone")
    .txt(data.AccountingCustomerParty.Party.PostalAddress.PostalZone)
    .up()
    .ele("cbc:CountrySubentityCode")
    .txt(data.AccountingCustomerParty.Party.PostalAddress.CountrySubentityCode)
    .up()
    .ele("cac:Country")
    .ele("cbc:IdentificationCode")
    .txt(
      data.AccountingCustomerParty.Party.PostalAddress.Country
        .IdentificationCode
    )
    .up()
    .up()
    .up()
    .ele("cac:PartyTaxScheme")
    .ele("cbc:CompanyID")
    .txt(data.AccountingCustomerParty.PartyTaxScheme.CompanyID)
    .up()
    .ele("cac:TaxScheme")
    .ele("cbc:ID")
    .txt(data.AccountingCustomerParty.PartyTaxScheme.TaxScheme.ID)
    .up()
    .up()
    .up()
    .ele("cac:PartyLegalEntity")
    .ele("cbc:RegistrationName")
    .txt(data.AccountingCustomerParty.PartyLegalEntity.RegistrationName)
    .up()
    .up()
    .up()
    .ele("cac:AccountingContact")
    .ele("cbc:Telephone")
    .txt(data.AccountingCustomerParty.AccountingContact.Telephone)
    .up()
    .up()
    .up()
    .ele("cac:SellerSupplierParty")
    .ele("cac:Party")
    .ele("cac:PartyIdentification")
    .ele("cbc:ID")
    .txt(data.SellerSupplierParty.Party.PartyIdentification.ID)
    .up()
    .up()
    .up()
    .up()
    .ele("cac:AllowanceCharge")
    .ele("cbc:ChargeIndicator")
    .txt(data.AllowanceCharge.ChargeIndicator ? "true" : "false")
    .up()
    .ele("cbc:AllowanceChargeReason")
    .txt(data.AllowanceCharge.AllowanceChargeReason)
    .up()
    .ele("cbc:Amount", {
      currencyID: data.AllowanceCharge.Amount.currencyID,
    })
    .txt(data.AllowanceCharge.Amount.value)
    .up()
    .up()
    .ele("cac:TaxTotal")
    .ele("cbc:TaxAmount", {
      currencyID: data.TaxTotal.TaxAmount.currencyID,
    })
    .txt(data.TaxTotal.TaxAmount.value)
    .up()
    .up()
    .ele("cac:LegalMonetaryTotal")
    .ele("cbc:TaxExclusiveAmount", {
      currencyID: data.LegalMonetaryTotal.TaxExclusiveAmount.currencyID,
    })
    .txt(data.LegalMonetaryTotal.TaxExclusiveAmount.value)
    .up()
    .ele("cbc:TaxInclusiveAmount", {
      currencyID: data.LegalMonetaryTotal.TaxInclusiveAmount.currencyID,
    })
    .txt(data.LegalMonetaryTotal.TaxInclusiveAmount.value)
    .up()
    .ele("cbc:AllowanceTotalAmount", {
      currencyID: data.LegalMonetaryTotal.AllowanceTotalAmount.currencyID,
    })
    .txt(data.LegalMonetaryTotal.AllowanceTotalAmount.value)
    .up()
    .ele("cbc:PayableAmount", {
      currencyID: data.LegalMonetaryTotal.PayableAmount.currencyID,
    })
    .txt(data.LegalMonetaryTotal.PayableAmount.value)
    .up()
    .up();

  data.InvoiceLines.forEach((line) => {
    doc
      .ele("cac:InvoiceLine")
      .ele("cbc:ID")
      .txt(line.ID)
      .up()
      .ele("cbc:InvoicedQuantity", {
        unitCode: line.InvoicedQuantity.unitCode,
      })
      .txt(line.InvoicedQuantity.value)
      .up()
      .ele("cbc:LineExtensionAmount", {
        currencyID: line.LineExtensionAmount.currencyID,
      })
      .txt(line.LineExtensionAmount.value)
      .up()
      .ele("cac:TaxTotal")
      .ele("cbc:TaxAmount", {
        currencyID: line.TaxTotal.TaxAmount.currencyID,
      })
      .txt(line.TaxTotal.TaxAmount.value)
      .up()
      .ele("cbc:RoundingAmount", {
        currencyID: line.TaxTotal.RoundingAmount.currencyID,
      })
      .txt(line.TaxTotal.RoundingAmount.value)
      .up()
      .ele("cac:TaxSubtotal")
      .ele("cbc:TaxAmount", {
        currencyID: line.TaxTotal.TaxSubtotal.TaxAmount.currencyID,
      })
      .txt(line.TaxTotal.TaxSubtotal.TaxAmount.value)
      .up()
      .ele("cac:TaxCategory")
      .ele("cbc:ID", {
        schemeAgencyID: line.TaxTotal.TaxSubtotal.TaxCategory.ID.schemeAgencyID,
        schemeID: line.TaxTotal.TaxSubtotal.TaxCategory.ID.schemeID,
      })
      .txt(line.TaxTotal.TaxSubtotal.TaxCategory.ID.value)
      .up()
      .ele("cbc:Percent")
      .txt(line.TaxTotal.TaxSubtotal.TaxCategory.Percent)
      .up()
      .ele("cac:TaxScheme")
      .ele("cbc:ID", {
        schemeAgencyID:
          line.TaxTotal.TaxSubtotal.TaxCategory.TaxScheme.ID.schemeAgencyID,
        schemeID: line.TaxTotal.TaxSubtotal.TaxCategory.TaxScheme.ID.schemeID,
      })
      .txt(line.TaxTotal.TaxSubtotal.TaxCategory.TaxScheme.ID.value)
      .up()
      .up()
      .up()
      .up()
      .up()
      .ele("cac:Item")
      .ele("cbc:Name")
      .txt(line.Item.Name)
      .up()
      .up()
      .ele("cac:Price")
      .ele("cbc:PriceAmount", {
        currencyID: line.Price.PriceAmount.currencyID,
      })
      .txt(line.Price.PriceAmount.value)
      .up()
      .ele("cac:AllowanceCharge")
      .ele("cbc:ChargeIndicator")
      .txt(line.Price.AllowanceCharge.ChargeIndicator ? "true" : "false")
      .up()
      .ele("cbc:AllowanceChargeReason")
      .txt(line.Price.AllowanceCharge.AllowanceChargeReason)
      .up()
      .ele("cbc:Amount", {
        currencyID: line.Price.AllowanceCharge.Amount.currencyID,
      })
      .txt(line.Price.AllowanceCharge.Amount.value)
      .up()
      .up()
      .up()
      .up();
  });

  return doc.end({ prettyPrint: true });
}

export interface XmlInvoice {
  ProfileID: string;
  ID: string;
  UUID: string;
  IssueDate: string;
  InvoiceType: { code: string; name: string };
  Note: string;
  DocumentCurrencyCode: string;
  TaxCurrencyCode: string;
  AdditionalDocumentReference: {
    ID: string;
    UUID: string;
  };
  AccountingSupplierParty: {
    Party: {
      PostalAddress: {
        Country: {
          IdentificationCode: string;
        };
      };
    };
    PartyTaxScheme: {
      CompanyID: string;
      TaxScheme: {
        ID: string;
      };
    };
    PartyLegalEntity: {
      RegistrationName: string;
    };
  };
  AccountingCustomerParty: {
    Party: {
      PartyIdentification: {
        ID: string;
        schemeID: string;
      };
      PostalAddress: {
        PostalZone: string;
        CountrySubentityCode: string;
        Country: {
          IdentificationCode: string;
        };
      };
    };
    PartyTaxScheme: {
      CompanyID: string;
      TaxScheme: {
        ID: string;
      };
    };
    PartyLegalEntity: {
      RegistrationName: string;
    };
    AccountingContact: {
      Telephone: string;
    };
  };
  SellerSupplierParty: {
    Party: {
      PartyIdentification: {
        ID: string;
      };
    };
  };
  AllowanceCharge: {
    ChargeIndicator: boolean;
    AllowanceChargeReason: string;
    Amount: {
      currencyID: string;
      value: string;
    };
  };
  TaxTotal: {
    TaxAmount: {
      currencyID: string;
      value: string;
    };
  };
  LegalMonetaryTotal: {
    TaxExclusiveAmount: {
      currencyID: string;
      value: string;
    };
    TaxInclusiveAmount: {
      currencyID: string;
      value: string;
    };
    AllowanceTotalAmount: {
      currencyID: string;
      value: string;
    };
    PayableAmount: {
      currencyID: string;
      value: string;
    };
  };
  InvoiceLines: InvoiceLine[];
}

interface InvoiceLine {
  ID: string;
  InvoicedQuantity: {
    unitCode: string;
    value: string;
  };
  LineExtensionAmount: {
    currencyID: string;
    value: string;
  };
  TaxTotal: {
    TaxAmount: {
      currencyID: string;
      value: string;
    };
    RoundingAmount: {
      currencyID: string;
      value: string;
    };
    TaxSubtotal: {
      TaxAmount: {
        currencyID: string;
        value: string;
      };
      TaxCategory: {
        ID: {
          schemeAgencyID: string;
          schemeID: string;
          value: string;
        };
        Percent: string;
        TaxScheme: {
          ID: {
            schemeAgencyID: string;
            schemeID: string;
            value: string;
          };
        };
      };
    };
  };
  Item: {
    Name: string;
  };
  Price: {
    PriceAmount: {
      currencyID: string;
      value: string;
    };
    AllowanceCharge: {
      ChargeIndicator: boolean;
      AllowanceChargeReason: string;
      Amount: {
        currencyID: string;
        value: string;
      };
    };
  };
}

// const data: XmlInvoice = {
//   ProfileID: "reporting:1.0",
//   ID: "EIN00090",
//   UUID: "0043e15e-740b-4e1b-889d-8504afdb1d1d",
//   IssueDate: "2022-09-27",
//   InvoiceType: { code: "388", name: "012" },
//   Note: "ملاحظات 22",
//   DocumentCurrencyCode: "JOD",
//   TaxCurrencyCode: "JOD",
//   AdditionalDocumentReference: {
//     ID: "ICV",
//     UUID: "1",
//   },
//   AccountingSupplierParty: {
//     Party: {
//       PostalAddress: {
//         Country: {
//           IdentificationCode: "JO",
//         },
//       },
//     },
//     PartyTaxScheme: {
//       CompanyID: "11803860",
//       TaxScheme: {
//         ID: "VAT",
//       },
//     },
//     PartyLegalEntity: {
//       RegistrationName: "BBBBBB",
//     },
//   },
//   AccountingCustomerParty: {
//     Party: {
//       PartyIdentification: {
//         ID: "33445544",
//         schemeID: "TN",
//       },
//       PostalAddress: {
//         PostalZone: "33554",
//         CountrySubentityCode: "JO-AZ",
//         Country: {
//           IdentificationCode: "JO",
//         },
//       },
//     },
//     PartyTaxScheme: {
//       CompanyID: "33445544",
//       TaxScheme: {
//         ID: "VAT",
//       },
//     },
//     PartyLegalEntity: {
//       RegistrationName: "امجد سليمان",
//     },
//     AccountingContact: {
//       Telephone: "324323434",
//     },
//   },
//   SellerSupplierParty: {
//     Party: {
//       PartyIdentification: {
//         ID: "12758574",
//       },
//     },
//   },
//   AllowanceCharge: {
//     ChargeIndicator: false,
//     AllowanceChargeReason: "discount",
//     Amount: {
//       currencyID: "JO",
//       value: "2.00",
//     },
//   },
//   TaxTotal: {
//     TaxAmount: {
//       currencyID: "JO",
//       value: "4.48",
//     },
//   },
//   LegalMonetaryTotal: {
//     TaxExclusiveAmount: {
//       currencyID: "JO",
//       value: "66.00",
//     },
//     TaxInclusiveAmount: {
//       currencyID: "JO",
//       value: "68.48",
//     },
//     AllowanceTotalAmount: {
//       currencyID: "JO",
//       value: "2.00",
//     },
//     PayableAmount: {
//       currencyID: "JO",
//       value: "68.48",
//     },
//   },
//   InvoiceLines: [
//     {
//       ID: "1",
//       InvoicedQuantity: {
//         unitCode: "PCE",
//         value: "33.00",
//       },
//       LineExtensionAmount: {
//         currencyID: "JO",
//         value: "64.00",
//       },
//       TaxTotal: {
//         TaxAmount: {
//           currencyID: "JO",
//           value: "4.48",
//         },
//         RoundingAmount: {
//           currencyID: "JO",
//           value: "68.48",
//         },
//         TaxSubtotal: {
//           TaxAmount: {
//             currencyID: "JO",
//             value: "4.48",
//           },
//           TaxCategory: {
//             ID: {
//               schemeAgencyID: "6",
//               schemeID: "UN/ECE 5305",
//               value: "S",
//             },
//             Percent: "7.00",
//             TaxScheme: {
//               ID: {
//                 schemeAgencyID: "6",
//                 schemeID: "UN/ECE 5153",
//                 value: "VAT",
//               },
//             },
//           },
//         },
//       },
//       Item: {
//         Name: "زهره",
//       },
//       Price: {
//         PriceAmount: {
//           currencyID: "JO",
//           value: "2.00",
//         },
//         AllowanceCharge: {
//           ChargeIndicator: false,
//           AllowanceChargeReason: "DISCOUNT",
//           Amount: {
//             currencyID: "JO",
//             value: "2.00",
//           },
//         },
//       },
//     },
//     {
//       ID: "2",
//       InvoicedQuantity: {
//         unitCode: "PCE",
//         value: "33.00",
//       },
//       LineExtensionAmount: {
//         currencyID: "JO",
//         value: "64.00",
//       },
//       TaxTotal: {
//         TaxAmount: {
//           currencyID: "JO",
//           value: "4.48",
//         },
//         RoundingAmount: {
//           currencyID: "JO",
//           value: "68.48",
//         },
//         TaxSubtotal: {
//           TaxAmount: {
//             currencyID: "JO",
//             value: "4.48",
//           },
//           TaxCategory: {
//             ID: {
//               schemeAgencyID: "6",
//               schemeID: "UN/ECE 5305",
//               value: "S",
//             },
//             Percent: "7.00",
//             TaxScheme: {
//               ID: {
//                 schemeAgencyID: "6",
//                 schemeID: "UN/ECE 5153",
//                 value: "VAT",
//               },
//             },
//           },
//         },
//       },
//       Item: {
//         Name: "زهره",
//       },
//       Price: {
//         PriceAmount: {
//           currencyID: "JO",
//           value: "2.00",
//         },
//         AllowanceCharge: {
//           ChargeIndicator: false,
//           AllowanceChargeReason: "DISCOUNT",
//           Amount: {
//             currencyID: "JO",
//             value: "2.00",
//           },
//         },
//       },
//     },
//   ],
// };

// const newData: XmlInvoice = {
//   ProfileID: "reporting:1.0",
//   ID: "231210809",
//   UUID: "1ba80e08-8250-4856-9531-cebc229f048d",
//   IssueDate: "2023-12-24",
//   InvoiceType: { code: "388", name: "012" },
//   Note: "",
//   DocumentCurrencyCode: "JOD",
//   TaxCurrencyCode: "JOD",
//   AdditionalDocumentReference: {
//     ID: "ICV",
//     UUID: "231210809",
//   },
//   AccountingSupplierParty: {
//     Party: {
//       PostalAddress: {
//         Country: {
//           IdentificationCode: "JO",
//         },
//       },
//     },
//     PartyTaxScheme: {
//       CompanyID: "11803860",
//       TaxScheme: {
//         ID: "VAT",
//       },
//     },
//     PartyLegalEntity: {
//       RegistrationName: "ط´ط±ظƒط© ط§ظ„ط§ظ‚ ظ„طµظ†ط§ط¹ط© ط§ظ„ط²ط¬ط§ط¬",
//     },
//   },
//   AccountingCustomerParty: {
//     Party: {
//       PartyIdentification: {
//         ID: "55555555555",
//         schemeID: "taxNumber",
//       },
//       PostalAddress: {
//         PostalZone: "14253",
//         CountrySubentityCode: "JO-AZ",
//         Country: {
//           IdentificationCode: "JO",
//         },
//       },
//     },
//     PartyTaxScheme: {
//       CompanyID: "55555555555",
//       TaxScheme: {
//         ID: "VAT",
//       },
//     },
//     PartyLegalEntity: {
//       RegistrationName: "ط·ط§ظ‡ط± ط§ط¨ظˆ ظ…طµط·ظپظ‰",
//     },
//     AccountingContact: {
//       Telephone: "07955522233",
//     },
//   },
//   SellerSupplierParty: {
//     Party: {
//       PartyIdentification: {
//         ID: "12758574",
//       },
//     },
//   },
//   AllowanceCharge: {
//     ChargeIndicator: false,
//     AllowanceChargeReason: "discount",
//     Amount: {
//       currencyID: "JO",
//       value: "0",
//     },
//   },
//   TaxTotal: {
//     TaxAmount: {
//       currencyID: "JO",
//       value: "0.681",
//     },
//   },
//   LegalMonetaryTotal: {
//     TaxExclusiveAmount: {
//       currencyID: "JO",
//       value: "4.258",
//     },
//     TaxInclusiveAmount: {
//       currencyID: "JO",
//       value: "4.939",
//     },
//     AllowanceTotalAmount: {
//       currencyID: "JO",
//       value: "0",
//     },
//     PayableAmount: {
//       currencyID: "JO",
//       value: "4.939",
//     },
//   },
//   InvoiceLines: [
//     {
//       ID: "1",
//       InvoicedQuantity: {
//         unitCode: "PCE",
//         value: "1.235",
//       },
//       LineExtensionAmount: {
//         currencyID: "JO",
//         value: "4.25828",
//       },
//       TaxTotal: {
//         TaxAmount: {
//           currencyID: "JO",
//           value: "0.681",
//         },
//         RoundingAmount: {
//           currencyID: "JO",
//           value: "4.939",
//         },
//         TaxSubtotal: {
//           TaxAmount: {
//             currencyID: "JO",
//             value: "0.681",
//           },
//           TaxCategory: {
//             ID: {
//               schemeAgencyID: "6",
//               schemeID: "UN/ECE 5305",
//               value: "S",
//             },
//             Percent: "0.16",
//             TaxScheme: {
//               ID: {
//                 schemeAgencyID: "6",
//                 schemeID: "UN/ECE 5153",
//                 value: "VAT",
//               },
//             },
//           },
//         },
//       },
//       Item: {
//         Name: "8mm Clear",
//       },
//       Price: {
//         PriceAmount: {
//           currencyID: "JO",
//           value: "3.448",
//         },
//         AllowanceCharge: {
//           ChargeIndicator: false,
//           AllowanceChargeReason: "DISCOUNT",
//           Amount: {
//             currencyID: "JO",
//             value: "0",
//           },
//         },
//       },
//     },
//   ],
// };

// const xml = generateXML(newData);
// console.log(xml);

// fs.writeFileSync("actual.xml", xml);
// console.log("XML saved in actual.xml");
