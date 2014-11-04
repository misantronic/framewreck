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

		// each
		_.html(
			h.replace(/{{#each(?:\s*)(\w+)(?:\s*)}}\n\t*(.*)\n*\t*\{{\/each}}/ig, function(p, $1, $2) {
				var items = [];
				c[$1].forEach(function(item, i) {
					items[i] = $2.replace("{{#value}}", item);
				});
				return items.join("");
			})
		);

		return _
	}
});