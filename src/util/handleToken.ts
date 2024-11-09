'use client';

import { useEffect } from 'react';
import { authInstance } from './instance';
import { useState } from 'react';

const ACCESS_TOKEN = 'access-token';
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
  localStorage.setItem(ACCESS_TOKEN, token);
  authInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  authInstance.defaults.headers.common['Authorization'] = null;
};

export const useIslogin = () => {
  const [isLogin, setIsLogin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return isLogin;
}