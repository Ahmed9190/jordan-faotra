import { formatErrors } from "./error.utils";

describe("formatErrors", () => {
  it("should return an empty array when there are no errors", () => {
    const data = {
      EINV_RESULTS: {
        status: "SUCCESS",
        INFO: ["Complied with UBL 2.1 standards"],
        WARNINGS: [],
        ERRORS: [],
      },
      EINV_STATUS: "SUBMITTED",
      EINV_SINGED_INVOICE: "data:image/png;base64,iVBORw0KGg...",
      EINV_QR: "data:image/png;base64,iVBORw0KGg...",
      EINV_NUM: "20210001",
      EINV_INV_UUID: "f1c8d8d0-4f2c-11eb-ae93-0242ac130002",
    };
    const result = formatErrors(data);
    expect(result.errors).toEqual([]);
  });

  it("should extract error messages from the ERRORS array from the INFO array", () => {
    const data = {
      EINV_RESULTS: {
        status: "ERROR",
        INFO: [
          {
            type: "INFO",
            status: "PASS",
            EINV_CODE: "XSD_VALID",
            EINV_CATEGORY: "XSD validation",
            EINV_MESSAGE: "Complied with UBL 2.1 standards",
          },
        ],
        WARNINGS: [],
        ERRORS: [
          {
            type: "ERROR",
            status: "ERROR",
            EINV_CODE: "postalCode",
            EINV_CATEGORY: "invoice",
            EINV_MESSAGE: "Postal code length is not correct",
          },
        ],
      },
      EINV_STATUS: "NOT_SUBMITTED",
      EINV_SINGED_INVOICE: null,
      EINV_QR: null,
      EINV_NUM: null,
      EINV_INV_UUID: null,
    };
    const result = formatErrors(data);
    expect(result.errors).toEqual(["Postal code length is not correct"]);
  });

  it("should extract error messages from the ERRORS array", () => {
    const data = {
      EINV_RESULTS: {
        status: "ERROR",
        INFO: [],
        WARNINGS: [],
        ERRORS: [
          {
            type: "ERROR",
            status: "ERROR",
            EINV_CODE: "invoice-persist",
            EINV_CATEGORY: "Invoice",
            EINV_MESSAGE:
              '400 : "{"errorsKeyMessage":[{"reason":"invoice","message":"Id number should be unique�"}]}"',
          },
        ],
      },
      EINV_STATUS: "NOT_SUBMITTED",
      EINV_SINGED_INVOICE: null,
      EINV_QR: null,
      EINV_NUM: null,
      EINV_INV_UUID: null,
    };
    const result = formatErrors(data);
    expect(result.errors).toEqual(["Id number should be unique"]);
  });
});
