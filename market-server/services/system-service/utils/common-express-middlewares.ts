/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { IncomingMessage, ServerResponse } from 'http';
import { context } from './global-context';
import { randomUUID } from 'node:crypto';
import * as configurationProvider from './configuration-provider';
export type JWTOptions = {
  secret: string;
};

export const jwtVerifierMiddleware = (options: JWTOptions) => {
  // 🔒 TODO - Once your project is off a POC stage, change your JWT flow to async using JWKS
  // Read more here: https://www.npmjs.com/package/jwks-rsa
  const middleware = (req:any, res:any, next:any) => {
    const authenticationHeader =
      req.headers.authorization || req.headers.Authorization;

    if (!authenticationHeader) {
      return res.sendStatus(401);
    }

    let token: string;

    // A token comes in one of two forms: 'token' or 'Bearer token'
    const authHeaderParts = authenticationHeader.split(' ');
    if (authHeaderParts.length > 2) {
      // It should have 1 or 2 parts (separated by space), the incoming string has unknown structure
      return res.sendStatus(401);
    }
    if (authHeaderParts.length === 2) {
      [, token] = authHeaderParts;
    } else {
      token = authenticationHeader;
    }

    jwt.verify(
      token,
      options.secret,
      // TODO: we should remove this any according to the library, jwtContent can not contain data property
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any | null, jwtContent: any) => {
        // TODO use logger to report the error here

        if (err) {
          return res.sendStatus(401);
        }

        req.user = jwtContent.data;

        next();
      }
    );
  };
  return middleware;
};

/**
 * This is an express middleware that:
 * - Generate/Use request id (depending on if you already have one in the request header)
 * - Add it to the request context
 *
 * **Important:** this should be your first middleware
 */

const REQUEST_ID_HEADER = 'x-request-id';

export function addRequestId(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) {
  let requestId = req.headers[REQUEST_ID_HEADER];

  if (!requestId) {
    requestId = randomUUID();
    req.headers[REQUEST_ID_HEADER] = requestId;
  }

  res.setHeader(REQUEST_ID_HEADER, requestId);

  const currentContext = context().getStore();

  if (currentContext) {
    // Append to the current context
    currentContext.requestId = requestId;
    next();
    return;
  }

  context().run({ requestId }, next);
}

export function signValidTokenWithDefaultUser() {
  return internalSignTokenSynchronously('joe', 'admin', Date.now() + 60 * 60);
}

export function signValidToken(user:any, role:any) {
  return internalSignTokenSynchronously(user, role, Date.now() + 60 * 60);
}

export function signExpiredToken(user:any, role:any) {
  return internalSignTokenSynchronously(user, role, 0);
}

function internalSignTokenSynchronously(user:any, roles:any, expirationInUnixTime:any) {
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
