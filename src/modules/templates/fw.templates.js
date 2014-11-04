F.ext({
	parse: function(c) {
		var h = this.html(), s, r,
			/**
			 * escape {{{ }}} templates
			 */
			e = function(u, v) {
				return u[2] == '{' ? new Option(v)[F.H] : v;
			};

		// vars
		h = h[r="replace"](/{*\{{\s*(\w+)\s*}}}*/g, function(p, $1) {
				return e(p, c[$1])
			});

		// each
		h = h[r](/{{#each(?:\s*)(\w+)(?:\s*)}}([\s\S]*){{\/each}}/ig, function(p, $1, $2) {
				s = "";
				c[$1].forEach(function(item, i, a) {
					s += $2[r](/{*\{{#*\s*(\w+)\s*}}}*/g, function(p2, $3) {
						a = c[$1][i];
						a = $3 == 'value' ? a : a[$3];
						return e(p2, a)
					})
				});
				return s
			});

		return F(h.trim())
	}
});