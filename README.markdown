
A mouse emulation jQuery plugin, useful for unit testing.


##Basic Usage##

    // moves the mouse from the center of the target 10px right and 10px down.
    $( target ).emulate( 'mousemove' ).x( 10 ).y( 10 ).go();

    // click the mouse in the center of the target
    $( target ).emulate( 'click' ).go();

    // drag the element from its current position 100px to the right and call a callback
    //  when complete
    $( target ).emulate( 'drag' ).x( 100 ).go( function() {
        // do something here.
    } );
    
If only using as a jQuery plugin, the initial window.MouseEmulate can be removed to keep
  the global namespace from being polluted.
