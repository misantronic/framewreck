F.ext({
	/**
	 * Animates the context according to the animation rules
	 * @param {Array|String} a Animations
	 * @param {Function} c Callback
	 * @param [i] placeholder
	 * @returns {*}
	 * @see https://github.com/misantronic/framewreck#animate-module
	 * @example F('#id').animate(['X:100 Y:50', 'O:0.5', 'X:0 Y:0', 'O:1'], function() {
	 * 	console.log("all done");
	 * });
	 */
	animate: function(a, c, i) {
		var _ = this;

		// animation shorthands
		a = a == 'hide' ? ['O:0'] : a == 'show' ? ['O:1'] : a;

		_.A  = a;
		_.Ac = c;

		for(i = _.x[F.L]; i--;)
			_._a(F(_.x[i]), 0);

		return _
	},

	_a: function(e, i) {
		var _		= this,
			anims	= _.A[i].split(" "),
			trs 	= [], // transition
			trf		= [], // transform
			obj		= {},
			map 	= {
				W: "width",
				H: "height",
				O: "opacity"
			};

		for(var k=0; k < anims[F.L]; k++) {
			var anim 	= anims[k],
				type 	= anim[0],						// animation type
				prop 	= anim.substr(2).split(","),	// property
				val 	= prop[0],						// value
				dur 	= prop[1] || 0.5, 				// duration
				del 	= parseFloat(prop[2]) || 0,		// delay
				cur		= e.css(map[type]);  			// current property value

			// reset width and height
			if(type == 'W')
				e.css({width: cur});
			if(type == 'H')
				e.css({height: cur});

			// set object property + value
			map[type] ? obj[map[type]] = val : map[type] = 'transform';

			// set transition
			trs[k] = map[type] + ' '+dur +'s linear '+ del +'s';

			// set transform
			trf.push('translateX('+ (type == 'X' ? val : 0) +'px)');
			trf.push('translateY('+ (type == 'Y' ? val : 0) +'px)');
			trf.push('rotate('+ (type == 'R' ? val : 0) +'deg)');
			trf.push('scale('+ (type == 'S' ? val : 1) +')');
		}

		if(trs.length)
			obj.transition = trs.join(",");

		if(trf.length)
			obj.transform = trf.join(" ");

		function h() {
			e.off('transitionend', h);

			_.A[++i]?_._a(e, i):_.Ac&&_.Ac.call(_)
		}

		// trigger animation on next tick
		setTimeout(function() {
			e.on("transitionend", h).css(obj)
		}, 0);

	}
});
//F.vendor = (Array.prototype.slice.call(getComputedStyle(F.d.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];