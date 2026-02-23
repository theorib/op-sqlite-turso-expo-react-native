export const logData = (data: unknown, dataName?: string) => {
  const parsedData = JSON.stringify(data, null, 2);
  dataName ? console.log(dataName, parsedData) : console.log(parsedData);
};
export const logError = function (message: string, error: unknown) {
  let errorMessage: unknown;
  if (error instanceof Error) {
    errorMessage = error.message;
    logData(error, error.message);
    console.error(error);
  } else {
    logData(error, message);
  }
  return errorMessage;
};
