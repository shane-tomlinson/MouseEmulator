
describe( "MouseEmulate", function() {
    "use strict";
    
    var emulate, moveCalledLeftSide, moveCalledRightSide, moveCalledBottomSide;
    var mousedownCalledLeftSide, mousedownCalledRightSide, mousedownCalledBottomSide;
    var mouseupCalledLeftSide, mouseupCalledRightSide, mouseupCalledBottomSide;
    
    $( '#leftSide' ).bind( 'mousemove', function( event ) {
        moveCalledLeftSide = true;
    } );
    $( '#leftSide' ).bind( 'mousedown', function( event ) {
        mousedownCalledLeftSide = true;
    } );
    $( '#leftSide' ).bind( 'mouseup', function( event ) {
        mouseupCalledLeftSide = true;
    } );
    
    $( '#rightSide' ).bind( 'mousemove', function( event ) {
        moveCalledRightSide = true;
    } );
    $( '#rightSide' ).bind( 'mousedown', function( event ) {
        mousedownCalledRightSide = true;
    } );
    $( '#rightSide' ).bind( 'mouseup', function( event ) {
        mouseupCalledRightSide = true;
    } );
    
    $( '#bottomSide' ).bind( 'mousemove', function( event ) {
        moveCalledBottomSide = true;
    } );
    $( '#bottomSide' ).bind( 'mousedown', function( event ) {
        mousedownCalledBottomSide = true;
    } );
    $( '#bottomSide' ).bind( 'mouseup', function( event ) {
        mouseupCalledBottomSide = true;
    } );
    
    
    beforeEach( function() {
        emulate = new MouseEmulate();
        emulate.init( {
            type: 'mousemove',
            target: $( '#leftSide' )
        } );
        
        moveCalledLeftSide = moveCalledRightSide = moveCalledBottomSide = false;
        mousedownCalledLeftSide = mousedownCalledRightSide = mousedownCalledBottomSide = false;
        mouseupCalledLeftSide = mouseupCalledRightSide = mouseupCalledBottomSide = false;
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
        
        expect( moveCalledLeftSide ).toBe( true );
        expect( moveCalledRightSide ).toBe( false );
        expect( moveCalledBottomSide ).toBe( false );
    } );
    
    it( 'should trigger some mouse movements on both left and right side', function() {
        
        runs( function() {
            emulate.x( 100 ).go();
        } );
        
        waits( 300 );
        
        runs( function() {
            expect( moveCalledLeftSide ).toBe( true );
            expect( moveCalledRightSide ).toBe( true );
            expect( moveCalledBottomSide ).toBe( false );
        } );
    } );

    it( 'should trigger some mouse movements on both left and right side even if ends off screen', function() {
        
        runs( function() {
            emulate.x( 1000 ).go();
        } );
        
        waits( 300 );
        
        runs( function() {
            expect( moveCalledLeftSide ).toBe( true );
            expect( moveCalledRightSide ).toBe( true );
            expect( moveCalledBottomSide ).toBe( false );
        } );
    } );

    it( 'should trigger some mouse movements on left side with small Y', function() {
        
        runs( function() {
            emulate.y( 10 ).go();
        } );
        
        waits( 300 );
        
        runs( function() {
            expect( moveCalledLeftSide ).toBe( true );
            expect( moveCalledRightSide ).toBe( false );
            expect( moveCalledBottomSide ).toBe( false );
        } );
    } );

    it( 'should trigger some mouse movements on both left side and bottom side with medium Y', function() {
        
        runs( function() {
            emulate.y( 100 ).go();
        } );
        
        waits( 300 );
        
        runs( function() {
            expect( moveCalledLeftSide ).toBe( true );
            expect( moveCalledRightSide ).toBe( false );
            expect( moveCalledBottomSide ).toBe( true );
        } );
    } );

    it( 'should trigger some mouse movements on all sides with medium X and Y', function() {
        
        runs( function() {
            emulate.x( 100 ).y( 100 ).go();
        } );
        
        waits( 300 );
        
        runs( function() {
            expect( moveCalledLeftSide ).toBe( true );
            expect( moveCalledRightSide ).toBe( true );
            expect( moveCalledBottomSide ).toBe( true );
        } );
    } );

    it( 'should trigger some mouse movements on all sides as well as mousedown and mouseup using '
        + 'drag with medium X and Y', function() {
        
        runs( function() {
            $( '#leftSide' ).emulate( 'drag' ).x( 100 ).y( 100 ).go();
        } );
        
        waits( 300 );
        
        runs( function() {
            expect( mousedownCalledLeftSide ).toBe( true );
            expect( mouseupCalledLeftSide ).toBe( false );
            expect( moveCalledLeftSide ).toBe( true );
            
            expect( moveCalledRightSide ).toBe( true );
            expect( mousedownCalledRightSide ).toBe( false );
            expect( mouseupCalledRightSide ).toBe( false );
            
            expect( moveCalledBottomSide ).toBe( true );
            expect( mousedownCalledBottomSide ).toBe( false );
            expect( mouseupCalledBottomSide ).toBe( true );
        } );
    } );
    
    it( 'calls a callback when complete', function() {
    
        var callbackCalled = false;
        
        runs( function() {
            $( '#leftSide' ).emulate( 'mousemove' ).x( 10 ).go( function() {
                callbackCalled = true;
            } );
        } );
        
        waits( 300 );
        
        runs( function() {
            expect( callbackCalled ).toBe( true );
        } );
    } );
    
    it( 'triggers a mouseover when starting', function() {
        var mouseOverCalled = false;
        $( '#leftSide' ).bind( 'mouseover', function( event ) {
            mouseOverCalled = true;
        } );
        
        runs( function() {
            $( '#leftSide' ).emulate( 'mousemove' ).x( 10 ).go();
        } );
        
        waits( 300 );
        
        runs( function() {
            expect( mouseOverCalled ).toBe( true );
        } );
    } );

} );