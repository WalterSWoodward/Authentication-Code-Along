const User = require('../users/User');

function makeToken(user) {
    // return token
    // sub: subject (id)
    // Time stamp so we know when the document was created and when it will expire.
    const timestamp = new Date().getTime();

    // In here we are going to configure our Token, the way we want to sign it.
    const jwt.sign({
        sub: user._id,
        username: user.username,
        // we don't want to send the password back!
    })
}

module.exports = function(server) {
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  //
  server.post('/api/register', function(req, res) {
    // grabs username and password from Body
    const credentials = req.body;
    // add user to database
    const user = new User(credentials);
    user.save().then(inserted => {
      const token = makeToken(inserted);
      res.status(201).json(inserted);
    });
  });
};
