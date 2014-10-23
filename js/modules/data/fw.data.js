F.ext({
	/**
	 * Set data for context
	 * or return its data
	 * Note: for multiple context elements only
	 * the first elements data will be returned
	 * @param [v] value
	 * @param [x] placeholder for context
	 */
	data: function(v,x){
		x=this.x;
		for(var i=x[F.L];i--;)
			if(v)x[i].D=v;
		return v?this:x[0].D
	}
});

