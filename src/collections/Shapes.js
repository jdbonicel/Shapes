var Collection = require( 'std/Collection' );
var Shape = require( 'models/Shape' );


var ROOT = 'http://localhost:3030/api';

module.exports = Collection.extend( {
    model: Shape,
    url: ROOT + '/shapes'
} );
