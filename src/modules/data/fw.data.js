F.ext({
	/**
	 * Set data for context
	 * or return its data
	 * Note: for multiple context elements only
	 * the first elements data will be returned
	 * @param k key
	 * @param [v] value
	 * @param [x] placeholder for context
	 * @param [i] placeholder
	 */
	data: function (k, v, x, i) {
		x = this.x;
		for (i = x[F.L]; i--;)
			if (v)
				!x[i].D&&(x[i].D = {}),
				x[i].D[k] = v;

		return v ? this : x[0].D ? x[0].D[k] : null
	}
});

