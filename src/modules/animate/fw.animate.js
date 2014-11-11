F.ext({
	/**
	 * Animates the context according to the animation rules
	 * @param {Array|String} a AnimationQueue
	 * @param {Function|String} [c] Callback or Easing
	 * @param {String} [e] Easing
	 * @returns {F}
	 * @see https://github.com/misantronic/framewreck#animate-module
	 * @example F('#id').animate(['X:100 Y:50', 'O:0.5', 'X:0 Y:0', 'O:1'], function() {
	 * 	console.log("all done");
	 * });
	 */
	animate: function(a, c, e) {
		var _ = this, i, t = 0;

		_.A  = a;
		_.Ac = c&&!c.big ? c : null;
		_.Ae = !_.Ac ? c : e;

		function d(el, i) {
			var anims	= _.A[i].split(" "),
				trs 	= [], // transition
				trf		= {}, // transform
				obj		= {},
				delay	= 0,
				map 	= {
					W	: "width",
					H	: "height",
					O	: "opacity",
					P	: "padding",
					PT	: "padding-top",
					PR	: "padding-right",
					PB	: "padding-bottom",
					PL	: "padding-left",
					M	: "margin",
					MT	: "margin-top",
					MR	: "margin-right",
					MB	: "margin-bottom",
					ML	: "margin-left"
				};

			for(var k=0; k < anims[F.L]; k++) {
				var anim 	= anims[k],
					line	= anim.split(":"),
					type 	= line[0],						// animation type
					prop 	= line[1].split(","),			// property
					val 	= prop[0],						// value
					dur 	= prop[1] || .5, 				// duration
					del 	= parseFloat(prop[2]) || 0,		// delay
					cur		= el.css(map[type]),  			// current property value
					mD 		= el.data('matrixData'),
					mA		= [0, 0, 1];

				delay = Math.max(dur, delay);

				// set object property + value
				map[type] ? obj[map[type]] = val : map[type] = 'transform';

				// set transition
				trs[k] = map[type] + ' '+ dur +'s '+ (_.Ae || 'linear') +' '+ del +'s';

				type == 'W' ? el.css({width: cur}) : type == 'H' ? el.css({height: cur}) : type == 'X' ? trf.x = val : type == 'Y' ? trf.y = val : type == 'R' ? trf.d = val : type == 'S' && (trf.s = val);
			}

			if(mD && mD.T) {
				if(trf.x == []._)
					trf.x = mD.T.e(1, 3);

				if(trf.y == []._)
					trf.y = mD.T.e(2, 3);
			}

			if(trf.x == []._) trf.x = 0;
			if(trf.y == []._) trf.y = 0;
			if(trf.s == []._) trf.s = 1;

			var rad = parseFloat(trf.d || 0) * (Math.PI/180),
				cos = Math.cos(rad),
				sin = Math.sin(rad),
			// translation
				tM = $M([ [1, 0, trf.x], [0, 1, trf.y], mA ]),
			// rotation
				rM = trf.d == []._ && mD ? mD.R : $M([ [cos, -sin, 0], [sin, cos, 0], mA ]),
			// scale
				sM = trf.s == []._ && mD ? mD.S : $M([ [trf.s, 0,  0], [0,  trf.s, 0], mA ]),
			// multiply matrices
				m = tM.x(rM).x(sM);

			el.data('matrixData', { T: tM, R: rM, S: sM });

			obj.transform = 'matrix('+ m.e(1, 1) +', '+ m.e(2, 1) +', '+ m.e(1, 2) +', '+ m.e(2, 2) +', '+ m.e(1, 3) +', '+ m.e(2, 3) +')';
			obj.transition 	= trs.join(",");

			// trigger animation on next tick
			setTimeout(function() {
				el.css(obj);
				clearTimeout(t);
				t = setTimeout(function() {
					_.A[++i]?d(el, i):_.Ac&&_.Ac.call(_)
				}, delay*1e3)
			}, 0)
		}

		for(i = _.x[F.L]; i--;)
			d(F(_.x[i]), 0);

		return _
	},

	/**
	 * animated or non-animated hiding of context
	 * @param {String} [d] duration to fade out in seconds
	 * @param {Function} [c] callback
	 * @param [_] placeholder
	 * @returns {F}
	 */
	hide: function(d, c, _) {
		_ = this;
		return !d ? _.css({display: 'none'}) : _.animate( [ 'O:0,' + d ], function() {
			_.css({display: 'none'});
			c&&c.call(_)
		})
	},

	/**
	 * animated or non-animated showing of context
	 * @param {String} [d] duration to fade in in seconds
	 * @param {Function} [c] callback
	 * @param [_] placeholder
	 * @param [i] placeholder
	 * @returns {F}
	 */
	show: function(d, c, _, i) {
		_ = this;
		if(!d) _.css({opacity: 1, display: 'block'});
		for(i = _.x[F.L]; i--;)
			F(_[i]).css('display') == 'none' && F(_[i]).css({opacity: 0, display: 'block'}),
				setTimeout(function(e) {
					e.animate( [ 'O:1,' + d ], function() {
						c&&c.call(_)
					});
				}, 0, F(_[i]));
		return _
	}
});
//F.vendor = (Array.prototype.slice.call(getComputedStyle(F.d.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];

// === Sylvester ===
// Vector and Matrix mathematics modules for JavaScript
// Copyright (c) 2007 James Coglan
// Modifications: Redundant methods removed and script minifiying by @misantronic
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.
F.M = function() {};
F.M.prototype = {

	// Returns element (i,j) of the matrix
	e: function(i,j) {
		return this.E[i-1][j-1]
	},

	// Returns the result of multiplying the matrix from the right by the argument.
	// If the argument is a scalar then just multiply all the elements. If the argument is
	// a vector, a vector is returned, which saves you having to remember calling
	// col(1) on the result.
	x: function(matrix) {
		var _ = this, ni, ki, sum, nc, c, elements = [], i, nj, kj, j, cols, M;
		if (!matrix.E) {
			var els = [];
			ni = _.E[F.L];
			ki = ni;
			kj = _.E[0][F.L];
			do { i = ki - ni;
				nj = kj;
				els[i] = [];
				do { j = kj - nj;
					els[i][j] = fn(_.E[i][j], i + 1, j + 1);
				} while (--nj)
			} while (--ni);
			return $M(els)(function(x) { return x * matrix; })
		}
		M = matrix.E || matrix;
		if (M[0][0] == []._) M = $M(M).E;
		if (!_.E[0][F.L] == M[F.L]) return null;
		ni = _.E[F.L]; ki = ni; kj = M[0][F.L]; cols = _.E[0][F.L];
		do { i = ki - ni;
			elements[i] = [];
			nj = kj;
			do { j = kj - nj;
				sum = 0;
				nc = cols;
				do { c = cols - nc;
					sum += _.E[i][c] * M[c][j]
				} while (--nc);
				elements[i][j] = sum
			} while (--nj);
		} while (--ni);
		return $M(elements)
	}
};

$M = function(els) {
	var M = new F.M(), i, elements = els.E || els, ni = elements[F.L], ki = ni, nj, kj, j, n, k;
	if (elements[0][0] != []._) {
		M.E = [];
		do { i = ki - ni;
			nj = elements[i][F.L]; kj = nj;
			M.E[i] = [];
			do { j = kj - nj;
				M.E[i][j] = elements[i][j]
			} while (--nj)
		} while(--ni);
		return M
	}
	n = elements[F.L]; k = n;
	M.E = [];
	do { i = k - n;
		M.E.push([elements[i]])
	} while (--n);

	return M
};