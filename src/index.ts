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

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

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
        supplier: { countryCode: "JO", taxNumber: 11803860, name: "BBBBBB" },
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
      const { data: responseData } = await axios.post<FaotraApiResultDto>(
        "https://backend.jofotara.gov.jo/core/invoices/",
        jsonBody,
        {
          headers: { ...headers },
        }
      );

      res.send(responseData as any);
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        if (data["EINV_RESULTS"]["ERRORS"].length > 0) {
          data["EINV_RESULTS"]["ERRORS"] = data["EINV_RESULTS"]["ERRORS"].map(
            ({ EINV_MESSAGE }: any) => {
              // TODO:
              const x = EINV_MESSAGE.split(" : ")[1].substring(1);
              const y = x.substring(0, x.length - 1);
              return JSON.parse(y);
            }
          );
        }
        res.status(400).send(error.response?.data as any);
      }
    }
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
//     supplier: { countryCode: "JO", taxNumber: 11803860, name: "BBBBBB" },
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
