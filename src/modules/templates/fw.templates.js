F.ext({
	parse: function(c) {
		var h = this.html(), s, r, v = /{+\{ *(\w+) *}}+/g,
			/**
			 * escape {{{ }}} templates
			 */
			e = function(u, v) {
				return u.substr(0, 3) == '{{{' && u.slice(-3) == '}}}' ? new Option(v)[F.H] : v;
			};

		// each
		h = h[r="replace"](/{{#each(?: *)(\w+)(?: *)}}([\s\S]*){{\/each}}/ig, function(p, $1, $2) {
			s = "";
			c[$1].forEach(function(item, i, a) {
				s += $2[r](v, function(p2, $3) {
					a = c[$1][i];
					a = $3 == 'value' ? a : a[$3];
					return e(p2, a)
				})
			});
			return s
		});

		// vars
		h = h[r](v, function(p, $1) {
				return e(p, c[$1])
			});

		return F(h.trim())
	}
});