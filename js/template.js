
// nescafe.product
// nescafe.ingredients
// nescafe.instructions
// nescafe.url

var templateData = {
    title: "NESCAFÉ® ICE",
    products: [
        {
			name : "Meyveli Yogurtlu",
			url : "meyveli-yogurtlu",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic","4 çay kaşığı toz seker","150 ml. süt (ortalama 1.5 küçük çay bardağı)","125g. çilekli yogurt (1 porsiyon)" ],
			instructions : "Blenderın içine ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Çikolatalı ve Taze Naneli",
			url : "cikolatali-ve-taze-naneli",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic","4 çay kaşığı toz seker","200 ml. süt (ortalama 1 su bardağı)","2 yemek kaşığı tepeleme çikolata sosu veya eritilmis çikolata","4 yaprak taze nane" ],
			instructions : "Blenderın içine ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Çikolata ve Kremalı (GURME)",
			url : "cikolata-ve-kremali",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic", "4 çay kaşığı toz seker", "200 ml. süt (ortalama 1 su bardağı)", "30g. bitter çikolata", "3 yemek kaşığı tatlı krema" ],
			instructions : "Krema ve çikolata benmare usulünde eritilir ve kıvamında bir karısım olana kadar karıstırılır. Blenderın içine, hazırlanan karısım ve kalan ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Muzlu ve Çikolata Aromalı",
			url : "muzlu-ve-cikolata-aromali",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic", "4 çay kaşığı toz seker", "180ml. Nesquik® muzlu süt (1 küçük kutu)", "1 tepeleme tatlı kaşığı Nesquik® Kakao Toz" ],
			instructions : "Blenderın içine ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Kakao Toz ile",
			url : "kakao-toz-ile",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic", "4 çay kaşığı toz seker", "200 ml. süt (ortalama 1 su bardağı)",  "1 tepeleme tatlı kaşığı Nesquik® Kakao Toz" ],
			instructions : "Blenderın içine ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Çikolata ve Vanilyalı Dondurmalı",
			url : "cikolata-ve-vanilyali-dondurmali",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic", "4 çay kaşığı toz seker", "200 ml. süt (ortalama 1 su bardağı)", "1 top vanilyalı dondurma", "1 top çikolatalı dondurma" ],
			instructions : "Blenderın içine ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Dondurmalı ve Taze Seftalili",
			url : "dondurmali-ve-taze-seftalili",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic", "5 çay kaşığı toz seker", "200 ml. süt (ortalama 1 su bardağı)", "1 küçük boy seftali (kabukları soyulmus, dogranmıs)", "1 top vanilyalı dondurma" ],
			instructions : "Blenderın içine ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Muz Aromalı",
			url : "muz-aromali",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic", "4 çay kaşığı toz seker", "180ml. Nesquik® muzlu süt (1 küçük kutu)" ],
			instructions : "Blenderın içine ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Taze Muz ile",
			url : "taze-muz-ile",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic", "4 çay kaşığı toz seker", "200 ml. süt (ortalama 1 su bardağı)", "1 orta boy muzun yarısı" ],
			instructions : "Blenderın içine ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Kakao Tozu ve Taze Çilek ile",
			url : "kakao-tozu-ve-taze-cilek-ile",
			ingredients : [ "çay kaşığı NESCAFÉ® Classic", "4 çay kaşığı toz seker", "200 ml. süt (ortalama 1 su bardağı)", "1 tepeleme tatlı kaşığı Nesquik® Kakao Toz", "2 adet taze çilek" ],
			instructions : "Blenderın içine ürünler istenilen miktarlarda konur ve kapak kapatıldıktan sonra yaklasık 8-10 saniye kadar blenderda karıstırılır. Büyük bir bardaga konulur. Doldurulan bardaga istenirse 3 küp buz ilave edilir ve bir adet pipet ile servis edilir."
        },

        {
			name : "Nescafe Original",
			url : "nescafe-original",
			ingredients : [ "3 çay kaşığı NESCAFÉ® Classic", "4 çay kaşığı toz seker", "200 ml. süt (ortalama 1 su bardağı)" ],
			instructions : "Büyük bir bardağın içerisine istenilen miktarlarda ürünleri koyun ve kasık yardımıyla karıstırın. Doldurulan bardaga dilerseniz 3 küp buz ilave edebilirsiniz. Bol Köpüklü NESCAFÉ® Ice için: İstenilen miktardaki ürünlerin tamamını blendera koyun, kapagını kapatın ve 8-10 saniye karıstırın. Karısımı büyük bir bardaga doldurduktan sonra dilerseniz 3 küp buz ilave edebilirsiniz. NESCAFÉ® Ice’ın keyfine varın!"
        }
    ]
};

