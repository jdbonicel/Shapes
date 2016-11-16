var View = require( 'std/View' );
var $ = require( 'jquery' );
var Template = require( 'templates/partials/createShape.html' );

module.exports = View.extend( {

    constructor: function () {
        View.prototype.constructor.apply( this, arguments );
    },

    initialize: function () {
        View.prototype.initialize.apply( this, arguments );

        this.model.on( 'destroy', this.remove.bind( this ) );
    },

    template: function () {
        var options = {
            id: this.options.id,
            color: this.options.color,
            type: this.options.type,
            size: this.options.size
        };

        options[ this.options.type ] = true

        return _.template( Template( options ) );
    },

    render: function () {
        this.$el.append( this.template() );
    },

    remove: function ( shape ) {
        this.$( '#' + shape.get( '_id' ) ).remove();
    }
} );
