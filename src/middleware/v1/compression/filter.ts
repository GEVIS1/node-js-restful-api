import { Request } from 'express';

/**
 * Add any paths to routes where compression is undesired
 */
const noCompression = ['/api/v1/optimization/without'];

/**
 * Filter function that returns false if req.path is in the noCompression list.
 * @param {Request} req Request object
 * @returns {Boolean} whether req.path is in the noCompression list.
 */
const compressionFilter = (req: Request): boolean =>
  !noCompression.includes(req.originalUrl);

export default compressionFilter;
