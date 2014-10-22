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
			e.tagName.match(/INP|SEL|TEX/)&&(g="value"),	// if e is input or select change g to "value"
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
	 * Iterate over context, call f for each item
	 * Note: Iteration is inverse
	 * @param {Function} f
	 * @returns {F}
	 */
	_.each=function(f){
		for(i=l;i--;)f(_[i],i);
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
	 * Find selector s in context
	 * @param {String} s
	 * @returns {F}
	 */
	_.find=function(s){
		try{
			a=[];
			if(!x)a=d[q](s);
			else for(i=l;i--;)a[i]=x[i][q](s);

			x=[];
			for(i=0;i<a[m];i++)
				if((g=a[i])[m]&&!g.tagName.match(/SEL/))
					for(j=0;j<g[m];j++)
						x.push(g[j]);
				else x.push(g);

			_.y();
		}catch(e){};

		return this
	};

	/**
	 * Get element at index g from context
	 * @param {Number} g index
	 * @returns {F}
	 */
	_.get=function(g){
		x=[x[g]];
		_.y();

		return this
	};

	/**
	 * Show/Hide context
	 * @param {Boolean|Number} [v] flag to hide element
	 * @returns {F}
	 */
	/*_.show=function(v){
		_.css({display:v?'none':'block'});

		return this
	};*/

	/**
	 * Hide context
	 * @returns {F}
	 */
	_.hide=function(){
		_.css({display:'none');

		return this
	};

	/**
	 * Apply CSS to context
	 * @param {String|Object} o object containg CSS-Attributes
	 * or a string to return the contexts first element CSS-attribute
	 * @returns {String|F}
	 */
	_.css=function(o){
		if(o&&o.big)return getComputedStyle(x[0],null).getPropertyValue(o);
		for(i=l;i--;)
			for(j in o) x[i].style[j]=o[j];

		return this
	};

	/**
	 * Move selector around in the context
	 * or insert HTML/Text
	 * Note: selector s will always appended
	 * to the first element in context
	 * @param {String} s selector or HTML/Text
	 */
	_.append=function(s){
		g=s.match(/^</)?0:d[q](s)[0];
		for(i=l;i--;)
			g?g.appendChild(x[i]):x[i].innerHTML+=s;

		return this
	};
	_.appendTo=_.append;

	/**
	 * Get direct children of the context
	 * @returns {F}
	 */
	//_.children=function(){
	//	x=x[0].children;
	//	_.y();
	//	return this
	//};

	/**
	 * Get direct parent of the context
	 * @returns {F}
	 */
	//_.parent=function(){
	//	x=[x[0].parentNode];
	//	_.y();
	//	return this
	//};

	/**
	 * Attach event listener
	 * @param {String} v eventname
	 * @param {Function} m callback
	 * @returns {F}
	 */
	_.on=function(v,m){
		for(i=l;i--;)x[i].addEventListener(v,m);

		return this
	};

	/**
	 * Remove event listener
	 * @param {String} v eventname
	 * @param {Function} m callback
	 * @returns {F}
	 */
	_.off=function(v,m){
		for(i=l;i--;)x[i].removeEventListener(v,m);

		return this
	};

	/**
	 * Fire event listener
	 * @param {String} v eventname
	 * @param {*} [D] data
	 * @returns {F}
	 */
	_.fire=function(v,D){
		for(i=l;i--;)x[i].dispatchEvent(new CustomEvent(v,{detail:D}));

		return this
	};

	/**
	 * AJAX Call
	 * @param M method - get/post
	 * @param u url
	 * @param [g] callback if passed -> asych call
	 * @param [d] post_data
	 * @param X
	 */
	_.ajax=function(M,u,g,d,X){
		with(X=new XMLHttpRequest)
			return onreadystatechange=function(){
				readyState^4||g(this)
			},
			open(M,u,g),send(d),
			X
	};

	/**
	 * Set data for context
	 * or return its data
	 * Note: for multiple context elements only
	 * the first elements data will be returned
	 * @param [v] value
	 */
	_.data=function(v){
		for(i=l;i--;)
			if(v)x[i].D=v;
		return v?this:x[0].D
	};

	// select context
	_.find(c);

	return this
};