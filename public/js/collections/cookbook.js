var app = app || {};

app.Cookbook = Backbone.Collection.extend({
	model : app.Recipe,
	comparator : 'title',
	
	dailyFood : function(){
		return this.where({ tag : '매일반찬' })
	},

	oneFood : function(){
		return this.where({ tag : '일품요리' })
	},

	soup : function(){
		return this.where({ tag : '국&찌개' })
	}

});