import { useEffect, useState } from 'react';

type UsePromiseProps<TData, TParams extends readonly any[]> = {
  queryFn: (...args: TParams) => Promise<TData>;
  params?: TParams;
  initialData: TData;
  setDataFn?: (currentData: TData | undefined, newData: TData) => TData;
};

export default function usePromise<TData, TParams extends readonly any[] = []>({
  queryFn,
  params = [] as unknown as TParams,
  initialData,
  setDataFn = (currentData: TData | undefined, newData: TData) => newData,
}: UsePromiseProps<TData, TParams>) {
  const [data, setData] = useState<TData>(initialData);

  useEffect(() => {
    (async (): Promise<void> => {
      const data = await queryFn(...params);
      setData(currentData => setDataFn(currentData, data));
    })();
  }, [queryFn, ...(params as readonly any[]), setDataFn]);

  return [data, setData];
}
