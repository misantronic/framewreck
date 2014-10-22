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
	 * Set or return html content of context
	 * or set or return the value of an input
	 * or select field
	 * @param {*} [v] value
	 * @returns {F|string}
	 */
	_.html=function(v){
		a=[];
		for(i=0;i<l;i++)
			e=x[i],											// assign e as current element
			g=h,											// store innerHTML in g, as it might change
			e.tagName.match(/INP|SEL|TEX/)&&(g="value"),	// if e is input, select or textarea change g to "value"
			a.push(e[g]),									// save html/value in array
			v!=[]._&&(e[g]=v);								// when v is set, assign new value to element
		return v&&this||a.join("").replace(/\s/g,"")
	};
	/**
	 * @see html
	 * @type {Function|F.html}
	 */
	_.val=_.html;

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

	/**
	 * Apply CSS to context
	 * @param {String|Object} v object containg CSS-Attributes
	 * or a string to return the contexts first element CSS-attribute
	 * @returns {String|F}
	 */
	_.css=function(v){
		if(v&&v.big)return getComputedStyle(x[0],null).getPropertyValue(v);
		for(i=l;i--;)
			for(j in v) x[i].style[j]=v[j];

		return this
	};

	/**
	 * Move selector around in the context
	 * or insert HTML/Text
	 * Note: selector v will always appended
	 * to the first element in context
	 * @param {String} v selector or HTML/Text
	 */
	_.append=function(v){
		g=v.match(/^</)?0:d[q](v)[0];
		for(i=l;i--;)
			g?g.appendChild(x[i]):x[i].innerHTML+=v;

		return this
	};
	_.appendTo=_.append;

	_.remove=function(){
		for(i=l;i--;)
			x[i].parentNode.removeChild(x[i]);

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