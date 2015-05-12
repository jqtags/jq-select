utils.define('jqtags.select').extend('jqtag').as(function(select,_select_, _attr_){
	
	select.register({
	    tagName: "jq-select",
	    events: {
	        "click":"intialize"
	    },
	    accessors: {
	        value: {
	            type: "string",
	            default : ""
	        },
	        NAV_MODE : {
	        	type : 'string'
	        }
	    },
	    attachedCallback: function () {
	    	var self = this;
	    	this.options = GET_OPTION();
	        this.$.innerHTML = this.$.text || this.getHTML();
	    },
	    getHTML : function(){
	    	var self = this;
	    	return '<input readonly value="' + this.options.filter(function(opt,i){
	        	return self.$.value === opt.value;
	        })[0].text + '"/>';
	    },
	    intialize : function(e){
	    	console.error("intialize",e);
	    	var self = this;
	    	if(this.$.NAV_MODE !== 'EDIT'){
		    	self.$input = $("<input value='"+this.$.textContent+"'>")
		    	$(this.$).empty().append(self.$input); 
		    	self.$input.smartAutoComplete({ 
		    		disabled : false,
		    		forceSelect : true,
		    		filter : function(){
		    			return self.options;
		    		},
		    		resultFormatter: function(result){
		    			return '<li value="'+result.value +'">'+ result.text + '</li>';
		    		}
		    	});
		    	self.$input.bind({
		    		itemSelect : function(e,target){
		    			self.$.value = $(target).attr('value');
		    			self.deinit(e);
		    		},
		    		lostFocus : function(e){
		    			self.deinit(e);
		    		}
		    	});
		    	self.$input.select();
	    	}
	    	this.$.NAV_MODE = 'EDIT';
	    },
	    deinit : function(e){
	    	var self = this;
			console.error("eee",e);
			setTimeout(function(){
		    	self.$input.smartAutoComplete({
		    		disabled : true
		    	});
				self.$.innerHTML = self.getHTML();
				self.$input.remove();
				self.$.NAV_MODE = 'NONE';
			});
	    }
	});
	
});

var GET_OPTION = function(){
	return [ { text : "Scott Joplin",value : "scott" }, { text : "Charles Bolden", value : "char"}]
};

