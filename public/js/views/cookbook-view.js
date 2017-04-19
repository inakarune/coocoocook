var app = app || {};

app.CookbookView = Backbone.View.extend({
	el : '#cookbook',
	template : _.template( $('#stats-template').html() ),

	events : {
		'click #addRecipe' : 'addRecipe',
		'click #search' : 'searchRecipe',
		'keypress #searchKeyword' : 'searchRecipe',
		'click .one' : 'renderOne',
		'click .two' : 'renderTwo',
		'click .three' : 'renderThree'
	},

	initialize : function (group) {
		this.collection = new app.Cookbook(group);
		this.render();
		this.listenTo(this.collection, 'add', this.renderRecipe);
		this.listenTo(this.collection, 'add', this.renderCount);
		this.listenTo(this.collection, 'destroy', this.renderCount);
	},

	addRecipe : function(e){
		e.preventDefault();
		let formdata = {};
		let fff = $('#file').prop('files')[0];
		let that = this;
		let storageRef = firebase.storage().ref();
		if (fff !== undefined) {
			storageRef.child(`/images/${fff.name}`).put(fff);
			storageRef.child(`/images/${fff.name}`)
				.getDownloadURL()
				.then(function (url) {
					console.log(url)
					$('.recipeData div').children('input').each(function (i, el) {
						if ($(el).val() != '') {
							if (el.id === 'file') {
								formdata[el.id] = url;	
							} else {
								formdata[el.id] = $(el).val();
								$(el).val('');	
							}
						}
					});
		
					formdata.image = url;
					writeUserData(url, formdata.title, formdata.food, formdata.bookmark, formdata.tag);
					that.collection.add( new app.Recipe(formdata) );
				});	
		} else {
			$('.recipeData div').children('input').each(function (i, el) {
				if ($(el).val() != '') {
					formdata[el.id] = $(el).val();
					$(el).val('');		
				}
			});
			writeUserData('img/eggrice.jpg', formdata.title, formdata.food, formdata.bookmark, formdata.tag);
			that.collection.add( new app.Recipe(formdata) );
			alert('레시피가 추가되었습니다.');
		}
		
		function writeUserData(file, title, food, bookmark, tag) {
		  firebase.database().ref('recipes/' + tag).push({
		  	image: file,
		    title: title,
		    food: food,
		    bookmark: bookmark,
		    tag : tag
		  });
		}
	},

	searchRecipe : function(e){
		e.preventDefault();
		let keyword = $('#searchKeyword').val();
		let found = this.collection.search(keyword, ['title', 'food']);

		if (e.which === ENTER_KEY) {
			$('.recipeContainer').html('');
		
			found.each(function (recipe) {
				this.renderRecipe(recipe);
			}, this)

			return this;
		}
	},

	render : function () {
		this.renderCount();
		this.collection.each(function (recipe) {
			this.renderRecipe(recipe);
		}, this);
		
		return this;
	},

	renderRecipe : function (item) {
		let recipeView = new app.RecipeView({ model : item });
			this.$el.append(recipeView.render().el);
	},

	renderCount : function (item) {
		let daily = this.collection.dailyFood().length; 
		let one = this.collection.oneFood().length; 
		let soup = this.collection.soup().length; 

		if(daily || one || soup){
			$('#counter').html( this.template( { dailyFood : daily, oneFood : one, soup : soup } ));	
		}
	},

	renderOne : function () {
		$('.recipeContainer').html('');
	
		this.collection.dailyFood().forEach(function (recipe) {
			this.renderRecipe(recipe);
		}, this);

		return this;
	},

	renderTwo : function () {
		$('.recipeContainer').html('');
		let one = this.collection.oneFood();

		one.forEach(function(recipe){
			this.renderRecipe(recipe);
		}, this);

		return this;
	},

	renderThree : function () {
		$('.recipeContainer').html('');
		let soup = this.collection.soup();

		soup.forEach(function(recipe){
			this.renderRecipe(recipe);
		}, this);

		return this;
	}
});
