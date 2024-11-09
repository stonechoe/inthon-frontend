import { authInstance } from './instance';

const REFRESH_TOKEN = 'refresh-token';
const USER_UUID = 'user-uuid';

export const getRefreshToken = () => {
  const value = localStorage.getItem(REFRESH_TOKEN);
  return value;
};

export const setRefreshToken = async (value: string, uuid: string) => {
  localStorage.setItem(REFRESH_TOKEN, value);
  localStorage.setItem(USER_UUID, uuid);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(USER_UUID);
};

export const setAccessToken = (token: string) => {
  authInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
