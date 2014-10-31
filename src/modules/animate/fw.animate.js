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

	_a: function(el, i) {
		var _		= this,
			anims	= _.A[i].split(" "),
			trs 	= [], // transition
			trf		= {}, // transform
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
				cur		= el.css(map[type]);  			// current property value

			// reset width and height
			if(type == 'W')
				el.css({width: cur});
			if(type == 'H')
				el.css({height: cur});

			// set object property + value
			map[type] ? obj[map[type]] = val : map[type] = 'transform';

			// set transition
			trs[k] = map[type] + ' '+dur +'s linear '+ del +'s';

			if(type == 'X') trf.tx = val;
			if(type == 'Y') trf.ty = val;
			if(type == 'R') trf.deg = val;
			if(type == 'S') trf.scale = val;
		}

		var mD = el.data();

		if(mD && mD.T) {
			if(trf.tx == []._)
				trf.tx = mD.T.e(1, 3);

			if(trf.ty == []._)
				trf.ty = mD.T.e(2, 3);
		}

		var rad = parseFloat(trf.deg || 0) * (Math.PI/180),
			cos = Math.cos(rad),
			sin = Math.sin(rad);

		// translation
		var tM = $M([ [1, 0, trf.tx], [0, 1, trf.ty], [0, 0, 1] ]);

		// rotation
		var rM = trf.deg == []._ && mD ? mD.R : $M([ [cos, -sin, 0], [sin, cos, 0], [0, 0, 1] ]);

		// scale
		var sM = trf.scale == []._ && mD ? mD.S : $M([ [trf.scale, 0,  0], [0,  trf.scale, 0], [0,  0,  1] ]);

		el.data({ T: tM, R: rM, S: sM });

		var m = tM.x(rM).x(sM);

		obj.transform = 'matrix('+ m.e(1, 1) +', '+ m.e(2, 1) +', '+ m.e(1, 2) +', '+ m.e(2, 2) +', '+ m.e(1, 3) +', '+ m.e(2, 3) +')';

		//console.log("matrix", m);

		obj.transition 	= trs.join(",");

		function h() {
			el.off('transitionend', h);

			_.A[++i]?_._a(el, i):_.Ac&&_.Ac.call(_)
		}

		// trigger animation on next tick
		setTimeout(function() {
			el.on("transitionend", h).css(obj)
		}, 0);

	}
});
//F.vendor = (Array.prototype.slice.call(getComputedStyle(F.d.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];