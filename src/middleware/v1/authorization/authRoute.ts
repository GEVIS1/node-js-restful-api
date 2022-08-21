import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Extend the express Request interface to expect the jwt payload
 */
interface LoginRequest extends Request {
  user: string | jwt.JwtPayload;
}

/**
 * Authentication middleware expecting a bearer token
 * @argument req The request from the user agent
 * @argument res The response to be returned to the user agent
 * @argument next The middleware next function
 */
export default (req: LoginRequest, res: Response, next: NextFunction) => {
  try {
    /**
     * The authorization request header contains the information necessary to authenticate a
     * user agent against the server's protected endpoints.
     * In this case the information is a bearer token string formatted as "Bearer <token>".
     * The user agent is a middle man between you and the server. Examples would be Postman or a web browser.
     */
    const authHeader = req.headers.authorization;

    /**
     * A bearer token will look something like this - Bearer <JWT>. A
     * response containing a 403 forbidden status code and message
     * is returned if a bearer token is not provided.
     * One can argue whether this should be a 403 or a 401 error
     */
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(StatusCodes.FORBIDDEN).json({
        msg: 'No token provided',
      });
    }

    /**
     * Get the JWT from the bearer token
     */
    const [, token] = authHeader.split(' ');

    /**
     * Verify the signed JWT is valid. The first argument is the token,
     * i.e., JWT and the second argument is the secret or public/private key.
     */
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * Set Request's user property to the authenticaed user
     */
    req.user = payload;

    return next();
  } catch (err) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: 'Not authorized to access this route',
    });
  }
};
