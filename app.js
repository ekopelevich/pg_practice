var Express = require('express'),
    app = Express(),
    api = require('./api'),
    bodyParser = require('body-parser');

app.use( bodyParser.urlencoded( {extended: false} ));

app.get('/puppies', function( req, res ) {
  //res.send('Do something.');
  api.puppies.read()
  .then(function ( results ) {
    res.json( results );
  });
});

app.get( '/puppies/:id', function( req, res ) {
  api.puppy.read( req.params.id )
  .then(function( results ) {
    res.json( results );
  });
});

app.post('/puppies', function(req, res) {
  api.puppies.create(req.body.name)
  .then(function(results){
    res.json(results);
  });
});

app.put('/puppies/:id', function(req, res) {
  api.puppies.update(req.params.id, req.body.name)
  .then(function( results ){
    res.json(results);
  });
});

app.delete('/puppies/:id', function(req, res) {
  api.puppies.delete( req.params.id )
  .then(function( results ){
    res.json( results );
  });
});

app.listen(8080, function() {
  console.log('Listining on port 8080');
});
