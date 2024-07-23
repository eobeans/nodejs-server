import jwt from 'jsonwebtoken';
import * as configurationProvider from '@practica/configuration-provider';

export function signValidTokenWithDefaultUser() {
  return internalSignTokenSynchronously('joe', 'admin', Date.now() + 60 * 60);
}

export function signValidToken(user, role) {
  return internalSignTokenSynchronously(user, role, Date.now() + 60 * 60);
}

export function signExpiredToken(user, role) {
  return internalSignTokenSynchronously(user, role, 0);
}

function internalSignTokenSynchronously(user, roles, expirationInUnixTime) {
  const token = jwt.sign(
    {
      exp: expirationInUnixTime,
      data: {
        user,
        roles,
      },
    },
    configurationProvider.getValue('jwtTokenSecret')
  );

  return token;
}
