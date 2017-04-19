var app = app || {};

app.Recipe = Backbone.Model.extend({
	defaults : {
		image : 'img/eggrice.jpg',
		title : 'notitle',
		food : 'nofood',
		bookmark : 'nobookmark',
		tag : 'notag'
	}
})