F.ext({
	/**
	 * Apply CSS to context
	 * @param {String|Object} v object containg CSS-Attributes
	 * or a string to return the contexts first element CSS-attribute
	 * @param [x] placeholder for context
	 * @returns {String|F}
	 */
	css: function(v,x){
		x=this.x;
		if(v&&v.big)return getComputedStyle(x[0],null).getPropertyValue(v);
		for(var i=x[F.L];i--;)
			for(var j in v) x[i].style[j]=v[j];

		return this
	}
});

