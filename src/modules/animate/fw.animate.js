F.ext({
	animate: function(o, s) {
		var _ = this;

		_.A = o;
		_.S = s;

		for(var i = _.x[F.L]; i--;) {
			this.animateMe(F(_.x[i]), 0);
		}

		return this
	},

	animateMe: function(el, i) {
		var _		= this;
		var anims	= _.A[i].split(" ");
		var trs 	= []; // transition
		var trf		= []; // transform
		var c		= {};

		for(var k=0; k < anims.length; k++) {
			var anim 	= anims[k];
			var type 	= anim[0];
			var prop 	= anim.substr(2).split(",");
			var val 	= prop[0];

			var dur 	= prop[1] || _.S || 0.5; // duration
			var del 	= parseFloat(prop[2]) || 0; // delay

			if(type == 'T') {
				trs[k] = 'opacity '+ dur +'s linear '+ del +'s';
				c.opacity = val;
			}

			if(type == 'X') {
				trs[k] = 'transform '+ dur +'s linear '+ del +'s';
				trf.push('translateX('+ val +'px)');
			} else {
				trf.push('translateX(0px)');
			}

			if(type == 'Y') {
				trs[k] = 'transform '+ dur +'s linear '+ del +'s';
				trf.push('translateY('+ val +'px)');
			} else {
				trf.push('translateY(0px)');
			}

			if(type == 'R') {
				trs[k] = 'transform '+ dur +'s linear '+ del +'s';
				trf.push('rotate('+ val +'deg)');
			} else {
				trf.push('rotate(0deg)');
			}

			if(type == 'S') {
				trs[k] = 'transform '+ dur +'s linear '+ del +'s';
				trf.push('scale('+ val +')');
			} else {
				trf.push('scale(1)');
			}
		}

		if(trs.length)
			c.transition = trs.join(",");

		if(trf.length)
			c.transform = trf.join(" ");

		function handler() {
			el.off('transitionend', handler);

			_.animateMeComplete(el, ++i);
		}

		el
			.css(c)
			.on('transitionend', handler.bind(_));
	},

	animateMeComplete: function(el, i) {
		var _ = this;

		if(_.A[i]) {
			_.animateMe(el, i);
		}
	}
});
//F.vendor = (Array.prototype.slice.call(getComputedStyle(F.d.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];