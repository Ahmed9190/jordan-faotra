interface Data {
  EINV_RESULTS: {
    ERRORS: {
      EINV_MESSAGE: string;
    }[];
  };
}

export function formatErrors(data: Data): { errors: string[] } {
  if (!data || !data.EINV_RESULTS) {
    return { errors: ["Unknown error"] };
  }

  const errorMessages = data.EINV_RESULTS.ERRORS.map((error) => {
    if (!error.EINV_MESSAGE) {
      return "Unknown error";
    }

    let errorMessage;
    try {
      errorMessage = error.EINV_MESSAGE.replace(/.*message\":\"(.*)\"}.*/, "$1")
        .replace(/[^\x20-\x7E]/g, "")
        .trim();
    } catch (e) {
      errorMessage = "Error processing message";
    }

    return errorMessage;
  });

  return { errors: errorMessages };
}
