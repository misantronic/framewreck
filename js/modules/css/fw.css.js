F.ext({
	/**
	 * Apply CSS to context
	 * @param {String|Object} v object containg CSS-Attributes
	 * or a string to return the contexts first element CSS-attribute
	 * @returns {String|F}
	 */
	css: function(v){
		if(v&&v.big)return getComputedStyle(this.x[0],null).getPropertyValue(v);
		for(var i=this.x.length;i--;)
			for(var j in v) this.x[i].style[j]=v[j];

		return this
	}
});

