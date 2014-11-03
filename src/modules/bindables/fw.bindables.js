F.ext({
	/**
	 * Registers the context as a bindable object
	 * @param {String} n name of the bindable
	 * @param {String} [v] the value of the bindable object
	 * @returns {F}
	 */
	registerBindable: function(n, v) {
		var _ = this, val, c = function() {
			val = _.val();
			F.bO[n] != val && _.setBindable(n, val)
		};

		if(F.bO[n] && v != []._)
			return _.setBindable(n, v);

		if(!_[F.L])
			return _.setBindable(n, v != []._ ? v : _.val());

		return _
			.attr('data-bindable', n)
			.on('change', c)
			.on('keydown', c)
			.on('keyup', c)
			.setBindable(n, v != []._ ? v : _.val())
	},

	/**
	 * Save bindable value and refresh all bindable dom elements
	 * @param {String} [n] name name of the bindable
	 * @param {String} [v] the value of the bindable object
	 * @param [s] placeholder
	 * @returns {F}
	 * @private
	 */
	setBindable: function(n, v, s) {
		if(n && v != []._) F.bO[n] = v;

		F('[data-bindable]').each(function(el) {
			s = el[0].selectionStart;
			el.val(F.bO[el.attr('data-bindable')]);
			if(F.d.activeElement == el[0])
				el[0].selectionStart = s,
				el[0].selectionEnd = s
		});

		return this
	},

	/**
	 * Get bindables value of first element matching
	 * @param n name of the bindable
	 * @returns {String}
	 */
	getBindable: function(n) {
		return F('[data-bindable="'+ n +'"]').get(0).val()
	}
});

/**
 * Bindable Objects
 * @type {{}}
 */
F.bO = {};