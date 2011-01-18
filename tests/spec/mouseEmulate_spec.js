
describe( "MouseEmulate", function() {
    "use strict";
    
    var emulate, eventsCalled;
    var WAIT_DELAY = 500;
    
    [ 'mousemove', 'mouseout', 'mouseover', 'mousedown', 'mouseup' ].forEach( 
        function( eventName, index ) {
            $( '#leftSide' ).bind( eventName, eventHandler );
            $( '#rightSide' ).bind( eventName, eventHandler );
            $( '#bottomSide' ).bind( eventName, eventHandler );
        } );
    
    function eventHandler( event ) {
        var elementID = $( event.currentTarget ).attr( 'id' );
        eventsCalled[ elementID ][ event.type ] = true;
        console.log( elementID + ': ' + event.type + '(' + event.pageX + ',' + event.pageY + ')' );
    };
    
    function resetEvents() {
        eventsCalled = {
            leftSide: {},
            rightSide: {},
            bottomSide: {}
        };
    }
    beforeEach( function() {
        emulate = new MouseEmulate();
        emulate.init( {
            type: 'mousemove',
            target: $( '#leftSide' )
        } );
        resetEvents();
    } );
    
    afterEach( function() {
        emulate.remove();
    } );
    
    it( 'should be creatable', function() {
        expect( emulate instanceof window.MouseEmulate ).toBe( true );
    } );
    
    
    it( 'should have a jQuery plugin', function() {
        expect( typeof $.fn.emulate ).toBe( 'function' );
        
        var emulate = $( '#leftSide' ).emulate( 'drag' );
        
        expect( emulate instanceof window.MouseEmulate ).toBe( true );
    } );
    
    it( 'should trigger some mouse movements on leftSide', function() {
        emulate.x( 10 ).go();
        
        expect( eventsCalled.leftSide.mousemove ).toBe( true );
        expect( eventsCalled.rightSide.mousemove ).toBeUndefined();
        expect( eventsCalled.bottomSide.mousemove ).toBeUndefined();
    } );
    
    it( 'should trigger some mouse movements on both left and right side', function() {
        
        runs( function() {
            emulate.x( 100 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.leftSide.mousemove ).toBe( true );
            expect( eventsCalled.rightSide.mousemove ).toBe( true );
            expect( eventsCalled.bottomSide.mousemove ).toBeUndefined();
        } );
    } );

    it( 'should trigger some mouse movements on both left and right side even if ends off screen', function() {
        
        runs( function() {
            emulate.x( 1000 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.leftSide.mousemove ).toBe( true );
            expect( eventsCalled.rightSide.mousemove ).toBe( true );
            expect( eventsCalled.bottomSide.mousemove ).toBeUndefined();
        } );
    } );

    it( 'should trigger some mouse movements on left side with small Y', function() {
        
        runs( function() {
            emulate.y( 10 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.leftSide.mousemove ).toBe( true );
            expect( eventsCalled.rightSide.mousemove ).toBeUndefined();
            expect( eventsCalled.bottomSide.mousemove ).toBeUndefined();
        } );
    } );

    it( 'should trigger some mouse movements on both left side and bottom side with medium Y', function() {
        
        runs( function() {
            emulate.y( 100 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.leftSide.mousemove ).toBe( true );
            expect( eventsCalled.rightSide.mousemove ).toBeUndefined();
            expect( eventsCalled.bottomSide.mousemove ).toBe( true );
        } );
    } );

    it( 'should trigger some mouse movements on all sides with medium X and Y', function() {
        
        runs( function() {
            emulate.x( 100 ).y( 100 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.leftSide.mousemove ).toBe( true );
            expect( eventsCalled.rightSide.mousemove ).toBe( true );
            expect( eventsCalled.bottomSide.mousemove ).toBe( true );
        } );
    } );

    it( 'should trigger some mouse movements on all sides as well as mousedown and mouseup using '
        + 'drag with medium X and Y', function() {
        
        runs( function() {
            $( '#leftSide' ).emulate( 'drag' ).x( 100 ).y( 100 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.leftSide.mousedown ).toBe( true );
            expect( eventsCalled.leftSide.mouseup ).toBeUndefined();
            expect( eventsCalled.leftSide.mousemove ).toBe( true );
            
            expect( eventsCalled.rightSide.mousemove ).toBe( true );
            expect( eventsCalled.rightSide.mousedown ).toBeUndefined();
            expect( eventsCalled.rightSide.mouseup ).toBeUndefined();
            
            expect( eventsCalled.bottomSide.mousemove ).toBe( true );
            expect( eventsCalled.bottomSide.mousedown ).toBeUndefined();
            expect( eventsCalled.bottomSide.mouseup ).toBe( true );
        } );
    } );
    
    it( 'calls a callback when complete', function() {
    
        var callbackCalled = false;
        
        runs( function() {
            $( '#leftSide' ).emulate( 'mousemove' ).x( 10 ).go( function() {
                callbackCalled = true;
            } );
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( callbackCalled ).toBe( true );
        } );
    } );
    
    it( 'triggers a mouseover when starting', function() {
        runs( function() {
            $( '#leftSide' ).emulate( 'mousemove' ).x( 10 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.leftSide.mouseover ).toBe( true );
        } );
    } );
    
    it( 'should move to the left', function() {
        var mouseMoveCalled = false;
        $( 'body' ).bind( 'mousemove', function( event ) {
            mouseMoveCalled = true;
        } );
        
        runs( function() {
            $( '#rightSide' ).emulate( 'mousemove' ).x( -100 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( mouseMoveCalled ).toBe( true );
        } );
    } );

    it( 'should move to the up', function() {

        runs( function() {
            $( '#bottomSide' ).emulate( 'mousemove' ).y( -150 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.rightSide.mousemove ).toBe( true );
        } );
    } );

    it( 'on move, should trigger mouseout and mouseover', function() {
        
        runs( function() {
            $( '#leftSide' ).emulate( 'mousemove' ).x( 100 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.leftSide.mouseout ).toBe( true );
            expect( eventsCalled.rightSide.mouseover ).toBe( true );
        } );
    } );
    
    it( 'mouseout from last container in last run, mouseover to first container in new run', function() {
        runs( function() {
            $( '#leftSide' ).emulate( 'mousemove' ).x( 100 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
        
            resetEvents();
            $( '#leftSide' ).emulate( 'mousemove' ).x( 1 ).go();
        } );
        
        waits( WAIT_DELAY );
        
        runs( function() {
            expect( eventsCalled.rightSide.mouseout ).toBe( true );
            expect( eventsCalled.rightSide.mouseover ).toBeUndefined();
            
            expect( eventsCalled.leftSide.mouseover ).toBe( true );
            expect( eventsCalled.leftSide.mouseout ).toBeUndefined();
        } );
    } );
} );