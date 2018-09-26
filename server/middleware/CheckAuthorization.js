import jwt from 'jsonwebtoken';
/* eslint-disable class-methods-use-this */
/**
 * Represent check autorization for users and admin
 */
class CheckAuthorization {
  /**
     * This function is a middleware that verify the user token
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages if error
     */
  verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      if (bearerToken) {
        jwt.verify(bearerToken, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            res.sendStatus(403);
          } else {
            req.verUserId = decoded.userId;
            req.verUserEmail = decoded.userEmail;
            req.verUserRole = decoded.userRole;
            next();
          }
        });
      }
    } else {
      return res.status(401).json({ status: 'Failed', error: 'Unauthorized' });
    }
  }

  /**
       * This function is a middleware that verify the admin token
       * @param {object} req - the request object.
       * @param {object} res - The response object.
       * @param {func} next - The response object.
       * @returns {object} Returns status code and error messages if error
       */
  verifyAdminToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      if (bearerToken) {
        jwt.verify(bearerToken, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            res.sendStatus(403);
          } else {
            if (decoded.userRole !== 'admin') {
              console.log(decoded);
              return res.status(401)
                .json({
                  status: 'Failed',
                  error: 'You need Admin Privilege to access this Endpoint'
                });
            }
            req.verUserId = decoded.userId;
            req.verUserEmail = decoded.userEmail;
            req.verUserRole = decoded.userRole;
            next();
          }
        });
      }
    } else {
      return res.status(401).json({ status: 'Failed', error: 'Unauthorized' });
    }
  }
}

export default CheckAuthorization;
