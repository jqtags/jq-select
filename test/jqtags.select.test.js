define({
	name : "jqtags.select.test",
	extend : "spamjs.view",
	modules : ["jqtags.select"]
}).as(function() {
	
	module("jqtags.slider");
	module("jquery-ui");
	
	return {
		events : {
			"change .myselectbox" : "oho",
			"change jq-slider" : "oho"
		},
		_init_ : function(){
			_importStyle_("jqmodules/bootstrap-select","jqtags/jq-slider");
			var self = this;
			this.view("select.test.html").done(function(){
				console.log("loaded");
				self.model({
					testvalue : ["R","K"],
					rangeValue : [3,6]
				});
			});
		},
		oho : function(a,b,c){
			console.log("oho",a,b,c)
		},
		_remove_ : function(){
			
		}
	};
	
});