F.ext({
	/**
	 * Set or return html content of context
	 * or set or return the value of an input
	 * or select field
	 * @param {*} [v] value
	 * @param [x] placeholder for context
	 * @returns {F|string}
	 */
	html: function(v,x){
		x=this.x;
		var a=[], e, g;
		for(var i=0;i<x[F.L];i++)
			e=x[i],											// assign e as current element
				g=F.H,										// store innerHTML in g, as it might change
			e.tagName.match(/INP|SEL|TEX/)&&(g="value"),	// if e is input, select or textarea change g to "value"
				a.push(e[g]),								// save html/value in array
			v!=[]._&&(e[g]=v);								// when v is set, assign new value to element
		return v&&this||a.join("").replace(/\s/g,"")
	},

	/**
	 * @see html
	 * @type {Function|F.html}
	 */
	val: this.html,

	/**
	 * Move selector around in the context
	 * or insert HTML/Text
	 * Note: selector v will always appended
	 * to the first element in context
	 * @param {String} v selector or HTML/Text
	 * @param [x] placeholder for context
	 */
	append: function(v,x){
		x=this.x;
		var g=v.match(/^</)?0:F.d[F.Q](v)[0];
		for(var i=x[F.L];i--;)
			g?g.appendChild(x[i]):x[i][F.H]+=v;

		return this
	},

	appendTo: this.append,

	/**
	 * Remove context
	 * @param [x] placeholder for context
	 * @returns {*}
	 */
	remove: function(x){
		x=this.x;
		for(var i=x[F.L];i--;)
			x[i].parentNode.removeChild(x[i]);

		return this
	}
});

