F.ext({
	/**
	 * AJAX Call
	 * @param v method - get/post
	 * @param D url
	 * @param [C] callback if passed -> asych call
	 * @param [D] post_data
	 * @param X placeholder
	 */
	ajax:function(v,D,C,P,X){
		with(X=new XMLHttpRequest)
			return onreadystatechange=function(){
				readyState^4||C(this)
			},open(v,P,F),send(D),X
	}
});

