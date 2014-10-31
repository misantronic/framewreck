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
				cur		= el.css(map[type]),  			// current property value
				mD 		= el.data('matrixData'),
				mA		= [0, 0, 1];

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

		if(mD && mD.T) {
			if(trf.tx == []._)
				trf.tx = mD.T.e(1, 3);

			if(trf.ty == []._)
				trf.ty = mD.T.e(2, 3);
		}

		var rad = parseFloat(trf.deg || 0) * (Math.PI/180),
			cos = Math.cos(rad),
			sin = Math.sin(rad),
			// translation
			tM = $M([ [1, 0, trf.tx], [0, 1, trf.ty], mA ]),
			// rotation
			rM = trf.deg == []._ && mD ? mD.R : $M([ [cos, -sin, 0], [sin, cos, 0], mA ]),
			// scale
			sM = trf.scale == []._ && mD ? mD.S : $M([ [trf.scale, 0,  0], [0,  trf.scale, 0], mA ]),
			// multiply matrices
			m = tM.x(rM).x(sM);

		el.data('matrixData', { T: tM, R: rM, S: sM });

		obj.transform = 'matrix('+ m.e(1, 1) +', '+ m.e(2, 1) +', '+ m.e(1, 2) +', '+ m.e(2, 2) +', '+ m.e(1, 3) +', '+ m.e(2, 3) +')';
		obj.transition 	= trs.join(",");

		//console.log("matrix", m);

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

	// Maps the matrix to another matrix (of the same dimensions) according to the given function
	map: function(fn) {
		var _ = this, els = [], ni = _.E[F.L], ki = ni, i, nj, kj = _.E[0][F.L], j;
		do { i = ki - ni;
			nj = kj;
			els[i] = [];
			do { j = kj - nj;
				els[i][j] = fn(_.E[i][j], i + 1, j + 1);
			} while (--nj);
		} while (--ni);
		return $M(els)
	},

	// Returns the result of multiplying the matrix from the right by the argument.
	// If the argument is a scalar then just multiply all the elements. If the argument is
	// a vector, a vector is returned, which saves you having to remember calling
	// col(1) on the result.
	x: function(matrix) {
		var _ = this;
		if (!matrix.E) {
			return _.map(function(x) { return x * matrix; });
		}
		var M = matrix.E || matrix;
		if (M[0][0] == []._) M = $M(M).E;
		if (!_.E[0][F.L] == M[F.L]) return null;
		var ni = _.E[F.L], ki = ni, i, nj, kj = M[0][F.L], j, cols = _.E[0][F.L], elements = [], sum, nc, c;
		do { i = ki - ni;
			elements[i] = [];
			nj = kj;
			do { j = kj - nj;
				sum = 0;
				nc = cols;
				do { c = cols - nc;
					sum += _.E[i][c] * M[c][j];
				} while (--nc);
				elements[i][j] = sum;
			} while (--nj);
		} while (--ni);
		return $M(elements)
	}
};

$M = function(els) {
	var M = new F.M(), i, elements = els.E || els;
	if (elements[0][0] != []._) {
		var ni = elements[F.L], ki = ni, nj, kj, j;
		M.E = [];
		do { i = ki - ni;
			nj = elements[i][F.L]; kj = nj;
			M.E[i] = [];
			do { j = kj - nj;
				M.E[i][j] = elements[i][j];
			} while (--nj);
		} while(--ni);
		return M;
	}
	var n = elements[F.L], k = n;
	M.E = [];
	do { i = k - n;
		M.E.push([elements[i]]);
	} while (--n);

	return M
};