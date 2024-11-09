import { getRefreshToken } from './handleToken';
import { instance } from './instance';

interface TokenType {
  user_identifier: string;
  access_token: string;
  refresh_token: string;
}

export const postLogin = async (code : string ) => {
  const res = await instance.post('/auth', {
    kakao_auth_token: code
  });
  const data: TokenType = res.data;
  return data;
};

// export const postRefreshToken = async () => {
//   const refreshToken = getRefreshToken();
//   const res = await instance.post('/auth/refresh', undefined, {
//     headers: { Authorization: `Bearer ${refreshToken}` },
//   });
//   const data: TokenType = res.data;
//   return data;
// };
