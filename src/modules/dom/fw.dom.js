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
			e.multiple
				? F(e).find(':'+F.C).each(function(item){ A.push(item.val()) }) && a.push(A)
				: a.push(e[g]),
			v != []._ && (e[g] = v);
		return v && this || a.join("")
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
				v != []._ ? g[F.C] = v : a.push(g[F.C]);

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
			a[g[0].name] = g[0].type.match(/ch|rad/)?g[F.C]():g.val();

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

