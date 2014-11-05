F.ext({
	/**
	 *
	 * @param {Object} ctx Context object
	 * @param [r] placeholder
	 * @param [e1] placeholder
	 * @param [e2] placeholder
	 * @returns {F}
	 */
	parse: function(ctx, r, e1, e2) {
		r = "replace";
		e1 = /{{(#+)else}}[\s\S]*/;
		e2 = /[\s\S]*\{{(#+)else}}/;

		/**
		 * parse object
		 * @param {String} html HTML
		 * @param {Object} ctx Context object
		 * @param {Number} n number of the iteration
		 * @param [s] placeholder
		 * @param [a] placeholder
		 * @returns {String}
		 * @private
		 */
		function parseObject(html, ctx, n, s, a) {
			// look for each-tag
			return html[r](RegExp("{{#{"+n+"}each(?: *)(\\w+)(?: *)}}([\\s\\S]*?){{\\/{"+n+"}each}}", "g"), function(p1, prop1, partial) {
				s = "";
				if(ctx[prop1])
					// when each is found
					ctx[prop1].forEach(function(obj, i) {
						// replace vars
						s += partial[r](parseTag(n), function(p2, prop2) {
							// return string or object
							a = ctx[prop1][i].big ? ctx[prop1][i] : ctx[prop1][i][prop2];

							return escapeHTML(p2, a)
						});

						// if statement
						s = s[r](parseIf(n), function(p2, prop3, partial) {
							return partial.match(e1)
								? partial.replace(ctx[prop1][i][prop3]
									? e1 : e2, '')
								: ctx[prop1][i][prop3]
									? partial : ''
						});

						// check for another each
						if(s.match(RegExp("{{#{"+ (n+1) +"}each", "g")))
							s = parseObject(s, ctx[prop1][i], n+1)
					});

				return s
			});
		}

		/**
		 * escape {{{ }}} tags
		 * @param {String} tag tag
		 * @param {String} value Value
		 * @returns {String}
		 * @private
		 */
		function escapeHTML(tag, value) {
			return tag.substr(0, 3) == '{{{' && tag.slice(-3) == '}}}' ? new Option(value)[F.H] : value
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
			return RegExp("(?:{{#{"+n+"}if(?: *))(\\w+)(?: *)}}([\\s\\S]*?)(?:{{\\/{"+n+"}if}})", "g")
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
					return $2.replace(ctx[$1] ? e1 : e2, '')
				})
				// remove whitespace
				.trim()
			)
	}
});