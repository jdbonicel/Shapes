var View = require( 'std/View' );
var $ = require( 'jquery' );
var Template = require( 'templates/partials/builder.html' );

var ShapeView = require( 'views/subViews/Shape' );

var Shapes = require( 'Collections/Shapes' );

module.exports = View.extend( {

    events: _.extend( {}, View.prototype.events, {
        'click .create': 'createShape',
        'click .clear': 'clearAllShapes'
    } ),

    constructor: function () {
        View.prototype.constructor.apply( this, arguments );
    },

    initialize: function () {
        View.prototype.initialize.apply( this, arguments );

        this.collection = new Shapes;

        this.collection.on( 'add', this.createShapeView.bind( this ) );

        this.collection.fetch();
    },

    template: function () {
        return _.template( Template() );
    },

    createShape: function ( e ) {

        this.collection.create( {
            type: this.$( 'select[name="type"]' ).val(),
            size: this.$( 'select[name="size"]' ).val(),
            color: '#' + this.$( 'input[name="color"]' ).val()
        }, {
            wait: true
        } );
    },

    createShapeView: function ( shape ) {
        new ShapeView( {
            model: shape,
            el: this.$( '.render-shapes' ),
            id: shape.get( '_id' ),
            type: shape.get( 'type' ),
            color: shape.get( 'color' ),
            size: shape.get( 'size' )
        } );
    },

    clearAllShapes: function () {
        var models = this.collection.remove( this.collection.models );
        _.each( models, function ( model ) {
            model.destroy();
        } );
    }
} );
