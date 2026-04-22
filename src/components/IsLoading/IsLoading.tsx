import type { PropsWithChildren } from "react";

type IsLoadingProps = {
  loading: boolean;
};

const IsLoading = ({ loading, children }: PropsWithChildren<IsLoadingProps>) => {
  if (loading) return <div>Loading...</div>;
  return children;
};

export default IsLoading;
