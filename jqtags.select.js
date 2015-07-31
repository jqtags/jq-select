_tag_("jqtags.select",function(select){
	
	var jq = module("jQuery");
	
	return {
	    tagName: "jq-select",
	    events: {
	    	"changed.bs.select" : "updateOptions",
	    	//"change" : "oMyChange",
	    	//"input" : "oMyChange"
	    },
	    accessors: {
	        value: {
	            type: "string",
	            default : "",
	            onChange : "valueOnChange"
	        },
	        multivalue: {
	            type: "string",
	            default : "",
	            onChange : "valueOnChange"
	        },
	        multiple : {
	        	type : "boolean",
	        	default : false
	        }
	    },
	    methods : ["updateOptions"],
	    attachedCallback : function () {
	    	var self = this;
	    	if(this.$.tagName !== "SELECT"){
		    	this.$.innerHTML = "<select "
		    		+ (this.$.multiple?"multiple" : "") +
		    		">"+this.$.innerHTML+"</select>";
		    	this.$select = jq(this.$).find("select");
		    	this.$select.val((this.$.value+"").split(","))
		    	this.$select.data(this.$.dataset).selectpicker();
		    	this.$select.detach();
		    	this.$select.change(function(e){
		    		console.log("changing",e);
		    		self.$.value = self.$select.val();
		    		//self.$.multivalue = self.$select.val();
		    		self.trigger("change");
		    		self.trigger("input");
		    	});
	    	} else {
	    		jq(this.$).selectpicker();
	    	}
	    },
	    detachedCallback : function(){
	    	this.$select.selectpicker("destroy");
	    },
	    oMyChange : function(e){
	    	console.log("oMyChange",e)
	    },
	    valueOnChange : function(e,oldValue,newValue){
	    	console.log("valueOnChange",e,oldValue,newValue);
	    	this.$select.selectpicker("val",(newValue+"").split(","));
	    },
    	updateOptions : function(options){
    		console.log("updint",options);
    	}
	};
});