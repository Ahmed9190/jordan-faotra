import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import InvoiceType from "./enums/invoice-type.enum";
import { CustomerPartyIdType } from "./enums/customer-party-id.enum";
import Invoice from "./models/invoice";
import axios, { isAxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import { CreateInvoiceDto } from "./dtos/create-invoice.dto";
import { FaotraApiResultDto } from "./dtos/faotra-api-result.dto";
import bodyParser from "body-parser";
import { formatErrors } from "./utils/error.utils";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post(
  "/invoice",
  async (req: Request<never, never, CreateInvoiceDto>, res) => {
    const { customer, ...invoiceData } = req.body;
    const invoice: Invoice = new Invoice(
      {
        uuid: uuidv4(),
        issueDate: new Date(),
        invoiceType: InvoiceType.createNewCashInvoice,
        currencyCode: "JOD",
        supplier: {
          countryCode: "JO",
          taxNumber: 11803860,
          name: "شركة الافق لصناعة الزجاج",
        },
        customer: {
          countryCode: "JO",
          ...customer,
        },
        countryCode: "JO",
        incomeSourceSequence: 12758574,
        ...invoiceData,
      },
      {
        "Client-Id": process.env.CLIENT_ID!,
        "Secret-Key": process.env.SECRET_KEY!,
        Cookie: process.env.COOKIE!,
      }
    );

    const headers = invoice.getFaotraRequestHeaders();
    const jsonBody = invoice.toJson();

    try {
      const { data } = await axios.post<FaotraApiResultDto>(
        "https://backend.jofotara.gov.jo/core/invoices/",
        jsonBody,
        {
          headers: { ...headers },
        }
      );

      res.send(data as any);
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        const errorsResponse = formatErrors(data);
        res.status(400).send(errorsResponse as any);
      }
    }
  }
);

// create the same request but return the built xml xml for request and response
// {
//   "request": "<xml>....",
//   "response": "<xml>...."
// }
app.post(
  "/invoice/xml",
  (req: Request<never, never, CreateInvoiceDto>, res: Response) => {
    const { customer, ...invoiceData } = req.body;
    const invoice: Invoice = new Invoice(
      {
        uuid: uuidv4(),
        issueDate: new Date(),
        invoiceType: InvoiceType.createNewCashInvoice,
        currencyCode: "JOD",
        supplier: {
          countryCode: "JO",
          taxNumber: 11803860,
          name: "شركة الافق لصناعة الزجاج",
        },
        customer: {
          countryCode: "JO",
          ...customer,
        },
        countryCode: "JO",
        incomeSourceSequence: 12758574,
        ...invoiceData,
      },
      {
        "Client-Id": process.env.CLIENT_ID!,
        "Secret-Key": process.env.SECRET_KEY!,
        Cookie: process.env.COOKIE!,
      }
    );

    const headers = invoice.getFaotraRequestHeaders();
    const jsonBody = invoice.toJson();

    axios
      .post<FaotraApiResultDto>(
        "https://backend.jofotara.gov.jo/core/invoices/",
        jsonBody,
        {
          headers: { ...headers },
        }
      )
      .then(({ data }) => {
        res.send({
          json: req.body,
          request: invoice.toXmlString(),
          response: data,
        });
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          const data = error.response?.data;
          const errorsResponse = formatErrors(data);
          res.status(400).send(errorsResponse as any);
        }
      });
  }
);

// const invoice: Invoice = new Invoice(
//   {
//     id: "EIN00090",
//     uuid: "0043e15e-740b-4e1b-889d-8504afdb1d1d",
//     invoiceNumber: 1,
//     issueDate: new Date(Date.parse("2022-09-27")),
//     invoiceType: InvoiceType.createNewCashInvoice,
//     note: "ملاحظات 22",
//     currencyCode: "JOD",
//     supplier: { countryCode: "JO", taxNumber: 11803860, name: "شركة الافق لصناعة الزجاج" },
//     customer: {
//       name: "امجد سليمان",
//       customerPartyNumber: 33445544,
//       postalCode: 33554,
//       countryCode: "JO",
//       countrySubentityCode: "AZ",
//       telephone: "324323434",
//     },
//     invoiceLines: [
//       {
//         itemId: String(1),
//         currencyId: "JO",
//         quantity: 33.0,
//         unitPrice: 2.0,
//         nameOrDescription: "زهره",
//         discount: 2,
//         countryCode: "JO",
//         taxAmount: 4.48,
//         roundingAmount: 68.48,
//         generalTaxPercent: 7,
//       },
//     ],
//     incomeSourceSequence: 12758574,
//     countryCode: "JO",
//     totalDiscount: 2,
//     taxAmount: 4.48,
//     taxExclusiveAmount: 66,
//     taxInclusiveAmount: 68.48,
//     allowanceTotalAmount: 2,
//     payableAmount: 68.48,
//   },
//   {
//     "Client-Id": process.env.CLIENT_ID!,
//     "Secret-Key": process.env.SECRET_KEY!,
//     Cookie: process.env.COOKIE!,
//   }
// );

// const headers = invoice.getFaotraRequestHeaders();
// const jsonBody = invoice.toJson();

// axios
//   .post("https://backend.jofotara.gov.jo/core/invoices/", jsonBody, {
//     headers: { ...headers },
//   })
//   .then(({ data }) => fs.writeFileSync("response.json", JSON.stringify(data)));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
