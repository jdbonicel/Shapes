// app/models/shapes.js

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var ShapesSchema = new Schema( {
    type: String,
    size: String,
    color: String
} );

module.exports = mongoose.model( 'shape', ShapesSchema );
