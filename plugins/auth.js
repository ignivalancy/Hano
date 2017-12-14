/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the auth plugin.
------------------------------------------------------------------------------------------------- */

import config from 'config';
import authJwt from 'hapi-auth-jwt2';
import { authorization } from '../utilities/rest';

const { jwtAlgo, jwtKey } = config.get('app');

const Auth = {
  register: (server, options, next) => {
    server.register(authJwt, err => {
      // something bad happened loading the plugin.
      if (err) {
        throw err;
      }

      server.auth.strategy('jwt', 'jwt', {
        key: jwtKey,
        validateFunc: authorization,
        verifyOptions: { algorithms: [jwtAlgo] },
        errorFunc: err => ({ errorType: err.errorType, message: err.message })
      });

      server.auth.default('jwt');

      return next();
    });
  }
};

Auth.register.attributes = {
  name: 'Auth'
};

export default Auth;