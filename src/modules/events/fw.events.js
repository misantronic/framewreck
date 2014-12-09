(function($) {
	window.define && define.amd ? define(["F"], $) : $(F)
})(function(F) {
	return F.ext({
		/**
		 * Attach event listener
		 * @param {String} v eventname
		 * @param {Function} D callback
		 * @param [x] placeholder for context
		 * @param [i] placeholder
		 * @returns {F}
		 */
		on: function (v, D, x, i) {
			x = this.x;
			for (i = x[F.L]; i--;)
				x[i].addEventListener(v, D);

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
		off: function (v, D, x, i) {
			x = this.x;
			for (i = x[F.L]; i--;)
				x[i].removeEventListener(v, D);

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
		trigger: function (v, D, x, i) {
			x = this.x;
			for (i = x[F.L]; i--;)
				x[i].dispatchEvent(new CustomEvent(v, {detail: D}));

			return this
		}
	})
});