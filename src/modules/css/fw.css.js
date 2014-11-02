F.ext({
	/**
	 * Apply CSS to context
	 * @param {String|Object} o object containg CSS-Attributes
	 * or a string containg the property name
	 * or a string to return the contexts first element CSS-attribute
	 * @param {String} [v] value for the property
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 * @param [j] placeholder
	 * @returns {String|F}
	 */
	css: function (o, v, x, i, j) {
		x = this.x;
		if (o && o.big && v == []._) return getComputedStyle(x[0], null).getPropertyValue(o);
		for (i = x[F.L]; i--;)
			if(v != []._)
				x[i].style[o] = v;
			else
				for (j in o) x[i].style[j] = o[j] + (!isNaN(o[j]) && j != 'opacity' ? 'px' : '');

		return this
	}
});

