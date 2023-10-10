interface Data {
  EINV_RESULTS: {
    ERRORS: {
      EINV_MESSAGE: string;
    }[];
  };
}

export function formatErrors(data: Data): { errors: string[] } {
  const errorMessages = data.EINV_RESULTS.ERRORS.map((error) => {
    const errorMessage = error.EINV_MESSAGE.replace(
      /.*message\":\"(.*)\"}.*/,
      "$1"
    )
      .replace(/[^\x20-\x7E]/g, "")
      .trim();
    return errorMessage;
  });
  return { errors: errorMessages };
}
