F.ext({
	parseTemplate: function(c) {
		var _ = this;
		var h = _.html();

		// vars
		_.html(
			h.replace(/{{\s*(\w+)\s*}}/ig, function(p, $1) {
				return c[$1]
			})
		);

		h = _.html();

		// each
		_.html(
			h.replace(/{{#each(?:\s*)(\w+)(?:\s*)}}\n*\t*(.*)\n*\t*\{{\/each}}/ig, function(p, $1, $2) {
				var items = [];
				c[$1].forEach(function(item, i) {
					items[i] = $2.replace(/{{#\s*(\w+)\s*}}/ig, function(p2, $3) {
						if($3 == 'value') return c[$1];
						return c[$1][i][$3];
					})
				});
				return items.join("");
			})
		);

		return _
	}
});