const { validationResult } = require('express-validator');
const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants'); 
const db = require('../db'); 


exports.validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: 'Validation failed. Please check the input data.',
    });
  }

  next();
};

// Extract JWT from cookies
const cookieExtractor = (req) => req?.cookies?.token || null;

const opts = {
  secretOrKey: SECRET, 
  jwtFromRequest: cookieExtractor, 
};

// Passport JWT Strategy
passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      if (!id) {
        return done(null, false, { message: 'Missing user ID in JWT payload' });
      }

      const { rows } = await db.query(
        'SELECT id, email FROM users WHERE id = $1',
        [id]
      );

      if (rows.length === 0) {
        return done(null, false, { message: 'User not found' });
      }

      const user = { id: rows[0].id, email: rows[0].email };

      return done(null, user);
    } catch (error) {
      console.error(`Error during JWT authentication: ${error.message}`);
      return done(null, false, { message: 'Internal server error' });
    }
  })
);

exports.userAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, next);
};