var Model = require( 'std/Model' );

var ROOT = 'http://localhost:3030/api';

module.exports = Model.extend( {

    idAttribute: '_id',

    defaults: {
        type: null,
        size: null,
        color: null
    },

    urlRoot: ROOT + '/shapes'

} );
