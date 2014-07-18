( function () {
    "use strict";

    var singleton = {};

    function sanitize( input ) {
        return input == null ? "" : input.toString();
    }

    //------------------------------------------------------------------------------
    // CONVERSATION
    //------------------------------------------------------------------------------

    singleton.conversationToPublic = function ( item ) {
        if ( item == null )
            item = {};

        return {
            id: sanitize( item._id ),
            title: sanitize( item.title ),
            userId: sanitize( item.userId ),
            userPictureUrl: sanitize( item.userPictureUrl ),
            active: sanitize( item.active ) == "true" ? true : false,
            users: singleton.userToPublicArray( item.users ),
        };
    };

    singleton.conversationFromPublic = function ( item ) {
        if ( item == null )
            item = {};

        return {
            _id: sanitize( item.id ),
            title: sanitize( item.title ),
            userId: sanitize( item.userId ),
            userPictureUrl: sanitize( item.userPictureUrl ),
            active: sanitize( item.active ) == "true" ? true : false,
            users: singleton.userFromPublicArray( item.users ),
        };
    };

    singleton.conversationToPublicArray = function ( input ) {
        var result = [];
        for ( var i = 0; i < input.length; i++ ) {
            var item = input[i];
            var cleaned = singleton.conversationToPublic( item );
            result.push( cleaned );
        }
        return result;
    };

    singleton.conversationFromPublicArray = function ( input ) {
        var result = [];
        for ( var i = 0; i < input.length; i++ ) {
            var item = input[i];
            var cleaned = singleton.conversationFromPublic( item );
            result.push( cleaned );
        }
        return result;
    };

    //------------------------------------------------------------------------------
    // MESSAGE
    //------------------------------------------------------------------------------

    singleton.messageToPublic = function ( item ) {
        if ( item == null )
            item = {};

        return {
            id: sanitize( item._id ),
            conversationId: sanitize( item.conversationId ),
            body: sanitize( item.body ),
            userId: sanitize( item.userId ),
            userPictureUrl: sanitize( item.userPictureUrl ),
        };
    };

    singleton.messageFromPublic = function ( item ) {
        if ( item == null )
            item = {};

        return {
            _id: sanitize( item.id ),
            conversationId: sanitize( item.conversationId ),
            body: sanitize( item.body ),
            userId: sanitize( item.userId ),
            userPictureUrl: sanitize( item.userPictureUrl ),
        };
    };

    singleton.messageToPublicArray = function ( input ) {
        var result = [];
        for ( var i = 0; i < input.length; i++ ) {
            var item = input[i];
            var cleaned = singleton.messageToPublic( item );
            result.push( cleaned );
        }
        return result;
    };

    singleton.messageFromPublicArray = function ( input ) {
        var result = [];
        for ( var i = 0; i < input.length; i++ ) {
            var item = input[i];
            var cleaned = singleton.messageFromPublic( item );
            result.push( cleaned );
        }
        return result;
    };

    //------------------------------------------------------------------------------
    // USER
    //------------------------------------------------------------------------------

    singleton.userToPublic = function ( item ) {
        if ( item == null )
            item = {};

        return {
            id: sanitize( item._id ),
            email: sanitize( item.email ),
        };
    };

    singleton.userFromPublic = function ( item ) {
        if ( item == null )
            item = {};

        return {
            _id: sanitize( item.id ),
            email: sanitize( item.email ),
        };
    };

    singleton.userToPublicArray = function ( input ) {

        if ( input == null )
            input = [];

        var result = [];
        for ( var i = 0; i < input.length; i++ ) {
            var item = input[i];
            var cleaned = singleton.userToPublic( item );
            result.push( cleaned );
        }

        return result;
    };

    singleton.userFromPublicArray = function ( input ) {
        
        if ( input == null )
            input = [];

        var result = [];
        for ( var i = 0; i < input.length; i++ ) {
            var item = input[i];
            var cleaned = singleton.userFromPublic( item );
            result.push( cleaned );
        }
        
        return result;
    };


    module.exports = singleton;

} () );