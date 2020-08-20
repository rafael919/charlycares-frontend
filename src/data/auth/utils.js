import { decode } from 'jsonwebtoken';
import compose from 'ramda/es/compose';

export const decodeToken = token => decode(token);

export const tokenHasValidIntegrity = decodedToken =>
  decodedToken !== null ? true : false;

export const getExpirationTime = decodedToken => {
  return tokenHasValidIntegrity(decodedToken) ? decodedToken.exp : null;
};

const isTokenExpired = exp => new Date() >= new Date(exp * 1000);

export const isTokenValid = token => {
  if (token === '' || token === null || token === undefined) {
    return false;
  }
  const decoded = decodeToken(token);
  if (tokenHasValidIntegrity(decoded)) {
    const isExpired = compose(isTokenExpired, getExpirationTime)(decoded);
    return isExpired ? false : true;
  } else {
    return false;
  }
};
