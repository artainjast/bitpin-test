import { DependencyList, useEffect, useMemo } from 'react';
import type { MutatorOptions } from 'swr';
import useSWR from 'swr';
import { ArgumentType, MethodType, SimpleFunction } from '../types/General';
import { apiHandler } from '../services/apiHandler';
import { isEmpty } from '../utils';

interface UsePageData<T, M extends MethodType> {
  apiMethod: (data?: ArgumentType<M>) => Promise<T>;
  apiData?: ArgumentType<M>;
  dependencies?: DependencyList;
  url?: string;
  successCallback?: (data?: T) => void;
  failedCallback?: SimpleFunction;
  revalidateIfStale?: boolean;
  revalidateOnMount?: boolean;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  revalidateOnEmptyCache?: boolean;
  refreshInterval?: number;
}

interface UsePageDataReturnType<T> {
  pageData?: T;
  pending: boolean;
  hasError: boolean;
  reload: () => Promise<T | undefined>;
  mutate: (data: T, options?: MutatorOptions) => void;
  cacheKey: Array<unknown>;
}

export default function usePageData<T, M extends MethodType>({
  apiMethod,
  apiData,
  dependencies,
  url,
  successCallback = () => {},
  failedCallback = () => {},
  revalidateIfStale = false,
  revalidateOnMount = true,
  revalidateOnFocus = false,
  revalidateOnReconnect = false,
  revalidateOnEmptyCache = false,
  refreshInterval = undefined
}: UsePageData<T, M>): UsePageDataReturnType<T> {

  const fetcher = () => {
    return apiHandler({
      apiData,
      apiMethod
    });
  };

  const memoizedDependenciesOnLoad = useMemo(() => [url, ...(dependencies || [])], [dependencies, url]);

  const { data: cachedData } = useSWR(memoizedDependenciesOnLoad);

  const {
    data: pageData,
    error,
    mutate
  } = useSWR(memoizedDependenciesOnLoad, fetcher, {
    onError: failedCallback,
    revalidateIfStale,
    revalidateOnMount: revalidateOnEmptyCache ? isEmpty(cachedData) : revalidateOnMount,
    revalidateOnFocus,
    revalidateOnReconnect,
    refreshInterval
  });

  const pending = !error && !pageData;

  useEffect(() => {
    if (pending) return;
    successCallback?.(pageData);
  }, [pending]);

  const reload = () => mutate();

  return {
    pageData,
    pending,
    hasError: !!error,
    reload,
    mutate,
    cacheKey: memoizedDependenciesOnLoad
  };
}
