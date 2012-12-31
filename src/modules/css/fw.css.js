F.ext({
	/**
	 * Apply CSS to context
	 * @param {String|Object} v object containg CSS-Attributes
	 * or a string to return the contexts first element CSS-attribute
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 * @param [j] placeholder
	 * @returns {String|F}
	 */
	css: function(v,x,i,j){
		x=this.x;
		if(v&&v.big)return getComputedStyle(x[0],null).getPropertyValue(v);
		for(i=x[F.L];i--;)
			for(j in v)x[i].style[j]=v[j];

		return this
	}
});

