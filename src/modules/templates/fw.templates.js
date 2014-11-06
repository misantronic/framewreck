F.ext({
	/**
	 *
	 * @param {Object} ctx Context object
	 * @param [a] placeholder
	 * @param [b] placeholder
	 * @param [c] placeholder
	 * @returns {F}
	 */
	parse: function(ctx, a, b, c) {
		a = "replace";
		b = /{{(#+)else}}[\s\S]*/;
		c = /[\s\S]*\{{(#+)else}}/;

		/**
		 * parse object
		 * @param {String} d HTML
		 * @param {Object} e Context object
		 * @param {Number} f number of the iteration
		 * @param [g] placeholder
		 * @param [h] placeholder
		 * @returns {String}
		 * @private
		 */
		function pO(d, e, f, g, h) {
			// look for each-tag
			return d[h](RegExp("{{#{"+f+"}each(?: *)(\\w+)(?: *)}}([\\s\\S]*?){{\\/{"+f+"}each}}", "g"), function(p1, prop1, partial) {
				g = "";
				if(e[prop1])
					// when each is found
					e[prop1].forEach(function(obj, i) {
						// replace vars
						g += partial[h](pT(f), function(p2, prop2) {
							// return string or object
							h = e[prop1][i].big ? e[prop1][i] : e[prop1][i][prop2];

							return _e(p2, h)
						});

						// if statement
						g = g[h](pI(f), function(p2, prop3, partial, bool) {
							try {
								bool = eval("ctx."+prop1+"["+i+"]."+ prop3)
							} catch(e) {
								bool = false
							}

							return partial.match(b)
								? partial.replace(bool ? b : c, '')
								: bool ? partial : ''
						});

						// check for another each
						if(g.match(RegExp("{{#{"+ (f+1) +"}each", "g")))
							g = pO(g, e[prop1][i], f+1)
					});

				return g
			});
		}

		/**
		 * escape {{{ }}} tags
		 * @param {String} d tag
		 * @param {String} e Value
		 * @returns {String}
		 * @private
		 */
		function _e(d, e) {
			return d.substr(0, 3) == '{{{' && d.slice(-3) == '}}}' ? new Option(e)[F.H] : e
		}

		/**
		 * RexExp for {{abc}}, {{#abc}}, {{##abc}} etc tags
		 * @param {Number} d Number of #
		 * @returns {RegExp}
		 * @private
		 */
		function pT(d) {
			return RegExp("{+\\{#{"+ d +"} *(?!else)(\\w+) *}}+", "g")
		}

		/**
		 * RegExp for {{#if}} ... {{/if}, {{##if}} ... {{//if}, etc
		 * @param d Number of #
		 * @returns {RegExp}
		 */
		function pI(d) {
			return RegExp("(?:{{#{"+d+"}if(?: *))(.*)(?: *)}}([\\s\\S]*?)(?:{{\\/{"+d+"}if}})", "g")
		}

		return F(
				// each
				pO(this.html(), ctx, 1)
				// vars at level 0
				[a](pT(0), function(p, $1) {
					return _e(p, ctx[$1])
				})
				// if's at level 0
				[a](pI(1), function(p, $1, $2) {
					return $2.replace(ctx[$1] ? b : c, '')
				})
				// JS
				[a](/{%(.*)%}/g, function(p, $1) {
					return eval($1);
				})
				// remove whitespace
				.trim()
			)
	}
});