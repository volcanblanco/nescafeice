
	//main

	// features : 
	// 	- image preloader
	// 	- parallax
	// 	- page bottom to top scroller
	// 	- modal-box
	// 	- hasher

	// closure for security
	(function($, window, document) {

		var NESCAFE = this.nescafe || {};

		var $nescafe = $("#nescafe");
		var $main = $("#main");
		var $menuItems = $("nav li");
		var $menuItem = $("nav a");
		var $header = $("header");
		var $footer = $("footer");
		var $nav = $("header nav");
		var $menuOpener = $(".controller .open");
		var $menuCloser = $(".controller .close");
		var $leftArrow = $(".leftarrow");
		var $rightArrow = $(".rightarrow");

		var isMenuOpened = false;
		var isMenuShown = false;
		var isOverlay = false;
		var arrowsShown = false;

		var modalData = {
			"kakao-tozu-ve-taze-cilek-ile" : {
				title : "Küçük Dokunuşlar",
				desc : "Küçük bir dokunuşla daha keyifli bir NESCAFÉ® Ice içmeye ne dersin? İşte size yepyeni bir öneri: Nescafe Ice’ını hazırlayıp koyduğun bardağa krem şanti sıkın, kremasının üstüne küçük meyve parçalarıyla süsleyip muhteşem tatlar yaratabilirsiniz. Tam ağzınıza layık, afiyet olsun!!"
			},
			"cikolata-ve-kremali" : {
				title : "Küçük Dokunuşlar",
				desc : "Hazırladığınız tarifleri bardağınıza koymadan önce, bardağın kenarlarını soğuk süt ile ıslatın. Ayrı bir tabakta koyacağınız kakao veya hindistan cevizi tozlarına, bardağın ıslanan kenarlarını batırın. Hemen arkasından süslü bardağınıza koyacağınız NESCAFÉ® Ice ile keyfinize keyif katın!!!"
			},
			"dondurmali-ve-taze-seftalili" : {
				title : "Küçük Dokunuşlar",
				desc : "Hazırladığınız tarifleri bardağınıza koymadan önce, bardağın kenarlarını süt ile ıslatın. Ayrı bir tabakta koyacagınız hındıstan cevızı tozlarına, bardagın ıslanan kenarlarını batırın. Hemen arkasından süslü bardağınıza koyacağınız NESCAFÉ® Ice ile keyfinize keyif katın!!!"
			},
			"meyveli-yogurtlu" : {
				title : "Küçük Dokunuşlar",
				desc : "NESCAFÉ® Ice’ını hazırlayıp koyduğun bardağı krem şanti ile süsleyip, kremasının üstüne çikolata rendelesen hiç fena olmaz. Afiyet olsun!"
			},
			"taze-muz-ile" : {
				title : "Küçük Dokunuşlar",
				desc : "Çikolatalı Pasta süslerini hazırladığınız NESCAFÉ® Ice karışımın üstüne serpiştirirek daha süslü bir NESCAFÉ® Ice hazırlayabilirsiniz."
			},
			"muzlu-ve-cikolata-aromali" : {
				title : "Küçük Dokunuşlar",
				desc : "Küçük bir dokunuşla daha keyifli bir NESCAFÉ® Ice içmeye ne dersin? İşte size yepyeni bir öneri:NESCAFÉ® Ice’ını hazırlayıp koyduğun bardağa krem şanti sıkın, kremasının üstüne küçük meyve parçalarıyla süsleyip muhteşem tatlar yaratabilirsiniz. Tam ağzınıza layık, afiyet olsun!!"
			},
			"cikolatali-ve-taze-naneli" : {
				title : "Küçük Dokunuşlar",
				desc : "Küçük bir dokunuşla daha keyifli bir NESCAFÉ® Ice içmeye ne dersin? İşte size yepyeni bir öneri:  NESCAFÉ® Ice’ını hazırlayıp koyduğun bardağa krem şanti sıkın, kremasının üstüne çikolata rendeleyerek muhteşem tatlar yaratabilirsiniz Tam ağzınıza layık, afiyet olsun!!"
			},
			"nescafe-orjinal" : {
				title : "Küçük Dokunuşlar",
				desc : "Daha soğuk bir NESCAFÉ® Ice için kullandığınız buz kalıplarında, su yerine kahve karışımı kullanarak (1 su bardağına 1 tatlı kaşığı NC Classic) kahveli buz kalıpları yapabilirsiniz."
			},
			"muz-aromali" : {
				title : "Küçük Dokunuşlar",
				desc : "Küçük bir dokunuşla daha keyifli bir NESCAFÉ® Ice içmeye ne dersin? İşte size yepyeni bir öneri:Nescafe Ice’ını hazırlayıp koyduğun bardağa krem şanti sıkın, kremasının üstüne küçük meyve parçalarıyla süsleyip muhteşem tatlar yaratabilirsiniz. Tam ağzınıza layık, afiyet olsun!!"
			},
			"kakao-toz-ile" : {
				title : "Küçük Dokunuşlar",
				desc : "Kakaolu NESCAFÉ® Ice’ını daha da keyifli gelmesini ister misin? NESCAFÉ® Ice’ınızı bardağa koymadan önce, bardağın iç yüzüne yukarıdan aşağı doğru şeritler halinde çikolata sosu sıkın. Hemen ardından Nescafé Ice’ınızı ekleyin. Ne kadar güzel görünüyor değil mi?"
			},
			"cikolata-ve-vanilyali-dondurmali" : {
				title : "Küçük Dokunuşlar",
				desc : "NESCAFÉ® Ice’ınızı bardağa koymadan önce, bardağın iç yüzüne yukarıdan aşağı doğru şeritler halinde çikolata sosu sıkın. Hemen ardından NESCAFÉ® Ice’ınızı ekleyin. Ne kadar güzel görünüyor değil mi?"
			}
		}

		NESCAFE = {
			init : function(){

				window.scrollTo(0, 1);

				$("#main").bxSlider({
					adaptiveHeight : true,
					pagerCustom: '#bx-pager',
					controls : false
				});

				NESCAFE.initializeMenu();

				NESCAFE.bindModal();

				$(window).on("resize", function(){
					NESCAFE.updateDimensions();
				});
			},

			initializeMenu : function(width){

				TweenMax.to($header, 1, {alpha: 1, ease: Quart.easeOut});
				$header[0].style.width = width + "px";

				// bind menu click event
				$menuItem.on("click", function(){
					if( !$(this).parent().hasClass("active") ){
						$menuItems.removeClass("active");
						$(this).parent().addClass("active");
					}

					NESCAFE.closeMenu();
				});

				// bind menu opener event
				$menuOpener.on("click", function(){
					if(!isMenuOpened){
						NESCAFE.openMenu();
					} 
				});

				// bind menu closer event
				$menuCloser.on("click", function(){					
					if(isMenuOpened) {
						NESCAFE.closeMenu();
					}
				});
			},

			openMenu: function(){

				$header[0].style.zIndex = 3;

				if(!isOverlay)
				{
					NESCAFE.appendOverlay();
					isOverlay = true;
				}

				TweenMax.to($header, 1, {delay: 0, top: 0, ease: Quart.easeInOut, onComplete:function(){
					$menuOpener.hide();
					$menuCloser.show();

					isMenuOpened = true;
				}});

			},

			closeMenu : function(){

				NESCAFE.removeOverlay();

				TweenMax.to($header, 1, {delay: 0, top: -343, ease: Quart.easeOut, onComplete:function(){
					$menuCloser.hide();
					$menuOpener.show();
					
					isMenuOpened = false;

				}});
			},

			hideMenu : function(){
				TweenMax.to($header, 1, {alpha: 0, ease: Quart.easeOut});
				isMenuShown = false;
			},

			showMenu : function(){
				$(document).on("trans:end", function(){
					TweenMax.to($header, 1, {alpha: 1, ease: Quart.easeOut});
					isMenuShown = true;
				});
			},

			appendOverlay : function(){

				var $overlay = $("<div />");
				$overlay.addClass("overlay");
				$overlay.css({
					"width" : document.body.clientWidth + "px",
					"height" : document.body.clientHeight + "px",
					"background-color" : "rgba(0,0,0,.7)",
					"position" : "absolute",
					"left" : "0",
					"top" : "0",
					"z-index" : 2,
					"opacity" : 0
				});

				$overlay.on("click", function(){
					NESCAFE.closeMenu();
					NESCAFE.destroyModal();
					NESCAFE.removeOverlay();
				});

				$('header').after($overlay);

				TweenMax.to($overlay, 1, {alpha: 1, ease: Quart.easeOut});

				NESCAFE.updateDimensions();
			},

			openModal : function(id){

				window.scrollTo(0, 1);

				isOverlay = true;

				var $modal = $("<div />");
				$modal.addClass('modal ' + id);

				$modal.css({
					"background" : "url(img/iphone/touch/" + id + "-touch.png) no-repeat left top",
					"width" : document.body.clientWidth + "px",
					"height" : document.body.clientWidth + "px",
					"margin-left" : -( document.body.clientWidth / 2 ) + "px",
					"margin-top" : -( document.body.clientWidth / 2 ) + "px"
				});

				$header[0].style.zIndex = 1;

				var wrapper = $("<div />");

				var closebtn = $("<span />");
				closebtn.addClass("closebtn");

				var headline = $("<h1 />");
				headline.html(modalData[id].title);

				var paragraph = $("<p />");
				paragraph.html(modalData[id].desc);

				wrapper.append(closebtn);
				wrapper.append(headline);
				wrapper.append(paragraph);
				$modal.append(wrapper);

				$(document.body).after().append($modal);

				closebtn.on("click", function(){
					NESCAFE.destroyModal();
					NESCAFE.removeOverlay();
				});

				TweenMax.to($modal, 1, {alpha: 1, ease: Quart.easeOut});

			},

			destroyModal : function () {
				$header[0].style.zIndex = 2;

				var modal = $(".modal");

				TweenMax.to(modal, 1, {alpha: 0, ease: Quart.easeOut, onComplete:function(){
					modal.remove();
				}});
			},

			removeOverlay : function () {
				if(isOverlay){

					var overlay = $(".overlay");

					TweenMax.to(overlay, 1, {alpha: 0, ease: Quart.easeOut, onComplete:function(){
						overlay.remove();
					}});

					isOverlay = false;
				}
			},

			bindModal : function(){
				$(".touches").on("click",function(){
					NESCAFE.openModal($(this).data("drink"));
					NESCAFE.appendOverlay();
				});
			},

			addListenerToCurrent : function(id){

				var currentPage = $("article[data-drink='" + id + "']");
				var csstransform = NESCAFE.getsupportedprop(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']);

				if(utils.deviceDescription.type != "iPad"){
					currentPage.on('mousemove', function () {
						var totalDegree = 10;
						var winWidth = document.body.clientWidth;
						var currentDegree = (mouse.x * totalDegree / winWidth) - 5;
						currentDegree.toFixed(2);

						if(id=='index'){

							var ice = $(".ice", currentPage)[0].style;
							var motto = $(".motto", currentPage)[0].style;
							var nescafe = $(".nescafe", currentPage)[0].style;

							if (typeof csstransform != "undefined"){
								for (var i = 0; i < ices.length; i++) {
									ices[i].style[csstransform] = "translateX("+ currentDegree * randomArr[i] +"px) rotate3d(0, 0, 1, " + currentDegree * 5 + "deg)";
								};
							}

							ice[csstransform] = "translateX("+currentDegree+"px)";
							motto[csstransform] = "translateX("+ -currentDegree +"px)";
							nescafe[csstransform] = 'rotate3d(0, 0, 1, ' + currentDegree * .2 + 'deg)';

						} else {

							var leftStyles = $(".left", currentPage)[0].style;
							var rightStyles = $(".right", currentPage)[0].style;
							var parallaxStyles = $(".parallax", currentPage)[0].style;
							var glassStyles = $(".glass", currentPage)[0].style;
							
							if (typeof csstransform != "undefined"){
								leftStyles[csstransform] = "translateX("+currentDegree+"px)";
								rightStyles[csstransform] = "translateX("+currentDegree+"px)";
								parallaxStyles[csstransform] = "translateX("+ currentDegree * 2 +"px)";
								glassStyles[csstransform] = 'rotate3d(0, 0, 1, ' + currentDegree * .2 + 'deg)';
							}
						}
					});
				}
			},

			getsupportedprop : function (proparray){
			    var root = document.documentElement; //reference root element of document

			    for (var i=0; i<proparray.length; i++){ //loop through possible properties
			        if (proparray[i] in root.style){ //if property exists on element (value will be string, empty string if not set)
			            return proparray[i] //return that string
			        }
			    }
			},

		    getCurrentIndex : function () {
		    	return $.inArray( hasher.getHash(), pages );
		    },

		    updateDimensions : function(){

				$header.css({
					"width" : document.body.clientWidth
				});

				$nav.css({
					"width" : document.body.clientWidth
				});

				if($(".overlay").length > 0){
					$(".overlay").css({
						"width" : document.body.clientWidth,
						"height" : document.body.clientHeight
					});
				}
			},

		};

		$(document).ready(function(){
			NESCAFE.init();
		});

		window.NESCAFE = NESCAFE;

	})(jQuery, window, document); 

