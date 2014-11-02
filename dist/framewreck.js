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
	 * Get previous sibling element from first element in context
	 * @returns {F}
	 */
	_.prev = function() {
		x = [x[0].previousElementSibling];
		return _.y()
	};

	/**
	 * Get next sibling element from first element in context
	 * @returns {F}
	 */
	_.next = function() {
		x = [x[0].nextElementSibling];
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
};F.ext({
	/**
	 * Asynchronously AJAX Call
	 * @param v method - get/post
	 * @param D url
	 * @param [C] callback if passed -> asych call
	 * @param [P] post_data
	 * @param X placeholder
	 */
	ajax: function (v, D, C, P, X) {
		with (X = new XMLHttpRequest)
			return onreadystatechange = function () {
				readyState ^ 4 || C(this)
			}, open(v, D, 1), send(P), X
	}
});

F.ext({
	/**
	 * Apply CSS to context
	 * @param {String|Object} v object containg CSS-Attributes
	 * or a string to return the contexts first element CSS-attribute
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 * @param [j] placeholder
	 * @returns {String|F}
	 */
	css: function (v, x, i, j) {
		x = this.x;
		if (v && v.big)return getComputedStyle(x[0], null).getPropertyValue(v);
		for (i = x[F.L]; i--;)
			for (j in v)x[i].style[j] = v[j] + (!isNaN(v[j]) && j != 'opacity' ? 'px' : '');

		return this
	}
});

F.ext({
	/**
	 * Set data for context
	 * or return its data
	 * Note: for multiple context elements only
	 * the first elements data will be returned
	 * @param k key
	 * @param [v] value
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 */
	data: function (k, v, x, i) {
		x = this.x;
		for (i = x[F.L]; i--;)
			if (v)
				!x[i].D&&(x[i].D = {}),
				x[i].D[k] = v;

		return v ? this : x[0].D ? x[0].D[k] : null
	}
});

F.ext({
	/**
	 * Set or return html content of context
	 * or set or return the value of an input
	 * or select field
	 * @param {*} [v] value
	 * @param [x] placeholder for context
	 * @returns {F|string}
	 */
	html: function (v, x) {
		x = this.x;
		var a = [], e, g;
		for (var A = [], i = 0; i < x[F.L]; i++)
			e = x[i],
			g = F.H,
			e.tagName.match(/INP|SEL|TEX/) && (g = "value"),
			e.multiple ? F(e).find('option:checked').each(function(item){ A.push(item.val()) }) && a.push(A) : a.push(e[g]),
			v != []._ && (e[g] = v);
		return v && this || a.join("").replace(/\s/g, "")
	},

	/**
	 * Move selector around in the context
	 * or insert HTML/Text
	 * Note: selector v will always appended
	 * to the first element in context
	 * @param {String} v selector or HTML/Text
	 * @param [x] placeholder for context
	 */
	append: function (v, x) {
		x = this.x;
		var g = v[0]=='<' ? 0 : F.d[F.Q](v)[0];
		for (var i = x[F.L]; i--;)
			g ? g.appendChild(x[i]) : x[i][F.H] += v;

		return this
	},

	/**
	 * Remove context
	 * @param [x] placeholder for context
	 * @returns {*}
	 */
	remove: function (x) {
		x = this.x;
		for (var i = x[F.L]; i--;)
			x[i].parentNode.removeChild(x[i]);

		return this
	},

	/**
	 * Checks one or a set of checkboxes/radio buttons
	 * or return if checked
	 * If set length == 1: return Boolean
	 * If set length > 1: return Array with boolean for each set
	 * @param {Boolean} [v] change checkbox state
	 * @param [x] placeholder for context
	 * @param [a] placeholder
	 * @param [g] placeholder
	 * @param [i] placeholder
	 * @returns {F|Array|Boolean}
	 */
	checked: function (v, x, a, g, i) {
		x = this.x;
		a = [];
		for (i = x[F.L]; i--;)
			if ((g = x[i]).type.match(/ch|rad/))
				v != []._ ? g.checked = v : a.push(g.checked);

		return !a[F.L] ? this : a[F.L] ^ 1 ? a : a[0]
	},

	/**
	 * Serializes all form-fields in context
	 * @param [a] placeholder
	 * @param [i] placeholder
	 * @param [g] placeholder
	 * @param [x] placeholder
	 * @returns {{}}
	 */
	serialize: function(a, i, g, x) {
		x = this.x;
		a = {};
		this.find('input,select,textarea');
		for(i = this[F.L]; i--;)
			g=F(this[i]),
			a[g[0].name] = g[0].type.match(/ch|rad/)?g.checked():g.val();

		return a
	},

	/**
	 * Get attribute of first element in context
	 * or set attribute for all context elements
	 * @param {String} k
	 * @param {String} [v]
	 * @param [x] placeholder
	 * @returns {F|String}
	 */
	attr: function(k, v, x) {
		x = this.x;
		for (i = x[F.L]; i--;)
			v&&x[i].setAttribute(k, v);

		return v?this:x[0].getAttribute(k)
	},

	/**
	 * Add a class to context's classList
	 * @param c classname
	 * @param [i] placeholder
	 * @param [x] placeholder
	 */
	addClass: function(c, i, x) {
		x = this.x;
		for (i = x[F.L]; i--;)
			x[i].classList.add(c);

		return this
	},

	/**
	 * Remove a class to context's classList
	 * @param c classname
	 * @param [i] placeholder
	 * @param [x] placeholder
	 */
	removeClass: function(c, i, x) {
		x = this.x;
		for (i = x[F.L]; i--;)
			x[i].classList.remove(c);

		return this
	}
});

// method aliases
F.ext({
	val: F.prototype.html,
	appendTo: F.prototype.append
});

F.ext({
	/**
	 * Attach event listener
	 * @param {String} v eventname
	 * @param {Function} D callback
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 * @returns {F}
	 */
	on: function (v, D, x, i) {
		x = this.x;
		for (i = x[F.L]; i--;)
			x[i].addEventListener(v, D);

		return this
	},

	/**
	 * Remove event listener
	 * @param {String} v eventname
	 * @param {Function} D callback
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 * @returns {F}
	 */
	off: function (v, D, x, i) {
		x = this.x;
		for (i = x[F.L]; i--;)
			x[i].removeEventListener(v, D);

		return this
	},

	/**
	 * Fire event listener
	 * @param {String} v eventname
	 * @param {*} [D] data
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 * @returns {F}
	 */
	fire: function (v, D, x, i) {
		x = this.x;
		for (i = x[F.L]; i--;)
			x[i].dispatchEvent(new CustomEvent(v, {detail: D}));

		return this
	}
});

