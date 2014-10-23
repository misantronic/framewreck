F=function(c){
	var _=this					// this context
		,x						// the context selected by querySelector
		,l						// length of x
		,i						// placeholder counter1
		,j						// placeholder counter2
		,a						// placeholder array
		,e						// placeholder element
		,N						// placeholder generic
		,G						// placeholder generic
		,g;						// placeholder generic

	// Global vars
	F.d=d	=document;
	F.L=L	="length";
	F.Q=Q	="querySelectorAll";
	F.H		="innerHTML";

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
		_[L]=l=x[L]					// set .length and internal placeholder l
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
			if(!x)a=d[Q](v);
			else for(i=l;i--;)a[i]=x[i][Q](v);

			x=[];
			for(i=0;i<a[L];i++)
				if((g=a[i])[L]&&!g.options)
					for(j=0;j<g[L];j++)
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

	/**
	 * Load a number of scripts
	 * @param {Array} a contains urls
	 * @param [s] placeholder script-string
	 * @param [r] placeholder xhr-request
	 */
	_.require=function(a,s,r){
		s="";
		for(i in a)
			(r=new XMLHttpRequest).open('GET',a[i],false),
			r.send(''),
			s+=r.responseText;

		eval(s);

		return this
	};

	// select context
	_.find(c);

	return this
};

/**
 * Extend frameWreck with a module
 * @param {Object} L Module
 */
F.ext=function(m){
	for(i in m)
		F.prototype[i]=m[i]
};