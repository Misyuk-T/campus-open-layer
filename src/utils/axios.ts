import Axios, { AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const instance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  responseType: 'json',
  timeout: 60000
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error?.response?.status === 500) {
      return Promise.reject(
        new Error('Something went wrong. Please try again.')
      );
    }

    return Promise.reject(error);
  }
);

export const post = (
  meth: string,
  data = {},
  options = {}
): Promise<AxiosResponse> => instance.post(meth, data, options);

export const get = <T>(meth: string, params = {}): Promise<AxiosResponse<T>> =>
  instance.get<T>(meth, { params });
