import axios, { AxiosError } from "axios";
// import { postRefreshToken } from './auth';
import { getAccessToken } from "./handleToken";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

authInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

authInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (error.status !== 401) {
      return Promise.reject(error);
    }

    // try {
      // const config = error.config;
      // const newTokens = await postRefreshToken();

      // setRefreshToken(newTokens.refreshToken);
      // setAccessToken(newTokens.accessToken);

      // const response = await instance({
      //   ...config,
      //   headers: { Authorization: `Bearer ${newTokens.accessToken}` },
      // });
      return Promise.reject(error);
      // return await Promise.resolve(response);
    // } catch () {
      // const error = e as AxiosError;
      // if (error.status === 401) {
      //   window.location.href = '/login';
      // }
      // console.error(error);
    // }
  }
);
