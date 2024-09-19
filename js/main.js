
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

		var currentState = null
		var defaultState = "index";
		var siteBody = document.body;
		var mouse = utils.captureMouse(siteBody);
		var activePage = "index";
		var pages = ["index","nescafe-orjinal","cikolata-ve-kremali","muz-aromali","meyveli-yogurtlu","kakao-toz-ile","taze-muz-ile","cikolatali-ve-taze-naneli","cikolata-ve-vanilyali-dondurmali","kakao-tozu-ve-taze-cilek-ile","dondurmali-ve-taze-seftalili","muzlu-ve-cikolata-aromali"];
		var ices = $(".ices");
		var randomArr = [];
	 	//var soundFileExtn = ".ogg";
	 	var slideSound;
		var freezeSound;

		var $nescafe = $("#nescafe"),
		$main = $("#main"),
		$menuItems = $("nav li"),
		$menuItem = $("nav a"),
		$header = $("header"),
		$footer = $("footer"),
		$nav = $("header nav"),
		$menuOpener = $(".controller .open"),
		$menuCloser = $(".controller .close"),
		$leftArrow = $(".leftarrow"),
		$rightArrow = $(".rightarrow");

		var isMenuOpened = false;
		var isMenuShown = false;
		var isOverlay = false;
		var arrowsShown = false;

		for (var i=0; i< ices.length; i++){
			var randomInt = Math.random() < 0.5 ? -1 * Math.round( Math.random() * 10 ): 1 * Math.round( Math.random() * 10 );
			randomArr.push(randomInt);
		}

		var loader = {
		    loaded: true,
		    loadedCount: 0, // Assets that have been loaded so far
		    totalCount: 0, // Total number of assets that need to be loaded
		    percentage : 0,

		    loadImage: function(url) {
		        this.totalCount++;
		        this.loaded = false;
		        var image = new Image();
		        image.src = url;
		        $(image).load(loader.itemLoaded);
		        return image;
		    },

		    printimages : function(percentage){

		    	$('#percentage').html(percentage);

    			// var digits = percentage.toString().split('');

    			// if(digits.length < 2){
    			// 	for(var i=0; i < digits.length; i++){
    			// 		$('#percentage').html("<span class='numb"+digits[0]+"'></span>");
    			// 	}
    			// } else if (digits.length < 3) {
    			// 	for(var i=0; i < digits.length; i++){
    			// 		$('#percentage').html("<span class='numb"+digits[0]+"'></span><span class='numb"+digits[1]+"'></span>");
    			// 	}
    			// } else {
    			// 	for(var i=0; i < digits.length; i++){
    			// 		$('#percentage').html("<span class='numb"+digits[0]+"'></span><span class='numb"+digits[1]+"'></span><span class='numb"+digits[2]+"'></span>");
    			// 	}
    			// }
		    },

		    itemLoaded: function() {
		        loader.loadedCount++;

		        //$('#loadingmessage').html('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);
		        //console.log('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);

		        loader.percentage = (loader.loadedCount * 100 / splashImages.length).toFixed(0);
		        loader.printimages(loader.percentage);

		        if (loader.loadedCount === loader.totalCount) {
		            loader.loaded = true;

		            $('#loadingmessage').hide().remove();
		            $('#percentage').hide().remove();
		            $('#feed').hide().remove();

		            $(document).trigger('preload:complete');
		        }
		    }
		}

		// parallax config
		var topOffset = {

			passive : {
				iceLeftTopOffset : 0,
				iceRightTopOffset : -275,
				glass : 0,
				logo : 0,
				parallax : 0,
				splash : {
					ice : -2000,
					motto : 1500,
					nescafe : 2000
				}
			},

			active : {
				iceLeftTopOffset : -270,
				iceRightTopOffset : -200,
				logo : -210,

				"index" : {
					ice : -328,
					motto : -330,
					nescafe : -225
				},

				"kakao-tozu-ve-taze-cilek-ile" : {
					glass : -288,
					parallax : -400
				},

				"cikolata-ve-kremali" : {
					glass : -288,
					parallax : -430
				},

				"dondurmali-ve-taze-seftalili" : {
					glass : -288,
					parallax : -440
				},

				"meyveli-yogurtlu" : {
					glass : -288,
					parallax : -400
				},

				"taze-muz-ile" : {
					glass : -288,
					parallax : -400
				},

				"muzlu-ve-cikolata-aromali" : {
					glass : -288,
					parallax : -400
				}, 

				"cikolatali-ve-taze-naneli" : {
					glass : -288,
					parallax : -400
				},

				"nescafe-orjinal" : {
					glass : -288,
					parallax : -400
				},

				"muz-aromali" : {
					glass : -288,
					parallax : -400
				},

				"cikolata-ve-vanilyali-dondurmali" : {
					glass : -288,
					parallax : -460
				},

				"kakao-toz-ile" : {
					glass : -288,
					parallax : -400
				}
			},

			menu : {
				open : 0,
				close : -470
			}
		}

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

		var shareObj = {
			fb : {
				"index" : {
					title : "Nescafé'den yaza özel soğuk tarifler.",
					desc : "Hazırlaması kolay, Lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"nescafe-orjinal" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Orjinal tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"cikolata-ve-kremali" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Çikolata ve Kremalı tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"muz-aromali" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Muz Aromalı tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"meyveli-yogurtlu" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Meyveli Yoğurtlu tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"kakao-toz-ile" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Kakao Tozlu tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"taze-muz-ile" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Taze Muzlu tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"cikolatali-ve-taze-naneli" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Çikolata ve Taze Naneli tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"cikolata-ve-vanilyali-dondurmali" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Çikolata ve Vanilya Dondurmalı tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"kakao-tozu-ve-taze-cilek-ile" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Çilekli tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"dondurmali-ve-taze-seftalili" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Dondurmali ve Taze Şeftalili tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				},
				"muzlu-ve-cikolata-aromali" : {
					title : "NESCAFÉ®'den yaza özel soğuk tarifler.",
					desc : "Muz ve Çikolata Aromalı tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
				}
			},
			tw : {
				"index" : "NESCAFÉ®'den yaza özel soğuk tarifler. Hazırlaması kolay, Lezzeti çok güzel. Sen de bi soğuk dene!",
				"nescafe-orjinal" : "NESCAFÉ®'den yaza özel soğuk tarifler. Orjinal tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!",
				"cikolata-ve-kremali" : "NESCAFÉ®'den yaza özel soğuk tarifler. Çikolata ve Kremalı tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene! ",
				"muz-aromali" : "NESCAFÉ®'den yaza özel soğuk tarifler. Muz Aromalı tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!",
				"meyveli-yogurtlu" : "NESCAFÉ®'den yaza özel soğuk tarifler. Meyveli Yoğurtlu tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!",
				"kakao-toz-ile" : "NESCAFÉ®'den yaza özel soğuk tarifler. Kakao Tozlu tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene! ",
				"taze-muz-ile" : "NESCAFÉ®'den yaza özel soğuk tarifler. Taze Muzlu tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene! ",
				"cikolatali-ve-taze-naneli" : "NESCAFÉ®'den yaza özel soğuk tarifler. Çikolata ve Taze Naneli tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!",
				"cikolata-ve-vanilyali-dondurmali" : "NESCAFÉ®'den yaza özel soğuk tarifler. Çikolata ve Vanilya Dondurmalı tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!",
				"kakao-tozu-ve-taze-cilek-ile" : "NESCAFÉ®'den yaza özel soğuk tarifler. Çilekli tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!",
				"dondurmali-ve-taze-seftalili" : "NESCAFÉ®'den yaza özel soğuk tarifler. Dondurmali ve Taze Şeftalili tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!",
				"muzlu-ve-cikolata-aromali" : "NESCAFÉ®'den yaza özel soğuk tarifler.  Muz ve Çikolata Aromalı tarifin hazırlaması kolay, lezzeti çok güzel. Sen de bi soğuk dene!"
			}
		}

		isIpad = false;
		var orientation = window.orientation;

		if(utils.deviceDescription.type == "iPad"){

			$.each($menuItem, function(){
				var newClass = this.className.replace("menu-", "menu-ipad-");
				this.className = newClass;
			});

			topOffset.menu.open = 0;
			topOffset.menu.close = -310;

			if(orientation == -90 || orientation == 90){
				isIpad = true;

				topOffset.active["index"].glass = -180;
				topOffset.active["kakao-tozu-ve-taze-cilek-ile"].glass = -180;
				topOffset.active["cikolata-ve-kremali"].glass = -180;
				topOffset.active["dondurmali-ve-taze-seftalili"].glass = -180;
				topOffset.active["meyveli-yogurtlu"].glass = -180;
				topOffset.active["taze-muz-ile"].glass = -180;
				topOffset.active["muzlu-ve-cikolata-aromali"].glass = -180;
				topOffset.active["cikolatali-ve-taze-naneli"].glass = -180;
				topOffset.active["nescafe-orjinal"].glass = -180;
				topOffset.active["muz-aromali"].glass = -180;
				topOffset.active["cikolata-ve-vanilyali-dondurmali"].glass = -180;
				topOffset.active["kakao-toz-ile"].glass = -180;

				topOffset.active.logo = 140;
				topOffset.active["index"].nescafe = -160;
				topOffset.active["index"].motto = -230;

			} else {
				topOffset.active.logo = -130;
			}

			window.addEventListener("orientationchange", function() {
				location.reload();
			}, false);

		}

		NESCAFE = {
			init : function(){

				NESCAFE.updateDimensions();
				//NESCAFE.checkSound();

				$(window).on("resize", function(){
					NESCAFE.updateDimensions();
				});

				$.each($(".main article"),function(){
					this.style.top = document.body.clientHeight * 2 + "px";
				});

				hasher.changed.add(NESCAFE.routeChange); 
				hasher.initialized.add(NESCAFE.routeChange);
				hasher.init();

				$("#enter-site").on("click", function(){
					window.location.href = $("#original").attr("href");
					$("#original").parent().addClass("active");
				});

				NESCAFE.initializeFooter();
				
				$(".social-twitter").each(function(){
					$(this).on("click", function(){

						var id = hasher.getHash();
						window.open("http://twitter.com/intent/tweet?text=" + encodeURIComponent(shareObj.tw[id]), "", "width=500,height=350,resizable=0");

					});
				});

				$(".icons-footertwitter").on("click", function(){

					var id = hasher.getHash();
					window.open("http://twitter.com/intent/tweet?text=" + encodeURIComponent(shareObj.tw[id]), "", "width=500,height=350,resizable=0");

				});

				//initialize facebook
				$(".social-facebook").each(function(){
					$(this).on("click", function(){
						NESCAFE.shareOnFaceBook();
					});
				});

				$(".icons-footerfacebook").each(function(){
					$(this).on("click", function(){
						NESCAFE.shareOnFaceBook();
					});
				});

				$(".leftarrow").on("click", function(){
					var prevPage = hasher.getHash();
					NESCAFE.previousPage(pages,NESCAFE.getCurrentIndex(),prevPage);	
				});

				$(".rightarrow").on("click", function(){
					var prevPage = hasher.getHash();
					NESCAFE.nextPage(pages,NESCAFE.getCurrentIndex(),prevPage);
				});

				$("article .logo").on("click", function(){
					hasher.setHash("index");
				});

				if(utils.deviceDescription.os == "Windows"){
					$(".actions span").css({
						"letter-spacing" : "-1px"
					});
				}

			},

			// checkSound : function(){

		 //        var mp3Support, oggSupport;
		 //        var audio = document.createElement('audio');

		 //        if (audio.canPlayType) {
		 //            mp3Support = "" != audio.canPlayType('audio/mpeg');
		 //            oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
		 //        } else {
		 //            mp3Support = false;
		 //            oggSupport = false;
		 //        }

		 //        soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;

		 //        if(soundFileExtn){
		 //        	slideSound = new Audio();
			// 		slideSound.src = "sound/ice-clink" + soundFileExtn;

			// 		freezeSound = new Audio();
			// 		freezeSound.src = "sound/ice-freeze" + soundFileExtn;
		 //        }
			// },

			updateDimensions : function(){

				$header.css({
					"width" : document.body.clientWidth
				});

				$nav.css({
					"width" : document.body.clientWidth
				});

				$nescafe.css({
					"width" : document.body.clientWidth
				});

				$main.css({
					"width" : document.body.clientWidth,
					"height" : document.body.clientHeight
				});

				if($(".overlay").length > 0){
					$(".overlay").css({
						"width" : document.body.clientWidth,
						"height" : document.body.clientHeight
					});
				}
			},

			shareOnFaceBook : function (){

				var thisPage = hasher.getHash();
	            var obj = {
	                method: 'feed',
	                link: 'http://www.bisoguknescafe.com/',
	                picture: 'http://www.bisoguknescafe.com/img/share/300x300_' + thisPage + '.jpg',
	                name: shareObj.fb[thisPage].title,
	                caption: " ",
	                description: shareObj.fb[thisPage].desc
	            };

	            FB.ui(obj);
			},

			initializeMenu : function(width){

				TweenMax.to($header, 1, {alpha: 1, ease: Quart.easeOut});
				$header[0].style.width = width + "px";

				// bind menu click event
				$menuItem.on("click", function(){
					if( !$(this).parent().hasClass("active") ){
						$menuItems.removeClass("active");
						$(this).parent().addClass("active");

						NESCAFE.closeMenu();
					}
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

				TweenMax.to($header, 1, {delay: 0, top: topOffset.menu.open, ease: Quart.easeInOut, onComplete:function(){
					$menuOpener.hide();
					$menuCloser.show();

					isMenuOpened = true;
				}});

			},

			closeMenu : function(){

				NESCAFE.removeOverlay();

				TweenMax.to($header, 1, {delay: 0, top: topOffset.menu.close, ease: Quart.easeOut, onComplete:function(){
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

			hideArrows : function(){
				TweenMax.to($leftArrow, 1, {alpha: 0, ease: Quart.easeOut});
				TweenMax.to($rightArrow, 1, {alpha: 0, ease: Quart.easeOut});
				arrowsShown = false;
			},

			showArrows : function(){
				TweenMax.to($leftArrow, 1, {alpha: 1, ease: Quart.easeOut});
				TweenMax.to($rightArrow, 1, {alpha: 1, ease: Quart.easeOut});
				arrowsShown = true;
			},

			changeFooter : function(id){
				if(id == "index"){
					$footer.addClass("indexfooter");
				} else {
					$footer.removeClass("indexfooter");
				}
			},

			appendOverlay : function(){

				var $overlay = $("<div />");
				$overlay.addClass("overlay");
				$overlay[0].style.width = document.body.clientWidth + "px";
				$overlay[0].style.height = document.body.clientHeight + "px";
				$overlay[0].style.backgroundColor = "rgba(0,0,0,.7)";
				$overlay[0].style.position = "absolute";
				$overlay[0].style.zIndex = 2;
				$overlay[0].style.opacity = 0;

				$overlay.on("click", function(){
					NESCAFE.closeMenu();
					NESCAFE.destroyModal();
					NESCAFE.removeOverlay();
				});

				$main.append($overlay);

				TweenMax.to($overlay, 1, {alpha: 1, ease: Quart.easeOut});
			},

			openModal : function(id){

				isOverlay = true;

				var $modal = $("<div />");
				$modal.addClass('modal ' + id);
				$modal.css({
					"background" : "url(img/" + id + "/touch.png) no-repeat left top"
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

			initializeFooter : function(){
				$footer.on("mouseover", function(){
					TweenMax.to($footer, 1, {delay: 0, bottom: -15, ease: Quart.easeOut});
				});

				$footer.on("mouseleave", function(){
					TweenMax.to($footer, 1, {delay: 0, bottom: -70, ease: Quart.easeOut});
				});
			},

			updateSiteCanvas : function(){
				$("section.main").css({
					"width" : document.body.clientWidth,
					"height" : document.body.clientHeight
				});
			},

			routeChange: function (newHash, oldHash){
				NESCAFE.switchPage(newHash,oldHash);
			},

			switchPage : function(hash,oldHash){
				var newUrl = hash.split('/');

				if (newUrl.length == 0 || newUrl[0] == "")
				{
					hasher.setHash(defaultState);
					return;
				}

				var state = newUrl.shift();

				if (currentState != null && currentState != state)
				{
					NESCAFE.exitState(currentState);
				}

				currentState = state;
				NESCAFE.enterState(currentState);
			},

			enterState : function(id)
			{
				NESCAFE.bindModal(id);
				NESCAFE.slideUpCurrentPage(id);

				if(id == "index"){

					NESCAFE.showSplash(id);
					NESCAFE.addListenerToCurrent(id);
					NESCAFE.hideMenu();
					NESCAFE.hideArrows();
					NESCAFE.changeFooter(id);

				} else {

					NESCAFE.showMenu();
					NESCAFE.showArrows();
					NESCAFE.initializeMenu(document.body.clientWidth);
					NESCAFE.changeFooter(id);

					NESCAFE.parallaxActive(id);
					NESCAFE.addListenerToCurrent(id);
				}

			},

			exitState : function(id){
				NESCAFE.unBindModal(id);
				NESCAFE.hideMenu();
				NESCAFE.removeOverlay();

				if(id == "index"){
					NESCAFE.hideSplash(id);
				}

				NESCAFE.slideDownCurrentPage(id);
			},

			bindModal : function(id){
				var currentPage = $("article[data-drink='" + id + "']");

				$(".touches", currentPage).on("click",function(){
					NESCAFE.openModal(id);
					NESCAFE.appendOverlay();
				});
			},

			unBindModal : function(id) {
				$("article[data-drink='" + id + "'] .touches").off("click");
			},

			slideUpCurrentPage : function(id){
				var $currentPage = $("article[data-drink='" + id + "']");

				$currentPage.show();

				TweenMax.to($currentPage, 1.5, {delay: 0, top: 0, ease: Quint.easeOut, onComplete:function(){

					// if(id != "index" && soundFileExtn){
					//     slideSound.play();
					// }

					NESCAFE.updateDimensions();
				}});

				activePage = id;
			},

			showSplash : function(id){
				var currentPage = $("article[data-drink='" + id + "']");

				var $elemIce = $(".ice", currentPage);
				var $ices = $(".ices", currentPage);
				var $elemNescafe = $(".nescafe", currentPage);
				var $elemMotto = $(".motto", currentPage);
				var $enterSite = $("#enter-site", currentPage);

				// if(soundFileExtn){
				//     freezeSound.play();
				// }

				TweenMax.to($elemIce, 1.5, {delay: 1, opacity: 1, ease: Quart.easeOut, onComplete:function(){
					TweenMax.to($elemMotto, 1, {delay: 0, css:{marginTop: topOffset.active[id].motto}, ease: Quart.easeOut});
					TweenMax.to($elemNescafe, 1.5, {delay: 0, css:{marginTop: topOffset.active[id].nescafe}, ease: Quart.easeOut, onComplete:function(){
						TweenMax.to($enterSite, .5, {delay: 0, opacity: 1, ease: Quart.easeOut});
					}});
				}});
				TweenMax.to($ices, 1.5, {delay: 1, opacity: 1, ease: Quart.easeOut});
			},

			hideSplash : function(id){
				var currentPage = $("article[data-drink='" + id + "']");

				var $elemIce = $(".ice", currentPage);
				var $ices = $(".ices", currentPage);
				var $elemNescafe = $(".nescafe", currentPage);
				var $elemMotto = $(".motto", currentPage);
				var $enterSite = $("#enter-site", currentPage);

				TweenMax.to($elemIce, 0, {delay: 0, opacity: 0, ease: Quint.easeOut});
				TweenMax.to($ices, 0, {delay: 0, opacity: 0, ease: Quart.easeOut});
				TweenMax.to($enterSite, 0, {delay: 0, opacity: 0, ease: Quart.easeOut});
				TweenMax.to($elemNescafe, 1.5, {delay: .6, css:{marginTop: topOffset.passive.splash.nescafe}, ease: Quint.easeOut});
				TweenMax.to($elemMotto, 1.5, {delay: .5, css:{marginTop: topOffset.passive.splash.motto}, ease: Quint.easeOut});
			},

			slideDownCurrentPage : function(id){
				var currentPage = $("article[data-drink='" + id + "']");

				NESCAFE.parallaxPassive(currentPage);

				TweenMax.to(currentPage, 1.5, {delay: 0, top: document.body.clientHeight * 1.5, ease: Quint.easeOut, onComplete:function(){
					NESCAFE.updateDimensions();
				}});
			},

			parallaxActive : function(id){

				var currentPage = $("article[data-drink='" + id + "']");

				var $elemGlass = $(".glass", currentPage);
				var $elemLogo = $(".logo", currentPage);
				var $elemParallax = $(".parallax", currentPage);
				var $elemLeft = $(".left", currentPage);
				var $elemRight = $(".right", currentPage);

				TweenMax.to($elemGlass, 1.5, {delay: .4, css:{marginTop: topOffset.active[id].glass}, ease: Quint.easeOut});
				TweenMax.to($elemParallax, 1.5, {delay: .5, css:{marginTop: topOffset.active[id].parallax}, ease: Quint.easeOut});

				TweenMax.to($elemLogo, 1.5, {delay: .6, css:{marginTop: topOffset.active.logo}, ease: Quint.easeOut});
				TweenMax.to($elemLeft, 2, {delay: .5, css:{marginTop: topOffset.active.iceLeftTopOffset}, ease: Quint.easeOut});
				TweenMax.to($elemRight, 1.5, {delay: .5, css:{marginTop: topOffset.active.iceRightTopOffset}, ease: Quint.easeOut});

			},

			parallaxPassive : function (currentPage) {
				// parallax elements
				var $elemGlass = $(".glass", currentPage);
				var $elemLogo = $(".logo", currentPage);
				var $elemParallax = $(".parallax", currentPage);
				var $elemLeft = $(".left", currentPage);
				var $elemRight = $(".right", currentPage);

				TweenMax.to($elemGlass, 1.5, {delay: .4, css:{marginTop: topOffset.passive.glass}, ease: Quint.easeOut});
				TweenMax.to($elemParallax, 1.5, {delay: .5, css:{marginTop: topOffset.passive.parallax}, ease: Quint.easeOut});

				TweenMax.to($elemLogo, 1.5, {delay: .6, css:{marginTop: topOffset.passive.logo}, ease: Quint.easeOut});
				TweenMax.to($elemLeft, 2, {delay: .5, css:{marginTop: topOffset.passive.iceLeftTopOffset}, ease: Quint.easeOut});
				TweenMax.to($elemRight, 1.5, {delay: .5, css:{marginTop: topOffset.passive.iceRightTopOffset}, ease: Quint.easeOut});
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

			previousPage : function (pages,index,id) {
				index -= 1;
				hasher.setHash(pages[index]);

				if(isMenuOpened) {
					NESCAFE.closeMenu();
				}
			},

			nextPage : function(pages,index){
				index += 1;
				hasher.setHash(pages[index]);

				if(isMenuOpened) {
					NESCAFE.closeMenu();
				}
			},

			onKeyboardEvent : function (e) {

				var prevPage = hasher.getHash();
				var currentIndex = $.inArray( hasher.getHash(), pages );

				switch (e.keyCode) {
					case 38:
						NESCAFE.previousPage(pages,currentIndex,prevPage);
					break;
					case 40:
						NESCAFE.nextPage(pages,currentIndex,prevPage);
					break;
					case 37:
						NESCAFE.previousPage(pages,currentIndex,prevPage);
					break;
					case 39:
						NESCAFE.nextPage(pages,currentIndex,prevPage);
					break;
				}
		    },

		    getCurrentIndex : function () {
		    	return $.inArray( hasher.getHash(), pages );
		    }

		};

		if(utils.deviceDescription.type === "iPhone"){
			window.location.href = "mobile.html";
		}

		for(var i=0; i < splashImages.length; i++){
			var imege = loader.loadImage(splashImages[i]);
		}

		$(document).ready(function(){
            
			$(document).on("preload:complete", function(){
				NESCAFE.init();

				// for(var i=0; i<siteImages.length; i++){
				// 	var imege = loader.loadImage(siteImages[i]);
				// }
			});

   			window.addEventListener('keyup', NESCAFE.onKeyboardEvent, false);
		});

		window.NESCAFE = NESCAFE;

	})(jQuery, window, document); 

