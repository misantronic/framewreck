F=function(c){
	var _=this					// this context
		,x						// the context selected by querySelector
		,l						// length of x
		,i						// placeholder counter1
		,j						// placeholder counter2
		,a						// placeholder array
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
		return _
	};

	/**
	 * Reset keys inside this object and recount length
	 */
	_.y=function(){
		for(i=99;i--;)x[i]?_[i]=x[i]:delete _[i];	// clean up objects indicies and assign new indicies
		_[L]=l=x[L];								// set .length and internal placeholder l
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
				v+=" "+(g=a[i].split(":"))[0]+(!isNaN(j=g[1])?":nth-of-type("+(+j+1)+")":j?":"+j:"");

			if(!x)l=1,x=[d];
			for(a=[],i=l;i--;)a[i]=x[i][Q](v);

			x=[];
			for(i=0;i<a[L];i++)
				if((g=a[i])[L]&&!g.options)
					for(j=0;j<g[L];j++)
						x.push(g[j]);
				else x.push(g);
			if(x.toString().match(/NodeList/))x=[];
			_.y();
		}catch(e){}

		return _
	};

	/**
	 * Get element at index v from context
	 * @param {Number} v index
	 * @returns {F}
	 */
	_.get=function(v){
		x=[x[v]];
		_.y();

		return _
	};

	/**
	 * Load a number of scripts synchronously
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

		return _
	};

	// select context
	return _.find(c)
};

/**
 * Extend frameWreck with a module
 * @param {Object} m Module
 */
F.ext=function(m){
	for(i in m)
		F.prototype[i]=m[i]
};F.ext({
	/**
	 * Asynchronously AJAX Call
	 * @param v method - get/post
	 * @param D url
	 * @param [C] callback if passed -> asych call
	 * @param [P] post_data
	 * @param X placeholder
	 */
	ajax:function(v,D,C,P,X){
		with(X=new XMLHttpRequest)
			return onreadystatechange=function(){
				readyState^4||C(this)
			},open(v,D,1),send(P),X
	}
});

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

F.ext({
	/**
	 * Set data for context
	 * or return its data
	 * Note: for multiple context elements only
	 * the first elements data will be returned
	 * @param [v] value
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 */
	data:function(v,x,i){
		x=this.x;
		for(i=x[F.L];i--;)
			if(v)x[i].D=v;
		return v?this:x[0].D
	}
});

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
		var a=[],e,g;
		for(var i=0;i<x[F.L];i++)
			e=x[i],											// assign e as current element
			g=F.H,											// store innerHTML in g, as it might change
			e.tagName.match(/INP|SEL|TEX/)&&(g="value"),	// if e is input, select or textarea change g to "value"
			a.push(e[g]),									// save html/value in array
			v!=[]._&&(e[g]=v);								// when v is set, assign new value to element
		return v&&this||a.join("").replace(/\s/g,"")
	},

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

// method aliases
F.ext({
	val: F.prototype.html,
	appendTo: F.prototype.append
});

F.ext({
	/**
	 * Attach event listener
	 * @param {String} v eventname
	 * @param {Function} D callback
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 * @returns {F}
	 */
	on:function(v,D,x,i){
		x=this.x;
		for(i=x[F.L];i--;)
			x[i].addEventListener(v,D);

		return this
	},

	/**
	 * Remove event listener
	 * @param {String} v eventname
	 * @param {Function} D callback
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 * @returns {F}
	 */
	off:function(v,D,x,i){
		x=this.x;
		for(i=x[F.L];i--;)
			x[i].removeEventListener(v,D);

		return this
	},

	/**
	 * Fire event listener
	 * @param {String} v eventname
	 * @param {*} [D] data
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 * @returns {F}
	 */
	fire:function(v,D,x,i){
		x=this.x;
		for(i=x[F.L];i--;)
			x[i].dispatchEvent(new CustomEvent(v,{detail:D}));

		return this
	}
});

