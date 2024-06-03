import { getService } from "./axios";
import { AxiosRequestConfig } from 'axios';

interface GetArguments {
  url: string;
  params?: object;
  config?: AxiosRequestConfig | undefined;
}

function getRequest<T>({ url, params }: GetArguments): Promise<T> {
    return new Promise((resolve, reject) => {
        getService(url, {
            params: params,
            headers: {
                //we can add headers here like as auth
                // Authorization: getCookie({ name: cookiesName.AuthorizationToken })
            }
        })
            .then((response) => {                
                resolve(response.data as T);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export { getRequest };
