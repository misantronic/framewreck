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
		function pO(h, ctx, n, s, t) {
			// look for each-tag
			return h[r](RegExp("{{#{"+n+"}each(?: *)(\\w+)(?: *)}}([\\s\\S]*?){{\\/{"+n+"}each}}", "g"), function(p, a, b) {
				s = "";
				if(ctx[a])
					// when each is found
					ctx[a].forEach(function(obj, i) {
						// replace vars
						s += b.parseTag(n, "ctx['"+a+"']["+i+"]", ctx);

						// if statement
						s = s.parseIf(n, "ctx."+a+"["+i+"].", ctx);

						// check for another each
						if(s.match(RegExp("{{#{"+ (n+1) +"}each", "g")))
							s = pO(s, ctx[a][i], n+1)
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
		function _e(a, b) {
			return a.substr(0, 3) == '{{{' && a.slice(-3) == '}}}' ? new Option(b)[F.H] : b
		}

		/**
		 * Parse {{#if}} ... {{/if}, {{##if}} ... {{//if}, etc
		 * @param n Number of #
		 * @param V eval base
		 * @param ctx context to look for vars in eval
		 * @param [m] placeholder
		 * @param [v] placeholder
		 * @returns {RegExp}
		 */
		String.prototype.parseIf = function(n, V, ctx, m, v) {
			return this[r](RegExp("(?:{{#{"+n+"}if(?: *))(.*)(?: *)}}([\\s\\S]*?)(?:{{\\/{"+n+"}if}})", "g"), function(p, c, d, f) {
				// match ! or not statement
				m = c.match(/(^!|^not) */), v = V;
				if(m) c = c.replace(m[0], ""), v = '!'+v;

				try {
					f = eval(v+c)
				} catch(e) {
					f = 0
				}

				return d.match(e)
					? d[r](f ? e : E, '')
					: f ? d : ''
			})
		};

		/**
		 * Parse tags like {{abc}}, {{#abc}}, {{##abc}} etc
		 * @param {Number} n Number of #
		 * @returns {RegExp}
		 */
		String.prototype.parseTag = function(n, V, ctx) {
			return this[r](RegExp("{+\\{#{"+ n +"} *(?!else)([A-Za-z0-9_.]+) *}}+", "g"), function(p, $1, f) {
				try {
					f = eval(!V.big || ~$1.indexOf('.') ? V+"['"+$1.replace(/\./g, "']['")+"']" : V)
				} catch(e) {}

				// return string or object
				if(f) f = f.big ? f : f[$1];

				return _e(p, f ? f : '')
			})
		};

		return F(
				// each
				pO(this.html(), ctx, 1)
				// vars at level 0
				.parseTag(0, "ctx", ctx)
				// if's at level 0
				.parseIf(1, "ctx.", ctx)
				// JS
				[r](/{%(.*)%}/g, function(p, $1) {
					return eval($1);
				})
				// remove whitespace
				.trim()
			)
	}
});