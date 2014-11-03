F.ext({
	/**
	 * Registers the context as a bindable object
	 * @param {String} n name of the bindable
	 * @param {String} [v] the value of the bindable object
	 * @returns {F}
	 */
	registerBindable: function(n, v) {
		var _ = this, b, c = function() {
			var val = F(this).val();
			b != val && _.setBindable(n, val)
		};

		if(b = F.bO[n])
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
	 * @returns {F}
	 * @private
	 */
	setBindable: function(n, v) {
		if(n && v != []._) F.bO[n] = v;

		F('[data-bindable]').each(function(element) {
			try {
				element.val(F.bO[element.attr('data-bindable')]);
			} catch(e) {}
		});

		return this
	},

	/**
	 * Get bindables value
	 * @param n name of the bindable
	 * @returns {String}
	 */
	getBindable: function(n) {
		return F('[data-bindable="'+ n +'"]').val()
	}
});

/**
 * Bindable Objects
 * @type {{}}
 */
F.bO = {};