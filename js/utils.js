	
	// remove on deployment

	var utils = this.utils || {};

	utils.captureMouse = function (element) {
		var mouse = {x:0,y:0};

		// use attach event for IE8!!!

		$(element).on("mousemove", function (event) {
			var x,y;

			if(event.pageX || event.pageY){
				x = event.pageX;
				y = event.pageY;
			} else {
				x = event.clientX + document.body.scrollLeft + 
					document.documentElement.scrollLeft;

				y = event.clientY + document.body.scrollTop + 
					document.documentElement.scrollTop;
			}

			x -= element.offsetLeft;
			y -= element.offsetTop;

			mouse.x = x;
			mouse.y = y;
		});

		return mouse;
	}

	// utils.captureTouch = function(element){
	// 	var touch = {x:null, y:null, isPressed:false}

	// 	element.addEventListener('touchstart', function(event){
	// 		touch.isPressed = true;
	// 	}, false);

	// 	element.addEventListener("touchend", function(event){
	// 		touch.isPressed = false;
	// 		touch.x = null;
	// 		touch.y = null;
	// 	}, false);

	// 	element.addEventListener("touchmove", function(event){

	// 		var x,y,touch_event = event.touches[0]; // first touch

	// 		if(touch_event.pageX || touch_event.pageY){
	// 			x = touch_event.pageX;
	// 			y = touch_event.pageY;
	// 		} else {
	// 			x = touch_event.clientX + document.body.scrollLeft + 
	// 				document.documentElement.scrollLeft;
	// 			y = touch_event.clientY + document.body.scrollTop + 
	// 				document.documentElement.scrollTop;
	// 		}

	// 		x -= offsetLeft;
	// 		y -= offsetTop;

	// 		touch.x = x;
	// 		touch.y = y;

	// 	}, false);

	// 	return touch;
	// }

	function supportsTranslate3D() {
		var el = document.createElement('div'), supportsTranslate3D, transforms = {
			'WebkitTransform' : '-webkit-transform',
			'OTransform' : '-o-transform',
			'MSTransform' : '-ms-transform',
			'MozTransform' : '-moz-transform',
			'Transform' : 'transform'
		};

		// Add it to the body to get the computed style.
		document.body.insertBefore(el, null);

		for (var t in transforms) {
			if (el.style[t] !== undefined) {
				el.style[t] = "translate3d(1px,1px,1px)";
				supportsTranslate3D = window.getComputedStyle(el).getPropertyValue(transforms[t]);
			}
		}

		document.body.removeChild(el);
		return (supportsTranslate3D !== undefined && supportsTranslate3D !== null && supportsTranslate3D.length > 0 && supportsTranslate3D !== "none");
	}

	function supportsTransition() {
		var div = document.createElement("div");
		var p, ext, pre = ["ms", "O", "Webkit", "Moz"];

		for (p in pre) {
			if (div.style[pre[p] + "Transition"] !== undefined) {
				ext = pre[p];
				break;
			}
		}

		delete div;
		return ext;
	};

	function supported (prop) {
		var div = document.createElement('div'), vendors = 'Khtml Ms O Moz Webkit'.split(' '), len = vendors.length;
		if ( prop in div.style)
			return true;
		prop = prop.replace(/^[a-z]/, function(val) {
			return val.toUpperCase();
		});
		while (len--) {
			if (vendors[len] + prop in div.style) {
				// browser supports box-shadow. Do what you need.
				// Or use a bang (!) to test if the browser doesn't.
				return true;
			}
		}
		return false;
	}

	var browserDetection_isIE = ( function() {
		var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
		while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);
		return v > 4 ? v : undef;
	}());

	(function(detect,window) {

		detect.DEVICE_TYPES = {
			iPad : 'iPad',
			iPhone: 'iPhone',
			android : 'android',
			desktop : 'desktop',
			wPhone : 'wPhone'
		}
		
		detect.BROWSERS = {
			safari: 'Safari',
			chrome: 'Chrome'
		}
		
		detect.OS_TYPES = {
			mac: 'Mac OS',
			win: 'Windows'
		}

		detect.deviceDescription = {
			type : undefined,
			browser : undefined,
			touchCapable : false
		}
		
		detect.deviceDescription.type = detect.DEVICE_TYPES.desktop;

		if (navigator.userAgent.indexOf('iPad') > -1) {
			detect.deviceDescription.type = detect.DEVICE_TYPES.iPad;
		} else if (navigator.userAgent.indexOf('iPhone') > -1) {
			detect.deviceDescription.type = detect.DEVICE_TYPES.iPhone;
		} else if (navigator.userAgent.indexOf('Android') > -1) {
			detect.deviceDescription.type = detect.DEVICE_TYPES.android;
		} else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
			detect.deviceDescription.type = detect.DEVICE_TYPES.wPhone;
		}

		if (navigator.userAgent.indexOf('Chrome') > -1 ){
			detect.deviceDescription.browser = detect.BROWSERS.chrome;
		} else if (navigator.userAgent.indexOf('Safari') > -1) {
			detect.deviceDescription.browser = detect.BROWSERS.safari;
		}
		
		detect.deviceDescription.os = undefined;
		
		if (navigator.userAgent.indexOf('Mac OS') > -1 ){
			detect.deviceDescription.os = detect.OS_TYPES.mac;
		} else if (navigator.userAgent.indexOf('Windows') > -1 ){
			detect.deviceDescription.os = detect.OS_TYPES.win;
		}
		
		if (( typeof Touch == "object") || ('ontouchstart' in document.documentElement)) {
			detect.deviceDescription.touchCapable = true;
		}

		/* */

		detect.debug = window.location.href.indexOf('#debug') > -1;
		var $debWindow;

		detect.debLog = function(str) {

			if (!$debWindow)
				return;

			$debWindow.prepend($('<p>' + str + '</p>'));
		}

		$(function() {

			if (detect.debug) {

				$debWindow = $('<div></div>').css({
					position : 'fixed',
					top : 0,
					right : 0,
					display : 'inline-block',
					width : 300,
					'min-height' : 100,
					font : '12px Helvetica,Arial sans-serif',
					color : 'rgba(255,255,255,.8)',
					'background-color' : 'rgba(255,0,0,.5)',
					'font-weight' : 'bold',
					'padding' : '15px',
					'z-index' : 999,
					'max-height' : '50%',
					'overflow-y' : 'scroll'
				});
				$('body').append($debWindow);

			}

			detect.debLog( 'deviceDescription.os : ' + detect.deviceDescription.os );
			detect.debLog( 'deviceDescription.browser : ' + detect.deviceDescription.browser );
			detect.debLog( 'deviceDescription.type : ' + detect.deviceDescription.type );
			detect.debLog( 'Standard-touch-capable: ' + detect.deviceDescription.touchCapable);

			detect.debLog( 'browserDetection_isIE : ' + browserDetection_isIE );
			detect.debLog( 'supportsTranslate3D : ' + supportsTranslate3D() );
			detect.debLog( 'supportsTransition : ' + supportsTransition() );

		})

	})(utils,window);

	Function.prototype.bind && (typeof console == "object" || typeof console == "function") && typeof console.log == "object" && ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function(method) {
		console[method] = this.call(console[method], console)
	}, Function.prototype.bind);
	
	window.log || (window.log = function() {
		var ua, winRegexp, script, i, args = arguments,
			isReallyIE8 = !1,
			isReallyIE8Plus = !1;
		log.history = log.history || [];
		log.history.push(arguments);
		if (log.detailPrint && log.needDetailPrint) {
			ua = navigator.userAgent;
			winRegexp = /Windows\sNT\s(\d+\.\d+)/;
			console && console.log && /MSIE\s(\d+)/.test(ua) && winRegexp.test(ua) && parseFloat(winRegexp.exec(ua)[1]) >= 6.1 && (isReallyIE8Plus = !0)
		}
		if (isReallyIE8Plus || typeof console != "undefined" && typeof console.log == "function") if (log.detailPrint && log.needDetailPrint && log.needDetailPrint()) {
				console.log("-----------------");
				args = log.detailPrint(args);
				i = 0;
				while (i < args.length) {
					console.log(args[i]);
					i++
				}
			} else Array.prototype.slice.call(args).length === 1 && typeof Array.prototype.slice.call(args)[0] == "string" ? console.log(Array.prototype.slice.call(args).toString()) : console.log(Array.prototype.slice.call(args));
			else
		if (!Function.prototype.bind && typeof console != "undefined" && typeof console.log == "object") if (log.detailPrint) {
				Function.prototype.call.call(console.log, console, Array.prototype.slice.call(["-----------------"]));
				args = log.detailPrint(args);
				i = 0;
				while (i < args.length) {
					Function.prototype.call.call(console.log, console, Array.prototype.slice.call([args[i]]));
					i++
				}
			} else Function.prototype.call.call(console.log, console, Array.prototype.slice.call(args));
			else
		if (!document.getElementById("firebug-lite")) {
			script = document.createElement("script");
			script.type = "text/javascript";
			script.id = "firebug-lite";
			script.src = "https://getfirebug.com/firebug-lite.js";
			document.getElementsByTagName("HEAD")[0].appendChild(script);
			setTimeout(function() {
				window.log.apply(window, args)
			}, 2e3)
		} else setTimeout(function() {
				window.log.apply(window, args)
			}, 500)
	});