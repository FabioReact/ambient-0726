import type { PropsWithChildren } from "react";

type IsErrorProps = {
  isError: boolean;
  errorMessage: undefined | string;
};

const IsError = ({ isError, errorMessage, children }: PropsWithChildren<IsErrorProps>) => {
  if (isError) return <p className="text-red-500">{errorMessage}</p>;
  return children;
};

export default IsError;
