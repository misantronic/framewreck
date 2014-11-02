/**
 *
 * @param {String|HTMLElement} c context querySelect or HTML Element to become the context
 * @returns {F|*}
 * @constructor
 */
F = function (c) {
	var _ = this				// this context
		, x						// the context selected by querySelector
		, l						// length of x
		, i						// placeholder counter1
		, j						// placeholder counter2
		, a						// placeholder array
		, g						// placeholder generic
		, e						// placeholder
		, d;					// placeholder document

	// Global vars
	F.d = d = document;
	F.L = L = "length";
	F.Q = "querySelectorAll";
	F.H = "innerHTML";
	F.C	= "checked";
	e = "createElement";

	if (_.__proto__.constructor != F) return new F(c);

	/**
	 * Iterate over context, call v for each item
	 * Note: Iteration is inverse
	 * @param {Function} v
	 * @returns {F}
	 */
	_.each = function (v) {
		for (i = l; i--;) v(F(_[i]), i);
		return _
	};

	/**
	 * Reset keys inside F object and recount length
	 */
	_.y = function () {
		for (i = 99; i--;)x[i] ? _[i] = x[i] : delete _[i];	// clean up objects indicies and assign new indicies
		_[L] = l = x[L];								// set .length and internal placeholder l
		_.x = x;
		return _
	};

	/**
	 * Find selector v in context
	 * @param {String} v
	 * @returns {F}
	 */
	_.find = function (v) {
		if(v && !v.big){
			x=[v];
			return _.y()
		}

		try {
			a = v.split(" ");
			v = "";
			for (i in a)
				v += " " + (g = a[i].split(":"))[0] + (!isNaN(j = g[1]) ? ":nth-of-type(" + (+j + 1) + ")" : j ? ":" + j : "");

			if (!x)l = 1, x = [d];
			for (a = [], i = l; i--;)a[i] = x[i][F.Q](v);

			x = [];
			for (i = 0; i < a[L]; i++)
				if ((g = a[i])[L] && !g.options)
					for (j = 0; j < g[L]; j++)
						x.push(g[j]);
				else x.push(g);
			if (x.toString().match(/No/))x = [];
			return _.y()
		} catch (e) {
		}
	};

	/**
	 * Get element at index v from context
	 * @param {Number} v index
	 * @returns {F}
	 */
	_.get = function (v) {
		x = [x[v]];
		return _.y()
	};

	/**
	 * Get previous sibling element of first element in context
	 * @returns {F}
	 */
	_.prev = function() {
		x = [x[0].previousElementSibling];
		return _.y()
	};

	/**
	 * Get next sibling element of first element in context
	 * @returns {F}
	 */
	_.next = function() {
		x = [x[0].nextElementSibling];
		return _.y()
	};

	/**
	 * Get parent element of first element in context
	 * @returns {F}
	 */
	_.parent = function() {
		x = [x[0].parentElement];

		return _.y()
	};

	/**
	 * Load a number of scripts asynchronously
	 * @param {Array} a contains urls
	 * @param {Function} c callback
	 * @param [s] placeholder number script loaded
	 * @param [r] placeholder xhr-request
	 * @param [i] placeholder
	 */
	_.require = function (a, c, s, r, i) {
		s=0;i=a[F.L];
		for(;(r= d[e]('script')).src=a.shift(); d.head.appendChild(r))r.onload=function(){s++;c&&s==i&&c(_)}

		return _
	};

	if (c && c[0] == '<') {
		(g = d[e]('div'))[F.H] = c;
		x = g.childNodes;

		return _.y()
	}

	return _.find(c)
};

/**
 * Extend framewreck with a module
 * @param {Object} m Module
 */
F.ext = function (m) {
	for (i in m)
		F.prototype[i] = m[i]
};