F=function(c){
	var _=this					// this context
		,x						// the context selected by querySelector
		,l						// length of x
		,i						// placeholder counter1
		,j						// placeholder counter2
		,a						// placeholder array
		,e						// placeholder element
		,m="length"				// placeholder length
		,q="querySelectorAll"	// placeholder querySelectorAll
		,h="innerHTML"			// placeholder innerHTML
		,d=document				// placeholder document
		,N						// placeholder generic
		,G						// placeholder generic
		,g;						// placeholder generic

	if(_.__proto__.constructor!=F)return new F(c);

	/**
	 * Iterate over context, call v for each item
	 * Note: Iteration is inverse
	 * @param {Function} v
	 * @returns {F}
	 */
	_.each=function(v){
		for(i=l;i--;)v(_[i],i);
		return this
	};

	/**
	 * Reset keys inside this object and recount length
	 */
	_.y=function(){
		for(i=99;i--;)delete _[i];	// clean up objects indicies
		for(i in x)_[i]=x[i];		// assign new indicies
		_[m]=l=x[m]					// set .length and internal placeholder l
		this.x=x;
	};

	/**
	 * Find selector v in context
	 * @param {String} v
	 * @returns {F}
	 */
	_.find=function(v){
		try{
			a=v.split(" ");
			v="";
			for(i in a)
				g=a[i].split(":"),
				g[1]=!isNaN(g[1])?":nth-of-type("+(parseInt(g[1])+1)+")":g[1]?":"+g[1]:"",
				v+=" "+g[0]+g[1];

			a=[];
			if(!x)a=d[q](v);
			else for(i=l;i--;)a[i]=x[i][q](v);

			x=[];
			for(i=0;i<a[m];i++)
				if((g=a[i])[m]&&!g.options)
					for(j=0;j<g[m];j++)
						x.push(g[j]);
				else x.push(g);
			_.y();
		}catch(e){};

		return this
	};

	/**
	 * Get element at index v from context
	 * @param {Number} v index
	 * @returns {F}
	 */
	_.get=function(v){
		x=[x[v]];
		_.y();

		return this
	};

	// select context
	_.find(c);

	return this
};

/**
 * Extend frameWreck with a module
 * @param {Object} m Module
 */
F.extend=function(m){
	for(i in m)
		F.prototype[i]=m[i]
};