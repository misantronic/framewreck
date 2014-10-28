F.ext({
	/**
	 * Animates the context according to the animation rules
	 * @param {Array} a Animations
	 * @param {Function} c Callback
	 * @returns {*}
	 * @see https://github.com/misantronic/framewreck#animate-module
	 * @example F('#id').animate(['X:100 Y:50', 'O:0.5', 'X:0 Y:0', 'O:1'], function() {
	 * 	console.log("all done");
	 * });
	 */
	animate: function(a, c) {
		var _ = this;

		_.A = a;
		_.Ac = c;

		for(var i = _.x[F.L]; i--;) {
			this._a(F(_.x[i]), 0);
		}

		return this
	},

	_a: function(el, i) {
		var _		= this;
		var anims	= _.A[i].split(" ");
		var trs 	= []; // transition
		var trf		= []; // transform
		var o		= {};

		for(var k=0; k < anims.length; k++) {
			var anim 	= anims[k];
			var type 	= anim[0];
			var prop 	= anim.substr(2).split(",");
			var val 	= prop[0];

			var dur 	= prop[1] || 0.5; // duration
			var del 	= parseFloat(prop[2]) || 0; // delay

			if(type == 'O') {
				trs[k] = 'opacity '+ dur +'s linear '+ del +'s';
				o.opacity = val;
			}

			if(type == 'X') {
				trs[k] = 'transform '+ dur +'s linear '+ del +'s';
				trf.push('translateX('+ val +'px)');
			} else {
				trf.push('translateX(0px)');
			}

			if(type == 'Y') {
				trs[k] = 'transform '+ dur +'s linear '+ del +'s';
				trf.push('translateY('+ val +'px)');
			} else {
				trf.push('translateY(0px)');
			}

			if(type == 'R') {
				trs[k] = 'transform '+ dur +'s linear '+ del +'s';
				trf.push('rotate('+ val +'deg)');
			} else {
				trf.push('rotate(0deg)');
			}

			if(type == 'S') {
				trs[k] = 'transform '+ dur +'s linear '+ del +'s';
				trf.push('scale('+ val +')');
			} else {
				trf.push('scale(1)');
			}
		}

		if(trs.length)
			o.transition = trs.join(",");

		if(trf.length)
			o.transform = trf.join(" ");

		function handler() {
			el.off('transitionend', handler);

			if(_.A[++i]) {
				_._a(el, i);
			} else {
				_.Ac&&_.Ac.call(_);
			}
		}

		el
			.css(o)
			.on('transitionend', handler);
	}
});
//F.vendor = (Array.prototype.slice.call(getComputedStyle(F.d.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];