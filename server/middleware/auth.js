import jwt from 'jsonwebtoken';
import wrap from 'express-async-wrap';

import cnf from '../config';
import User from '../models/User';

/**
 * Get's JWT token from the Authorization header and processes it
 *  Authorization header format is according to RFC6750
 *   https://tools.ietf.org/html/rfc6750
 * @param  {object}   req
 * @param  {object}   res
 * @param  {Function} next
 */
export default wrap(
   async function authMiddleware(req, res, next) {
     if (req.headers.authorization) {
       const regexResult = /Bearer\s+(.*$)/.exec(req.headers.authorization);
       if (regexResult) {
         const [, token] = regexResult;
         let contents;
         try {
           contents = jwt.verify(token, cnf.JWT_PUBLIC_KEY);
         } catch (e) {
           // just in case jwt returns some non falsy value on error
           contents = null;
         }
         if (contents) {
           req.user = new User(contents);
           return next();
         }
       }
     }
     res.sendStatus(401);
   }
 );
