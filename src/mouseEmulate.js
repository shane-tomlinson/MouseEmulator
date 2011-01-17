window.MouseEmulate = ( function() {
    "use strict";
    
    var STEP_SIZE = 25;
    var INTERVAL = 25;
    
    var Emulate = function() {
    };
    Emulate.prototype = {
        constructor: Emulate,
        
        init: function( config ) {
            this.type = config.type;
            var target = this.target = $( config.target );
            
            this.currX = target.offset().left + target.outerWidth() / 2;
            this.currY = target.offset().top + target.outerHeight() / 2;
            
            this.xDiff = this.yDiff = 0;
            
            return this;
        },
        
        remove: function() {
            if( this.placeholder ) {
                this.placeholder.remove();
            }
            
            return this;
        },
        
        x: function( amount ) {
            this.xDiff = amount;
            
            return this;
        },
        
        y: function( amount ) {
            this.yDiff = amount;
            
            return this;
        },
        
        go: function( onComplete ) {
            this.placeholder = $( '<div class="mouseMovementPlaceholder">Placholder</div>' ).appendTo( $( 'body' ) );
                    
            var type = this.type == 'drag' ? 'mousemove' : this.type;
            
            if( this.type ) {
                this.fireEvent( 'mouseover' );
                
                this.fireEvent( 'mousedown', {
                    which: 1
                } );
            }
            
            this.fireEvent( type );
            
            if( ( type == 'mousemove' ) && ( this.xDiff > 0 || this.yDiff > 0 ) ) {
                this.moveMouse();
            }
            
            this.onComplete = onComplete;
            
            return this;
        },
        
        moveMouse: function() {
            var me=this;
            setTimeout( function() {
                if( me.xDiff > 0 ) {
                    var xStep = Math.min( me.xDiff, STEP_SIZE );

                    me.currX += xStep;
                    me.xDiff -= xStep;
                }
                
                if( me.yDiff > 0 ) {
                    var yStep = Math.min( me.yDiff, STEP_SIZE );
                    
                    me.currY += yStep;
                    me.yDiff -= yStep;
                }

                var event = me.fireEvent( 'mousemove' );
                
                me.placeholder.css( {
                    left: me.currX,
                    top: me.currY
                } );
                
                if( me.xDiff > 0 || me.yDiff > 0 ) {
                    me.moveMouse();
                }
                else {
                    me.finish();
                }
            }, INTERVAL );
        },

        fireEvent: function( type, options ) {
            var event = this.createEvent( type );
            $.extend( event, options || {} );
            
            target = this.getCurrentTarget();
            target.trigger( event );
        },
        
        
        createEvent: function( type ) {
            var event = new $.Event( type );
            
            event.clientX = this.currX;
            event.clientY = this.currY;
            event.pageX = this.currX;
            event.pageY = this.currY;
            
            return event;
        },
        
        getCurrentTarget: function() {
            this.placeholder.hide();
            var target = $( document.elementFromPoint( this.currX, this.currY ) );
            this.placeholder.show();
            
            return target;
        },
        
        finish: function() {
            if( this.type == 'drag' ) {
                this.fireEvent( 'mouseup' );
            }
            this.xDiff = this.yDiff = 0;
            
            if( this.onComplete ) {
                this.onComplete( this );
            }
            
            this.remove();
        }
    };
    
    
    // $( target ).emulate( 'drag' ).x(10).go();
    // $( target ).emulate( 'mousemove' ).x(10).go();
    
    
    /**
    * a jQuery plugin to emulate mouse events
    * @method $.fn.emulate
    */
    $.fn.emulate = function( type ) {
        var config = {
            type: type,
            target: $( this )[ 0 ]
        };
        
        var emulator = new Emulate();
        emulator.init( config );
        
        return emulator;
    };
    
    return Emulate;
    
}() );