F.ext({
	/**
	 * Asynchronously AJAX Call
	 * @param v method - get/post
	 * @param D url
	 * @param [C] callback if passed -> asych call
	 * @param [P] post_data
	 * @param X placeholder
	 */
	ajax: function (v, D, C, P, X) {
		with (X = new XMLHttpRequest)
			return onreadystatechange = function () {
				readyState ^ 4 || C(this)
			}, open(v, D, 1), send(P), X
	}
});

