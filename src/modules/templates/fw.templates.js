F.ext({
	/**
	 *
	 * @param {Object} ctx Context object
	 * @param [r] placeholder
	 * @param [e] placeholder
	 * @param [E] placeholder
	 * @returns {F}
	 */
	parse: function(ctx, r, e, E) {
		r = "replace";
		e = /{{(#+)else}}[\s\S]*/;
		E = /[\s\S]*\{{(#+)else}}/;

		/**
		 * parse object
		 * @param {String} h HTML
		 * @param {Object} ctx Context object
		 * @param {Number} n number of the iteration
		 * @param [s] placeholder
		 * @param [t] placeholder
		 * @returns {String}
		 * @private
		 */
		function parseObject(h, ctx, n, s, t) {
			// look for each-tag
			return h[r](RegExp("{{#{"+n+"}each(?: *)(\\w+)(?: *)}}([\\s\\S]*?){{\\/{"+n+"}each}}", "g"), function(p, a, b) {
				s = "";
				if(ctx[a])
					// when each is found
					ctx[a].forEach(function(obj, i) {
						// replace vars
						s += b[r](parseTag(n), function(p, c) {
							// return string or object
							t = ctx[a][i].big ? ctx[a][i] : ctx[a][i][c];

							return escapeHTML(p, t)
						});

						// if statement
						s = s[r](parseIf(n), function(p, c, d, f) {
							try {
								f = eval("ctx."+a+"["+i+"]."+ c)
							} catch(e) {
								f = false
							}

							return d.match(e)
								? d[r](f ? e : E, '')
								: f ? d : ''
						});

						// check for another each
						if(s.match(RegExp("{{#{"+ (n+1) +"}each", "g")))
							s = parseObject(s, ctx[a][i], n+1)
					});

				return s
			});
		}

		/**
		 * escape {{{ }}} tags
		 * @param {String} a tag
		 * @param {String} b Value
		 * @returns {String}
		 * @private
		 */
		function escapeHTML(a, b) {
			return a.substr(0, 3) == '{{{' && a.slice(-3) == '}}}' ? new Option(b)[F.H] : b
		}

		/**
		 * RexExp for {{abc}}, {{#abc}}, {{##abc}} etc tags
		 * @param {Number} n Number of #
		 * @returns {RegExp}
		 * @private
		 */
		function parseTag(n) {
			return RegExp("{+\\{#{"+ n +"} *(?!else)(\\w+) *}}+", "g")
		}

		/**
		 * RegExp for {{#if}} ... {{/if}, {{##if}} ... {{//if}, etc
		 * @param n Number of #
		 * @returns {RegExp}
		 */
		function parseIf(n) {
			return RegExp("(?:{{#{"+n+"}if(?: *))(.*)(?: *)}}([\\s\\S]*?)(?:{{\\/{"+n+"}if}})", "g")
		}

		return F(
				// each
				parseObject(this.html(), ctx, 1)
				// vars at level 0
				[r](parseTag(0), function(p, $1) {
					return escapeHTML(p, ctx[$1])
				})
				// if's at level 0
				[r](parseIf(1), function(p, $1, $2) {
					return $2[r](ctx[$1] ? e : E, '')
				})
				// JS
				[r](/{%(.*)%}/g, function(p, $1) {
					return eval($1);
				})
				// remove whitespace
				.trim()
			)
	}
});