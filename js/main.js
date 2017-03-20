(function () {
	'use strict';
	/*! https://mths.be/repeat v0.2.0 by @mathias */
	if ( !String.prototype.repeat ) {
		(function () {
			'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
			var defineProperty = (function () {
				// IE 8 only supports `Object.defineProperty` on DOM elements
				try {
					var object          = {};
					var $defineProperty = Object.defineProperty;
					var result          = $defineProperty( object, object, object ) && $defineProperty;
				} catch ( error ) {}
				return result;
			}());
			var repeat         = function ( count ) {
				if ( this == null ) {
					throw TypeError();
				}
				var string = String( this );
				// `ToInteger`
				var n      = count ? Number( count ) : 0;
				if ( n != n ) { // better `isNaN`
					n = 0;
				}
				// Account for out-of-bounds indices
				if ( n < 0 || n == Infinity ) {
					throw RangeError();
				}
				var result = '';
				while ( n ) {
					if ( n % 2 == 1 ) {
						result += string;
					}
					if ( n > 1 ) {
						string += string;
					}
					n >>= 1;
				}
				return result;
			};
			if ( defineProperty ) {
				defineProperty( String.prototype, 'repeat', {
					'value': repeat,
					'configurable': true,
					'writable': true
				} );
			} else {
				String.prototype.repeat = repeat;
			}
		}());
	}
	
	class Countdown {
		static leftPadZero( t, digits = 2 ) {
			const pad = '0'.repeat( digits - 1 );
			
			return `${pad}${t}`.slice( -digits );
		}
		
		constructor( endDate, elSelector = Countdown.DEFAULTS.selector ) {
			this.countdownDate = endDate instanceof Date
				? endDate.getTime()
				: new Date( endDate ).getTime();
			
			this.element    = document.querySelector( elSelector );
			this.intervalId = null;
			this.countdown  = this.countdown.bind( this );
		}
		
		start( interval = Countdown.SECOND ) {
			this.intervalId = window.setInterval( this.countdown, interval );
			
			return this;
		}
		
		stop() {
			if ( this.intervalId !== null ) {
				window.clearInterval( this.intervalId );
			}
			
			return this;
		}
		
		countdown() {
			const t = this.getTime();
			
			if ( t.total > 0 ) {
				this.render( t )
			} else {
				this.stop().renderComplete();
			}
			
			return this;
		}
		
		getTime() {
			// Get today's date and time
			const now = new Date().getTime();
			
			// Find the distance between now an the count down date in ms
			const total = this.countdownDate - now;
			
			const d  = Math.floor( total / Countdown.DAY );
			const h  = Math.floor( (total % Countdown.DAY) / Countdown.HOUR );
			const m  = Math.floor( (total % Countdown.HOUR) / Countdown.MINUTE );
			const s  = Math.floor( (total % Countdown.MINUTE) / Countdown.SECOND );
			const ms = Math.floor( total % Countdown.SECOND );
			
			return { d, h, m, s, ms, total };
		}
		
		render( t ) {
			// format fn
			const f    = Countdown.leftPadZero;
			const html = `${t.d}d ${f( t.h )}h ${f( t.m )}m ${f( t.s )}s ${f( t.ms, 3 )}ms`;
			
			this.element.innerHTML = html;
			
			return this;
		}
		
		renderComplete() {
			this.element.innerHTML = Countdown.DEFAULTS.doneText;
			
			return this;
		}
	}
	
	Countdown.SECOND   = 1000;
	Countdown.MINUTE   = 60 * Countdown.SECOND;
	Countdown.HOUR     = 60 * Countdown.MINUTE;
	Countdown.DAY      = 24 * Countdown.HOUR;
	Countdown.DEFAULTS = {
		selector: '#countdown-display',
		doneText: "EXPIRED",
	};
	
	const countdownDate = "May 1, 2017 12:00:00 GMT-0700";
	
	window.countdown = new Countdown( countdownDate );
	
	countdown.start( 1 );
}());
