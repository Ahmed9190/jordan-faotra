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

    const xmlString = invoice.toXmlString();

    res.set("Content-Type", "application/xml");
    res.send(xmlString);
  }
);

app.post(
  "/invoice/direct",
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
          request: jsonBody,
          response: data,
        });
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          const data = error.response?.data;
          res.send({
            request: jsonBody,
            response: data,
          });
        }
      });
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
