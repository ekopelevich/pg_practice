var pg = require('pg');

var connectionString = 'postgres://localhost/puppydb';

function runQuery( query, parameters ) {
  return new Promise( function( resolve, reject ) {
    pg.connect(connectionString, function( err, client, done ) {
        if ( err ) {
            console.error( err );
            reject( err );
            done();
            return;
        }
        client.query( query, parameters, function( err, results ){
            done();
            if (err) {
            console.error( err );
            done();
            return;
        }
        resolve(results);
        done();
      });
    });
  });
}

module.exports = {
  puppies: {
    read: function(){
      return runQuery( 'SELECT * FROM puppies' );
    }
  },
  puppy: {
    create: function(name){
      return runQuery('INSERT INTO puppies VALUES (default, $1)', [name]);
    },
    read: function(id){
      return runQuery('SELECT * FROM puppies WHERE puppies.id= $1;', [id]);
    },
    update: function(id, name){
      return runQuery('UPDATE puppies SET puppy = $2 WHERE id = $1;', [id, name]);
    },
    'delete': function(id){
      return runQuery('DELETE FROM puppies WHERE puppies.id= $1;', [id]);
    }
  }
};
