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

	_a: function(el, i, M) {
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

// === Sylvester ===
// Vector and Matrix mathematics modules for JavaScript
// Copyright (c) 2007 James Coglan
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
function Matrix() {}
Matrix.prototype = {

	// Returns element (i,j) of the matrix
	e: function(i,j) {
		if (i < 1 || i > this.elements.length || j < 1 || j > this.elements[0].length) { return null; }
		return this.elements[i-1][j-1];
	},

	// Returns column k of the matrix as a vector
	col: function(j) {
		if (j > this.elements[0].length) { return null; }
		var col = [], n = this.elements.length, k = n, i;
		do { i = k - n;
			col.push(this.elements[i][j-1]);
		} while (--n);
		return Vector.create(col);
	},

	// Maps the matrix to another matrix (of the same dimensions) according to the given function
	map: function(fn) {
		var els = [], ni = this.elements.length, ki = ni, i, nj, kj = this.elements[0].length, j;
		do { i = ki - ni;
			nj = kj;
			els[i] = [];
			do { j = kj - nj;
				els[i][j] = fn(this.elements[i][j], i + 1, j + 1);
			} while (--nj);
		} while (--ni);
		return Matrix.create(els);
	},

	// Returns true iff the matrix can multiply the argument from the left
	canMultiplyFromLeft: function(matrix) {
		var M = matrix.elements || matrix;
		if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
		// this.columns should equal matrix.rows
		return (this.elements[0].length == M.length);
	},

	// Returns the result of multiplying the matrix from the right by the argument.
	// If the argument is a scalar then just multiply all the elements. If the argument is
	// a vector, a vector is returned, which saves you having to remember calling
	// col(1) on the result.
	multiply: function(matrix) {
		if (!matrix.elements) {
			return this.map(function(x) { return x * matrix; });
		}
		var returnVector = matrix.modulus ? true : false;
		var M = matrix.elements || matrix;
		if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
		if (!this.canMultiplyFromLeft(M)) { return null; }
		var ni = this.elements.length, ki = ni, i, nj, kj = M[0].length, j;
		var cols = this.elements[0].length, elements = [], sum, nc, c;
		do { i = ki - ni;
			elements[i] = [];
			nj = kj;
			do { j = kj - nj;
				sum = 0;
				nc = cols;
				do { c = cols - nc;
					sum += this.elements[i][c] * M[c][j];
				} while (--nc);
				elements[i][j] = sum;
			} while (--nj);
		} while (--ni);
		var M = Matrix.create(elements);
		return returnVector ? M.col(1) : M;
	},

	x: function(matrix) { return this.multiply(matrix); },

	// Set the matrix's elements from an array. If the argument passed
	// is a vector, the resulting matrix will be a single column.
	setElements: function(els) {
		var i, elements = els.elements || els;
		if (typeof(elements[0][0]) != 'undefined') {
			var ni = elements.length, ki = ni, nj, kj, j;
			this.elements = [];
			do { i = ki - ni;
				nj = elements[i].length; kj = nj;
				this.elements[i] = [];
				do { j = kj - nj;
					this.elements[i][j] = elements[i][j];
				} while (--nj);
			} while(--ni);
			return this;
		}
		var n = elements.length, k = n;
		this.elements = [];
		do { i = k - n;
			this.elements.push([elements[i]]);
		} while (--n);
		return this;
	}
};

// Constructor function
Matrix.create = function(elements) {
	var M = new Matrix();
	return M.setElements(elements);
};

// Utility functions
var $M = Matrix.create;