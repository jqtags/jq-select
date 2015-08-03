define({
	name : "jqtags.select.test",
	extend : "spamjs.view",
	modules : ["jqtags.select"]
}).as(function() {
	
	module("jqtags.slider");
	module("jquery-ui");
	
	return {
		src : [
		       "jqtags.select.test.html"
		],
		events : {
			"change jq-slider" : "dropdownChanged"
		},
		_init_ : function(){
			_importStyle_("jqmodules/bootstrap-select");
			var self = this;
			this.view("jqtags.select.test.html").done(function(){
				self.model({
					testvalue : ["amr","akb"],
					rangeValue : [3,6]
				});
			});
		},
		dropdownChanged : function(a,b,c){
			console.log("dropdownChanged",a,b,c);
		},
		_remove_ : function(){
			
		}
	};
	
});