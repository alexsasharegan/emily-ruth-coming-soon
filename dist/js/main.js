'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	'use strict';

	var Countdown = function () {
		_createClass(Countdown, null, [{
			key: 'leftPadZero',
			value: function leftPadZero(t) {
				var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

				var pad = '';
				for (var i = digits - 1; i > 0; i--) {
					pad += '0';
				}return ('' + pad + t).slice(-digits);
			}
		}]);

		function Countdown(endDate) {
			var elSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Countdown.DEFAULTS.selector;

			_classCallCheck(this, Countdown);

			this.countdownDate = endDate instanceof Date ? endDate.getTime() : new Date(endDate).getTime();

			this.element = document.querySelector(elSelector);
			this.intervalId = null;
			this.countdown = this.countdown.bind(this);
		}

		_createClass(Countdown, [{
			key: 'start',
			value: function start() {
				var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Countdown.SECOND;
				var runAtStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				if (runAtStart) this.countdown();
				this.intervalId = window.setInterval(this.countdown, interval);

				return this;
			}
		}, {
			key: 'stop',
			value: function stop() {
				if (this.intervalId !== null) {
					window.clearInterval(this.intervalId);
				}

				return this;
			}
		}, {
			key: 'countdown',
			value: function countdown() {
				var t = this.getTime();

				if (t.total > 0) {
					this.render(t);
				} else {
					this.stop().renderComplete();
				}

				return this;
			}
		}, {
			key: 'getTime',
			value: function getTime() {
				// Get today's date and time
				var now = new Date().getTime();

				// Find the distance between now an the count down date in ms
				var total = this.countdownDate - now;

				var d = Math.floor(total / Countdown.DAY);
				var h = Math.floor(total % Countdown.DAY / Countdown.HOUR);
				var m = Math.floor(total % Countdown.HOUR / Countdown.MINUTE);
				var s = Math.floor(total % Countdown.MINUTE / Countdown.SECOND);
				var ms = Math.floor(total % Countdown.SECOND);

				return { d: d, h: h, m: m, s: s, ms: ms, total: total };
			}
		}, {
			key: 'render',
			value: function render(t) {
				// format fn
				var f = Countdown.leftPadZero;
				var times = [t.d + 'd', f(t.h) + 'h', f(t.m) + 'm', f(t.s) + 's'];

				this.element.innerHTML = times.join('&nbsp;&nbsp;');

				return this;
			}
		}, {
			key: 'renderComplete',
			value: function renderComplete() {
				this.element.innerHTML = Countdown.DEFAULTS.doneText;

				return this;
			}
		}]);

		return Countdown;
	}();

	Countdown.SECOND = 1000;
	Countdown.MINUTE = 60 * Countdown.SECOND;
	Countdown.HOUR = 60 * Countdown.MINUTE;
	Countdown.DAY = 24 * Countdown.HOUR;
	Countdown.DEFAULTS = {
		selector: '#countdown-display',
		doneText: "EXPIRED"
	};

	var countdownDate = "May 16, 2017 12:00:00 GMT-0700";

	window.countdown = new Countdown(countdownDate);

	countdown.start();
})();
//# sourceMappingURL=main.js.map