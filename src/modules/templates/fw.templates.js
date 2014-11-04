F.ext({
	parse: function(c) {
		var _ = this, h = _.html(), s, r;

		// vars
		h = h[r="replace"](/{{\s*(\w+)\s*}}/ig, function(p, $1) {
				return c[$1]
			});

		// each
		h = h[r](/{{#each(?:\s*)(\w+)(?:\s*)}}\n*\t*(.*)\n*\t*\{{\/each}}/ig, function(p, $1, $2) {
				s = "";
				c[$1].forEach(function(item, i, a) {
					s += $2[r](/{{#\s*(\w+)\s*}}/ig, function(p2, $3) {
						a = c[$1][i];
						return $3 == 'value' ? a : a[$3]
					})
				});
				return s
			});

		return F(h.trim())
	}
});