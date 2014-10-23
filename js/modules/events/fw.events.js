F.ext({
	/**
	 * Attach event listener
	 * @param {String} v eventname
	 * @param {Function} D callback
	 * @param [x] placeholder for context
	 * @returns {F}
	 */
	on: function(v,D,x){
		x=this.x;
		for(var i=x[F.L];i--;)
			x[i].addEventListener(v,D);

		return this
	},

	/**
	 * Remove event listener
	 * @param {String} v eventname
	 * @param {Function} D callback
	 * @param [x] placeholder for context
	 * @returns {F}
	 */
	off:function(v,D,x){
		x=this.x;
		for(var i=x[F.L];i--;)
			x[i].removeEventListener(v,D);

		return this
	},

	/**
	 * Fire event listener
	 * @param {String} v eventname
	 * @param {*} [D] data
	 * @param [x] placeholder for context
	 * @returns {F}
	 */
	fire:function(v,D,x){
		x=this.x;
		for(var i=x[F.L];i--;)
			x[i].dispatchEvent(new CustomEvent(v,{detail:D}));

		return this
	}
});

