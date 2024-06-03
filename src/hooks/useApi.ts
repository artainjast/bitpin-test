import { DependencyList, useEffect, useMemo, useState } from 'react';
import { ArgumentType, MethodType } from '../types/General';
import { apiHandler } from '../services/apiHandler';
import { isEmpty } from '../utils';

interface UseAPI<T, M extends MethodType> {
  apiMethod: (data?: ArgumentType<M>) => Promise<T>;
  fireOnLoad?: boolean;
  requestDataOnLoad?: ArgumentType<M>;
  successCallback?: (data: T) => void;
  failedCallback?: (error?: Error) => void;
  dependenciesOnLoad?: DependencyList;
}

interface UseAPIReturnType<T, M extends MethodType> {
  isPending: boolean;
  request: (apiData?: ArgumentType<M>) => Promise<T>;
}

export default function useAPI<T, M extends MethodType>({
  apiMethod,
  fireOnLoad,
  requestDataOnLoad,
  successCallback,
  failedCallback,
  dependenciesOnLoad
}: UseAPI<T, M>): UseAPIReturnType<T, M> {
  const [loading, setLoading] = useState(!!fireOnLoad);

  const startCallback = () => setLoading(true);

  const endCallback = () => setLoading(false);

  function request(apiData?: ArgumentType<M>): Promise<T> {
    return new Promise(function (resolve, reject) {
      apiHandler<T, M>({
        apiData,
        apiMethod,
        startCallback,
        endCallback
      })
        ?.then((response: T) => {
          successCallback?.(response);
          resolve(response);
        })
        ?.catch((error: Error) => {
          failedCallback?.(error);
          reject(error);
        });
    });
  }

  const memoizedDependenciesOnLoad = useMemo(
    () => ( [...(dependenciesOnLoad || [])]),
    [ dependenciesOnLoad]
  );

  useEffect(() => {
    if (fireOnLoad) {
      request(requestDataOnLoad);
    }
  }, [memoizedDependenciesOnLoad]);

  return {
    isPending: loading,
    request
  };
}
