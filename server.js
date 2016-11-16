// BASE SETUP
// =============================================================================

// call the packages we need
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var app = express();
var morgan = require( 'morgan' );

// configure app
app.use( morgan( 'dev' ) ); // log requests to the console

// configure body parser
app.use( bodyParser.urlencoded( {
    extended: true
} ) );
app.use( bodyParser.json() );

var port = process.env.PORT || 3030; // set our port

var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/api' ); // connect to our database
var Shape = require( './api/models/shape' );
// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use( function ( req, res, next ) {

    // Website you wish to allow to connect
    res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:8080' );

    // Request methods you wish to allow
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );

    // Request headers you wish to allow
    res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type' );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader( 'Access-Control-Allow-Credentials', true );

    console.log( 'Something is happening.' );
    next();
} );

// test route to make sure everything is working (accessed at GET http://localhost:3030/api)
router.get( '/', function ( req, res ) {
    res.json( {
        message: 'hooray! welcome to our api!'
    } );
} );

// on routes that end in /shapes
// ----------------------------------------------------
router.route( '/shapes' )

// create a shape (accessed at POST http://localhost:3030/shapes)
.post( function ( req, res ) {

    var shape = new Shape(); // create a new instance of the Shape model

    shape.type = req.body.type;
    shape.size = req.body.size;
    shape.color = req.body.color;


    shape.save( function ( err, shape ) {
        if ( err )
            res.send( err );

        res.json( {
            data: shape,
            message: 'shape created!'
        } );
    } );


} )

// get all the shapes (accessed at GET http://localhost:3030/api/shapes)
.get( function ( req, res ) {
    Shape.find( function ( err, shapes ) {
        if ( err )
            res.send( err );

        res.json( shapes );
    } );
} );

// on routes that end in /shapes/:shape_id
// ----------------------------------------------------
router.route( '/shapes/:shape_id' )

// get the shape with that id
.get( function ( req, res ) {
    Shape.findById( req.params.shape_id, function ( err, shape ) {
        if ( err )
            res.send( err );
        res.json( shape );
    } );
} )

// update the shape with this id
.put( function ( req, res ) {
    Shape.findById( req.params.shape_id, function ( err, shape ) {

        if ( err )
            res.send( err );

        shape.name = req.body.name;
        shape.save( function ( err ) {
            if ( err )
                res.send( err );

            res.json( {
                message: 'Shape updated!'
            } );
        } );

    } );
} )

// delete the shape with this id
.delete( function ( req, res ) {
    Shape.remove( {
        _id: req.params.shape_id
    }, function ( err, shape ) {
        if ( err )
            res.send( err );

        res.json( {
            message: 'Successfully deleted'
        } );
    } );
} );


// REGISTER OUR ROUTES -------------------------------
app.use( '/api', router );

// START THE SERVER
// =============================================================================
app.listen( port );
console.log( 'Magic happens on port ' + port );
