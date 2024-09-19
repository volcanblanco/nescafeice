
var CSS = this.css || {};

CSS = {
	/**
	 * Generates CSS3's translate3d transformation style for Opera, Chrome/Safari, Firefox and IE
	 * 
	 * @method translate3d
	 * @param {Number} x The X axis coordinate
	 * @param {Number} y The Y axis coordinate
	 * @param {Number} z The Z axis coordinate
	 * @param {Number} t The transition time / animation duration, defaults to 0
	 * @return {String} The css style code
	 */
	translate3d : function(x, y, z, t) {
		t = (typeof t === "undefined") ? 0 : t; //defaults to 0
		var tr = '-webkit-transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px); -webkit-transition: ' + t + 'ms;' + 
			 '-moz-transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px); -moz-transition: ' + t + 'ms;' + 
			 '-ms-transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px); -ms-transition: ' + t + 'ms;' + 
			 '-o-transform: translate(' + x + 'px, ' + y + 'px); -o-transition: ' + t + 'ms;' +
			 'transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px); transition: ' + t + 'ms;';
 
		return tr;
	},
 
	/**
	 * Generates CSS3's scale3d transformation style for Opera, Chrome/Safari, Firefox and IE
	 * The scaling is symetric, with the same value for width and height
	 * 
	 * @method scale3d
     * @param {Number} s The scale
     * @param {Number} t The transition time / animation duration, defaults to 0
     * @return {String} The css style code
	 */
	scale3d : function(s, t) {
		t = (typeof t === "undefined") ? 0 : t; //defaults to 0
		var tr = '-webkit-transform: scale3d(' + s + ', ' + s + ', 1); -webkit-transition: ' + t + 'ms;' + 
			 '-moz-transform: scale3d(' + s + ', ' + s + ', 1); -moz-transition: ' + t + 'ms;' + 
			 '-ms-transform: scale3d(' + s + ', ' + s + ', 1); -ms-transition: ' + t + 'ms;' + 
			 '-o-transform: scale(' + s + '); -o-transition: ' + t + 'ms;' +
			 'transform: scale3d(' + s + ', ' + s + ', 1); transition: ' + t + 'ms;';
 
		return tr
	},
 
	/**
	 * Used to move a scaled element using translate, while keeping the scale
	 * Generates the required CSS3 style for Opera, Chrome/Safari, Firefox and IE
	 * 
	 * @method zoomTo
     * @param {Number} x The X axis coordinate of the transformation
     * @param {Number} y The Y axis coordinate of the transformation
     * @param {Number} s The scale of the element (symetric, with the same value for width and height)
     * @param {Number} t The transition time / animation duration, defaults to 0
     * @return The css style code
	 */
	zoomTo : function(x, y, s, t) {
		s = (typeof s === "undefined") ? 2 : s; //defaults to 2
		t = (typeof t === "undefined") ? 0 : t; //defaults to 0
 
		var tr = '-webkit-transform: translate3d(' + x + 'px, ' + y + 'px, 0px) scale3d(' + s + ', ' + s + ', 1);' + 
			 '-moz-transform: translate3d(' + x + 'px, ' + y + 'px, 0px) scale3d(' + s + ', ' + s + ', 1);' + 
			 '-ms-transform: translate3d(' + x + 'px, ' + y + 'px, 0px) scale3d(' + s + ', ' + s + ', 1);' + 
			 '-o-transform: translate(' + x + 'px, ' + y + 'px) scale(' + s + ');' +
			 'transform: translate3d(' + x + 'px, ' + y + 'px, 0px) scale3d(' + s + ', ' + s + ', 1);' + 
			 '-webkit-transition: ' + t + 'ms;' +
			 '-moz-transition: ' + t + 'ms;' +
			 '-ms-transition: ' + t + 'ms;' +
			 '-o-transition: ' + t + 'ms;' +
			 'transition: ' + t + 'ms;';
 
		return tr;
	}
}
