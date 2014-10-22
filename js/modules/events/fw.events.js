F.events={
	/**
	 * Attach event listener
	 * @param {String} v eventname
	 * @param {Function} D callback
	 * @returns {F}
	 */
	on: function(v,D){
		for(var i=this.x.length;i--;)
			this.x[i].addEventListener(v,D);

		return this
	},

	/**
	 * Remove event listener
	 * @param {String} v eventname
	 * @param {Function} D callback
	 * @returns {F}
	 */
	off:function(v,D){
		for(var i=this.x.length;i--;)
			this.x[i].removeEventListener(v,D);

		return this
	},

	/**
	 * Fire event listener
	 * @param {String} v eventname
	 * @param {*} [D] data
	 * @returns {F}
	 */
	fire:function(v,D){
		for(var i=this.x.length;i--;)
			this.x[i].dispatchEvent(new CustomEvent(v,{detail:D}));

		return this
	}
};

F.extend(F.events);

