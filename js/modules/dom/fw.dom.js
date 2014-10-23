F.ext({
	/**
	 * Set or return html content of context
	 * or set or return the value of an input
	 * or select field
	 * @param {*} [v] value
	 * @returns {F|string}
	 */
	html: function(v){
		var a=[], e, g;
		for(var i=0;i<this.x.length;i++)
			e=this.x[i],									// assign e as current element
				g='innerHTML',									// store innerHTML in g, as it might change
			e.tagName.match(/INP|SEL|TEX/)&&(g="value"),	// if e is input, select or textarea change g to "value"
				a.push(e[g]),									// save html/value in array
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
	 */
	append: function(v){
		var g=v.match(/^</)?0:document.querySelectorAll(v)[0];
		for(var i=this.x.length;i--;)
			g?g.appendChild(x[i]):this.x[i].innerHTML+=v;

		return this
	},

	appendTo: this.append,

	remove: function(){
		for(var i=this.x.length;i--;)
			this.x[i].parentNode.removeChild(this.x[i]);

		return this
	}
});

