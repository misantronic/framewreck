F.data={
	/**
	 * Set data for context
	 * or return its data
	 * Note: for multiple context elements only
	 * the first elements data will be returned
	 * @param [v] value
	 */
	data: function(v){
		for(var i=this.x.length;i--;)
			if(v)this.x[i].D=v;
		return v?this:this.x[0].D
	}
};

F.extend(F.data);

