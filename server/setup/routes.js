// Libraries
const jwt = require('jsonwebtoken'); // https://www.npmjs.com/package/jsonwebtoken

const passport = require('passport'); // https://www.npmjs.com/package/passport
// Will use this to generate middleware
const LocalStrategy = require('passport-local'); // https://www.npmjs.com/package/passport-local

// User.js with userSchema, bcrypt hashing, and bycrypt password compare
const User = require('../users/User');

// token
function makeToken(user) {
  // return token
  // sub: subject (id)
  // Time stamp so we know when the document was created and when it will expire.
  const timestamp = new Date().getTime();
  const payload = {
    // sub: subject (id) who the token is about
    sub: user._id,
    username: user.username,
    // we don't want to send the password back!
    race: user.race,
    // "issued at time"
    iat: timestamp
  };
  const secret = 'no size limit on tokens';
  const options = { expiresIn: '4h' };
  // In here we are going to configure our Token, the way we want to sign it.
  // https://jwt.io/introduction/
  // https://www.npmjs.com/package/jsonwebtoken
  return jwt.sign(payload, secret, options);
}

// passport-local looks for username and password by default ^see docs
// `done` here is kind of like `next`
// this is all 'callback' syntax, versus `promise` syntax (then, catch) or `async`
const localStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    if (err) {
      done(err);
    }
    if (!user) {
      // If I don't find the user, I will assume that we were not able to validate
      // their credentials.
      // null-- as in 'no errors'
      done(null, false);
    }
    // If you successfully get into here, then password IS valid, thus the user CAN be authenticated
    user.verifyPassword(password, function(err, isValid) {
      if (err) {
        return done(err);
      }
      if (isValid) {
        const { _id, username, race } = user;
        return done(null, { _id, username, race }); // placed on req
      }
      return done(null, false);

    // use strategies
    passport.use(localStrategy);

    // From passport-local docs -- notice .use is combined while we split it up above, then pass into as a variable
    // passport.use(new LocalStrategy(
    //     function(username, password, done) {
    //       User.findOne({ username: username }, function (err, user) {
    //         if (err) { return done(err); }
    //         if (!user) { return done(null, false); }
    //         if (!user.verifyPassword(password)) { return done(null, false); }
    //         return done(null, user);
    //       });
    //     }
    //   ));
    });
  });
});

module.exports = function(server) {
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  server.post('/api/register', function(req, res) {
    // grabs username and password from Body
    const credentials = req.body;
    // add user to database
    const user = new User(credentials);
    user.save().then(inserted => {
      const token = makeToken(inserted);
      res.status(201).json({ token });
    });
  });

  server.post('/api/login', (req, res) => {
    // find user using the creds from the body
    // check the verify password with what we have stored
    // if condition passes, then issue token to user - which will enable them to access resources
  });
};
