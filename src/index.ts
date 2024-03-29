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
import { generateXML } from "./x/generateXml";
import type { XmlInvoice } from "./x/generateXml";
import fs from "fs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// app.post(
//   "/invoice",
//   async (req: Request<never, never, CreateInvoiceDto>, res) => {
//     const { customer, ...invoiceData } = req.body;
//     const invoice: Invoice = new Invoice(
//       {
//         uuid: uuidv4(),
//         issueDate: new Date(),
//         invoiceType: InvoiceType.createNewCashInvoice,
//         currencyCode: "JOD",
//         supplier: {
//           countryCode: "JO",
//           taxNumber: "11803860",
//           name: "شركة الافق لصناعة الزجاج",
//         },
//         customer: {
//           countryCode: "JO",
//           ...customer,
//         },
//         countryCode: "JO",
//         incomeSourceSequence: "12758574",
//         ...invoiceData,
//       },
//       {
//         "Client-Id": process.env.CLIENT_ID!,
//         "Secret-Key": process.env.SECRET_KEY!,
//         Cookie: process.env.COOKIE!,
//       }
//     );

//     const headers = invoice.getFaotraRequestHeaders();
//     const jsonBody = invoice.toJson();

//     try {
//       const { data } = await axios.post<FaotraApiResultDto>(
//         "https://backend.jofotara.gov.jo/core/invoices/",
//         jsonBody,
//         {
//           headers: { ...headers },
//         }
//       );

//       res.send(data as any);
//     } catch (error) {
//       if (isAxiosError(error)) {
//         const data = error.response?.data;
//         const errorsResponse = formatErrors(data);
//         res.status(400).send(errorsResponse as any);
//       }
//     }
//   }
// );

// app.post(
//   "/invoice/xml",
//   (req: Request<never, never, CreateInvoiceDto>, res: Response) => {
//     const { customer, ...invoiceData } = req.body;
//     const invoice: Invoice = new Invoice(
//       {
//         uuid: uuidv4(),
//         issueDate: new Date(),
//         invoiceType: InvoiceType.createNewCashInvoice,
//         currencyCode: "JOD",
//         supplier: {
//           countryCode: "JO",
//           taxNumber: "11803860",
//           name: "شركة الافق لصناعة الزجاج",
//         },
//         customer: {
//           countryCode: "JO",
//           ...customer,
//         },
//         countryCode: "JO",
//         incomeSourceSequence: "12758574",
//         ...invoiceData,
//       },
//       {
//         "Client-Id": process.env.CLIENT_ID!,
//         "Secret-Key": process.env.SECRET_KEY!,
//         Cookie: process.env.COOKIE!,
//       }
//     );

//     const xmlString = invoice.toXmlString();

//     res.set("Content-Type", "application/xml");
//     res.send(xmlString);
//   }
// );

app.post("/invoice", async (req: Request<never, never, XmlInvoice>, res) => {
  const xml = generateXML(req.body);
  const headers = {
    "Content-Type": "application/json",
    "Client-Id": req.headers["client-id"],
    "Secret-Key": req.headers["secret-key"],
    Cookie: req.headers["cookie"],
  };

  const xmlBase64 = Buffer.from(xml).toString("base64");

  try {
    const { data } = await axios.post<FaotraApiResultDto>(
      "https://backend.jofotara.gov.jo/core/invoices/",
      { invoice: xmlBase64 },
      { headers }
    );

    res.send(data as any);
  } catch (error) {
    if (isAxiosError(error)) {
      const data = error.response?.data;
      console.log(data);
      const errorsResponse = formatErrors(data);
      res.status(400).send(errorsResponse as any);
    } else {
      res.status(400).send(error as any);
    }
  }
});

app.post(
  "/invoice/xml",
  async (req: Request<never, never, XmlInvoice>, res) => {
    const xml = generateXML(req.body);
    res.set("Content-Type", "application/xml");
    res.send(xml as any);
  }
);

// app.post(
//   "/invoice/direct",
//   (req: Request<never, never, CreateInvoiceDto>, res: Response) => {
//     const { customer, ...invoiceData } = req.body;
//     const invoice: Invoice = new Invoice(
//       {
//         uuid: uuidv4(),
//         issueDate: new Date(),
//         invoiceType: InvoiceType.createNewCashInvoice,
//         currencyCode: "JOD",
//         supplier: {
//           countryCode: "JO",
//           taxNumber: "11803860",
//           name: "شركة الافق لصناعة الزجاج",
//         },
//         customer: {
//           countryCode: "JO",
//           ...customer,
//         },
//         countryCode: "JO",
//         incomeSourceSequence: "12758574",
//         ...invoiceData,
//       },
//       {
//         "Client-Id": process.env.CLIENT_ID!,
//         "Secret-Key": process.env.SECRET_KEY!,
//         Cookie: process.env.COOKIE!,
//       }
//     );

//     const headers = invoice.getFaotraRequestHeaders();
//     const jsonBody = invoice.toJson();

//     axios
//       .post<FaotraApiResultDto>(
//         "https://backend.jofotara.gov.jo/core/invoices/",
//         jsonBody,
//         {
//           headers: { ...headers },
//         }
//       )
//       .then(({ data }) => {
//         res.send({
//           response: data,
//           request: jsonBody,
//         });
//       })
//       .catch((error) => {
//         if (isAxiosError(error)) {
//           const data = error.response?.data;
//           res.send({
//             response: data,
//             request: jsonBody,
//           });
//         }
//       });
//   }
// );

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
