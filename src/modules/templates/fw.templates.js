F.ext({
	/**
	 *
	 * @param {Object} [ctx] Context object
	 * @param [r] placeholder
	 * @returns {F}
	 */
	template: function(ctx, r) {
		var S = String.prototype,
			// map for if statements
			M = [],
			i = 0,
			// replace ifs with map numbers
			t = this[0],
			s = (t.tagName == 'SCRIPT' ? t[F.H] : t.outerHTML)[r = "replace"](/(?:{{#if(?: *))(.*)(?: *)}}/g, function(p, a) {
				M[i] = a;
				return '{##'+(i++)+'##}'
			});

		for(i=M[F.L];i--;)
			s = s[r](RegExp('{##'+i+'##}([\\s\\S]*?){{\\/if}}', 'g'), "{##"+i+"##}$1{##/"+ i +"##}");

		/**
		 * Parse object
		 * @param {Object} ctx Context object
		 * @param [s] placeholder
		 * @param [x] placeholder
		 * @returns {String}
		 */
		S.FObj = function(ctx, s, x) {
			// look for each-tag
			return this[r](x=/{{(?: *)(\w+)(?: *)}}([\s\S]*?){{\/(?: *)\1(?: *)}}/g, function(p, a, b) {
				s = "";
				if(ctx[a])
					// when each is found
					for(i in ctx[a])
						// replace vars
						s += b.FTag("ctx['"+a+"']["+i+"]", ctx),

						// if statement
						s = s.FIf("ctx."+a+"["+i+"].", ctx),

							// check for another each
						s.match(x) && (s = s.FObj(ctx[a][i]));

				return s
			});
		};

		/**
		 * Parse {{#if}} ... {{/if}, {{##if}} ... {{//if}, etc
		 * @param {String} V eval base
		 * @param {Object} ctx context to look for vars in eval
		 * @param [m] placeholder
		 * @param [v] placeholder
		 * @param [e] placeholder
		 * @returns {RegExp}
		 */
		S.FIf = function(V, ctx, m, v, e) {
			return this[r](/{##(\d)##}([\s\S]*){##\/\1##}/g, function(p, a, b, f) {
				a = M[+a];

				// match ! or not statement
				m = a.match(/(^!|^not) */); v = V;
				if(m) a = a.replace(m[0], ""), v = '!'+v;

				try {
					f = eval(v+a)
				} catch(e) {
					f = 0
				}

				return b.match(e = /{{(#+)else}}[\s\S]*/)
					? b[r](f ? e : /[\s\S]*\{{(#+)else}}/, '')
					: f ? b : ''
			});
		};

		/**
		 * Parse tags ({{abc}}), also look for helper functions
		 * @param {String} V eval base
		 * @param {Object} ctx context to look for vars in eval
		 * @param [t] placeholder
		 * @returns {RegExp}
		 */
		S.FTag = function(V, ctx, t) {
			return this[r](/{+\{ *([A-Za-z0-9_.]+) *["']*(.*?)["']*}}+/g, function(p, $1, $2, f) {
				if($2)
					if(F.tH[$1])
						return F.tH[$1].apply(0, $2[r](/["'] *["']*/g, '{|}').split('{|}'));
					else {
						console.warn('F: Helper', $1, 'not found!');
						return '';
					}

				try {
					f = eval(!V.big || $1.match(t=/\./g) ? V+"['"+$1.replace(t, "']['")+"']" : V)
				} catch(e) {}

				// return string or object or tag itself, if the value is not a string
				f = f ? f.big ? f : typeof f[$1] != "string" ? p : f[$1] : '';

				// if set, escape {{{ }}} tags
				return p[2] == '{' ? new Option(f)[F.H] : f
			})
		};

		return F(
			s
			// each
			.FObj(ctx, 1)
			// vars at level 0
			.FTag("ctx", ctx)
			// if's at level 0
			.FIf("ctx.", ctx)
			// JS
			[r](/{%(.*)%}/g, function(p, $1) {
				return eval($1);
			})
			// remove whitespace
			.trim()
		)
	},

	/**
	 * Asynchronously load template-file from a relative path
	 * @param {String} p relative template path
	 * @param {Function} [f] callback
	 * @param {Object} [c] Context object
	 * @param [x] placeholder
	 */
	loadTemplate: function(p, f, c, x) {
		x = this.x;
		F().ajax('GET', p, function(e, t) {
			t = F(e.responseText).template(c);
			if(x) t.appendTo(x[0]);

			f&&f.call(t)
		});
	},

	/**
	 * Register a new Template Helper
	 * @param {String} n name of the helper
	 * @param {Function} f helper function
	 */
	registerHelper: function(n, f) {
		F.tH[n] = f;

		return this
	}
});

/**
 * Template Helper
 * @type {{}}
 */
F.tH = {};