import { toast } from 'react-toastify'
import { ArgumentType, MethodType, SimpleFunction } from '../types/General';
interface ApiHandlerProps<T, M extends MethodType> {
  apiMethod: (data?: ArgumentType<M>) => Promise<T>;
  startCallback?: SimpleFunction;
  endCallback?: SimpleFunction;
  apiData?: ArgumentType<M>;
}

function apiHandler<T, M extends MethodType>({
  apiMethod,
  startCallback,
  endCallback,
  apiData
}: ApiHandlerProps<T, M>): Promise<T> {
  return new Promise(function (resolve, reject) {
    startCallback?.();
    apiMethod(apiData)
      .then((data) => {
        resolve(data);
        endCallback?.();
      })
      .catch((error) => {
        const status = error?.data?.status;
        if (status === 500 || error.message === 'Network Error') {
            toast.error('مشکلی برای بیت پین بوجود آمده اس'  , {
                autoClose: 5000,
            });
        }
        reject(error);
        endCallback?.();
      });
  });
}

export { apiHandler };
