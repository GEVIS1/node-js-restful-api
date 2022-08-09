import { NextFunction, Response, Request, Send } from 'express';
import NodeCache from 'node-cache';

const stdTTL = 300;
const checkperiod = 310;

const cache = new NodeCache({ stdTTL, checkperiod });

/**
 * For correctness' sake let's use the ResBody type, even though it's just an
 * any type under the guise of a name.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResBody = any;

interface CacheRouteResponse extends Response {
  originalSend: Send;
  json: (body: ResBody) => ResBody | void;
}

const cacheRoute = (
  req: Request,
  res: CacheRouteResponse,
  next: NextFunction
) => {
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
    return next();
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
    res.json = (body) => {
      res.originalSend(body);
      cache.set(key, body);
    };
    return next();
  }
};

export default cacheRoute;
