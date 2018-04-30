module.exports = function(server) {
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  //
  server.post('/api/register', function(req, res) {
    // grabs username and password from Body
    const credentials = req.body;
    // add user to database
    res.send({ api: 'up and running' });
  });
};
