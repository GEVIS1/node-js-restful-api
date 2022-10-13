import { NextFunction, Response, Request, Send } from 'express';
import NodeCache from 'node-cache';

const stdTTL = 300;
const checkperiod = 310;

const cache = new NodeCache({ stdTTL, checkperiod });

/**
 * Since express always expects a middleware to be of type (req: Request, res: Response, next: NextFunction) => any
 * and it throws an error if we try to give it an extended Response type we need to modify the Response interface
 * in the express-serve-static-core module.
 * @link https://stackoverflow.com/a/58201879
 */

declare module 'express-serve-static-core' {
  interface Response {
    originalSend: Send;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResBody = any;

const cacheRoute = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  /**
   * Key constructed from the request's url with the authorization header appended
   */
  const key = req.originalUrl + req.headers.authorization;

  /**
   * Cached response or undefined in the case of no cached entry
   */
  const cachedRes = cache.get(key);

  /**
   * If we are attempting to mutate data and we have cached data on this endpoint
   * delete the cached data.
   */
  if (req.method !== 'GET' && cachedRes) {
    cache.del(key);
    next();
  } else if (cachedRes) {
    /**
     * Else if we have cached data on this endpoint return it.
     */
    return res.json(cachedRes);
  } else {
    /**
     * Else we need to cache the data by storing the response body.
     * We do this by storing the res.json function in the res.originalSend property
     * and overriding res.json to use res.originalSend to send the response and then storing
     * the response body in the cache.
     */
    res.originalSend = res.json;
    // TODO: Find a prettier way to do this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res.json as any) = (body: ResBody) => {
      res.originalSend(body);
      cache.set(key, body);
    };
    next();
  }
};

export default cacheRoute;
