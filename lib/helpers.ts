export const logError = function (message: string, error: unknown) {
  let errorMessage: unknown;
  if (error instanceof Error) {
    errorMessage = new Error(message, {
      cause: error,
    });
    console.error(errorMessage);
  } else {
    console.error(error);
  }
  return errorMessage;
};
