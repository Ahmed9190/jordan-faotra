export interface FaotraApiResultDto {
  EINV_RESULTS: EINVRESULTS;
  EINV_STATUS: string;
  EINV_SINGED_INVOICE: string;
  EINV_QR: string;
  EINV_NUM: string;
  EINV_INV_UUID: string;
}

interface EINVRESULTS {
  status: string;
  INFO: INFO[];
  WARNINGS: any[];
  ERRORS: any[];
}

interface INFO {
  type: string;
  status: string;
  EINV_CODE: string;
  EINV_CATEGORY: string;
  EINV_MESSAGE: string;
}
