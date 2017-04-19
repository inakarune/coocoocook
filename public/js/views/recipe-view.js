var app = app || {};

app.RecipeView = Backbone.View.extend({
	tagName : 'div',
	className : 'recipeContainer',
	template : _.template( $('#recipeTemplate').html() ),

	events : {
		'click .delete' : 'deleteRecipe',
		'click #editRecipe' : 'editRecipe'
	},

	deleteRecipe : function () {
		var title = this.model.attributes.title;
		var tag = this.model.attributes.tag;

		firebase.database().ref('recipes/' + tag).on('value', function(data){

			for(let key in data.val()){
				if(data.val()[key].title === title){
					firebase.database().ref('recipes/' + tag + '/' + key).remove(function(){
						console.log('remove succeeded.')
					})
					.catch(function(error){
						console.log('remove failed' + error.message);
					});
				}
			}
		})
		this.model.destroy();
		this.remove();

	},

	editRecipe : function (e) {
		e.preventDefault();
		console.log('model', this.model.attributes)
		alert('edit 아직 안되요!')
	},

	render : function () {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}

});
