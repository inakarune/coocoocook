var app = app || {};
var ENTER_KEY = 13;

$(function(){
	
	var recipesRef = firebase.database().ref('recipes/');
	recipesRef.on('value', function (data) {
		setTimeout(move, 500);
		function move(){
			var firebaseData = [];

			for(let key in data.val().매일반찬){
				firebaseData.push(data.val().매일반찬[key]);
			}

			for(let key in data.val().일품요리){
				firebaseData.push(data.val().일품요리[key]);
			}

			for(let key in data.val()['국&찌개']){
				firebaseData.push(data.val()['국&찌개'][key])
			}
			new app.CookbookView(firebaseData);
		}
	});

	var recipes = [
		{ image : 'img/bean.jpg',
		   title : '콩자반',
		   food : ['검은콩 1컵', '양조간장', '올리고당', '통깨'],
		   bookmark : '수퍼레시피2016년11월호 23쪽',
		   tag : '매일반찬'
		},

		{ image : 'img/bean.jpg',
		   title : '새송이버섯장아찌',
		   food : ['새송이버섯 5개', '마늘 3쪽', '대파', '다시마', '소금', '설탕', '물3컵', '양조간장'],
		   bookmark : '수퍼레시피2015년11월호 52쪽',
		   tag : '매일반찬'
		},

		{ image : 'img/brocoli.jpg',
		   title : '우엉 통마늘조림',
		   food : ['우엉', '마늘 20쪽', '청양고추 1개', '식용유', '올리고당', '고춧가루', '양조간장'],
		   bookmark : '수퍼레시피2015년2월호 53쪽',
		   tag : '매일반찬'
		},

		{ image : 'img/meatcook.jpg',
		   title : '제육볶음',
		   food : ['돼지고기', '고추장', '피망', '양파'],
		   bookmark : '수퍼레시피 4월호',
		   tag : '매일반찬'
		},

		{ image : 'img/jangjolim.jpg',
		   title : '장조림',
		   food : ['돼지고기', '메추리알', '간장', '대파'],
		   bookmark : '수퍼레시피 10월호',
		   tag : '매일반찬'
		},

		{ image : 'img/gatsudong.jpg',
		   title : '가츠동',
		   food : ['돈가스', '달걀', '가쓰오장국', '쪽파', '양파'],
		   bookmark : '자취왕 꿀키 블로그',
		   tag : '일품요리'
		},

		{ image : 'img/gimbob.jpeg',
		   title : '김밥',
		   food : ['밥', '달걀', '시금치', '당근', '우엉', '김밥용김', '참기름', '단무지'],
		   bookmark : '수퍼레시피 11월호',
		   tag : '일품요리'
		},

		{ image : 'img/chung.jpg',
		   title : '청국장찌개',
		   food : ['청국장', '두부', '대파', '송이버섯'],
		   bookmark : '수퍼레시피 12월호',
		   tag : '국/찌개'
		},

		{ image : 'img/yellowbean.jpg',
		   title : '콩나물무침',
		   food : ['콩나물', '고춧가루', '참깨', '쪽파'],
		   bookmark : '수퍼레시피 6월호',
		   tag : '매일반찬'
		},

		{ image : 'img/oi.png',
		   title : '오이고추된장무침',
		   food : ['오이고추', '된장', '양파', '참기름', '물엿'],
		   bookmark : '자취왕 꿀키 블로그',
		   tag : '매일반찬'
		},

		{ image : 'img/kinoco.jpeg',
		   title : '새송이버섯양념구이',
		   food : ['새송이버섯', '고추장', '다진마늘', '간장', '참기름', '맛술'],
		   bookmark : '문성실 요리 블로그',
		   tag : '매일반찬'
		},

		{ image : 'img/kimchisoup.jpg',
		   title : '김치찌개',
		   food : ['배추김치', '두부', '돼지고기'],
		   bookmark : '미상유 블로그',
		   tag : '국/찌개'
		},

		{ image : 'img/kimchisoup.jpg',
		   title : '생강 돼지고기구이',
		   food : ['돼지고기 목살 300g', '양파 1/4개', '마늘 2쪽', '깻잎 5장', '생강 2톨', '식용유', '돈가스 소스', '양조간장'],
		   bookmark : '수퍼레시피2015년11월 63쪽',
		   tag : '매일반찬'
		},

		{ image : 'img/kimchisoup.jpg',
		   title : '버섯장떡',
		   food : ['표고버섯 3개', '참기름', '부침가루'],
		   bookmark : '수퍼레시피2015년11월 65쪽',
		   tag : '매일반찬'
		},

		{ image : 'img/kimchisoup.jpg',
		   title : '대파 순두붓국',
		   food : ['순두부 또는 연두부 1모', '대파', '양파 1/4개'],
		   bookmark : '수퍼레시피2015년11월 71쪽',
		   tag : '국/찌개'
		},

		{ image : 'img/kimchisoup.jpg',
		   title : '버섯 바비큐폭찹',
		   food : ['돼지고기안심 300g', '양송이버섯 10개', '양파 1/2개', '마늘 3쪽', '밀가루', '청주', '돈가스소스', '토마토케찹', '고춧가루'],
		   bookmark : '수퍼레시피2015년11월 87쪽',
		   tag : '매일반찬'
		},

		{ image : 'img/kimchisoup.jpg',
		   title : '무생채 비빔밥',
		   food : ['쌈채소 약 10장', '달걀', '무'],
		   bookmark : '수퍼레시피2015년11월 103쪽',
		   tag : '일품요리'
		},

		{ image : 'img/kimchisoup.jpg',
		   title : '카레 치킨랩',
		   food : ['또띠야', '닭안심 6쪽', '양상추', '마요네즈', '카레가루', '양파 3/4개'],
		   bookmark : '수퍼레시피2015년11월 105쪽',
		   tag : '일품요리'
		},

		{ image : 'img/kimchisoup.jpg',
		   title : '굴소스 불고기볶음밥',
		   food : ['쇠고기 불고기용 200g', '상추 20장', '양파 1/4개', '대파', '굴소스', '달걀'],
		   bookmark : '수퍼레시피2015년11월 109쪽',
		   tag : '일품요리'
		},

		{ image : 'img/kimchisoup.jpg',
		   title : '버섯 순살강정',
		   food : ['닭안심 8쪽', '표고버섯 6개 또는 새송이버섯 2개', '파프리카 1/4개', '감자전분', '떡볶이떡', '찹쌀가루', '다진 생강', '꿀'],
		   bookmark : '수퍼레시피2015년11월 143쪽',
		   tag : '매일반찬'
		}
	];
	new app.CookbookView(recipes);
});
