F.ext({
	/**
	 *
	 * @param {Object} ctx Context object
	 * @param [r] placeholder
	 * @param [S] placeholder
	 * @returns {F}
	 */
	parse: function(ctx, r, S) {
		S = String.prototype;

		/**
		 * Parse object
		 * @param {Object} ctx Context object
		 * @param {Number} n number of the iteration
		 * @param [s] placeholder
		 * @param [i] placeholder
		 * @returns {String}
		 */
		S.parseObject = function(ctx, n, s, i) {
			// look for each-tag
			return this[r = "replace"](RegExp("{{#(?: *)(\\w+)(?: *)}}([\\s\\S]*?){{\\/(?: *)\\1(?: *)}}", "g"), function(p, a, b) {
				s = "";
				if(ctx[a])
					// when each is found
					for(i in ctx[a])
						// replace vars
						s += b.parseTag(n, "ctx['"+a+"']["+i+"]", ctx),

						// if statement
						s = s.parseIf(n, "ctx."+a+"["+i+"].", ctx),

							// check for another each
						s.match(RegExp("{{#(?: *)(\\w+)(?: *)}}([\\s\\S]*?){{\\/(?: *)\\1(?: *)}}", "g")) && (s = s.parseObject(ctx[a][i], n+1));

				return s
			});
		};

		/**
		 * Parse {{#if}} ... {{/if}, {{##if}} ... {{//if}, etc
		 * @param {Number} n Number of #
		 * @param {String} V eval base
		 * @param {Object} ctx context to look for vars in eval
		 * @param [m] placeholder
		 * @param [v] placeholder
		 * @param [e] placeholder
		 * @returns {RegExp}
		 */
		S.parseIf = function(n, V, ctx, m, v, e) {
			return this[r](RegExp("(?:{{#{"+n+"}if(?: *))(.*)(?: *)}}([\\s\\S]*?)(?:{{\\/{"+n+"}if}})", "g"), function(p, c, d, f) {
				// match ! or not statement
				m = c.match(/(^!|^not) */); v = V;
				if(m) c = c.replace(m[0], ""), v = '!'+v;

				try {
					f = eval(v+c)
				} catch(e) {
					f = 0
				}

				return d.match(e = /{{(#+)else}}[\s\S]*/)
					? d[r](f ? e : /[\s\S]*\{{(#+)else}}/, '')
					: f ? d : ''
			})
		};

		/**
		 * Parse tags like {{abc}}, {{#abc}}, {{##abc}} etc
		 * @param {Number} n Number of #
		 * @param {String} V eval base
		 * @param {Object} ctx context to look for vars in eval
		 * @returns {RegExp}
		 */
		S.parseTag = function(n, V, ctx) {
			return this[r](RegExp("{+\\{#{"+ n +"} *(?!else)([A-Za-z0-9_.]+) *}}+", "g"), function(p, $1, f) {
				try {
					f = eval(!V.big || ~$1.indexOf('.') ? V+"['"+$1.replace(/\./g, "']['")+"']" : V)
				} catch(e) {}

				// return string or object or tag itself, if the value is not a string
				f = f ? f.big ? f : typeof f[$1] != "string" ? p : f[$1] : '';

				// if set, escape {{{ }}} tags
				return p[2] == '{' ? new Option(f)[F.H] : f
			})
		};

		return F(
				this.html()
				// each
				.parseObject(ctx, 1)
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