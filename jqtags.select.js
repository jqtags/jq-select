_tag_("jqtags.select",function(select){

  var jq = module("jQuery");
  var makeOptionString = function(option){
    return "<option value='" + option.id + "'>" + option.text + "</option>";
  };
  var makeOptionGroup = function(option){
    return "<optgroup label='"+option.text+"'>";
  };

  return {
    tagName: "jq-select",
    events: {
      "changed.bs.select" : "updateOptions",
      "change .bs-searchbox input" : "searchChange"
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
        this.$select.val((this.$.value+"").split(","));
        this.$select.data(this.$.dataset).selectpicker();
        this.$select.detach();
        this.$select.change(function(e){
          self.$.value = self.$select.val();
          self.trigger("change");
          self.trigger("input");
        });
        this.trigger("jq.query", {
          value : this.$.value,
          callback : function(data){
            var optionsString = "";
            for(var i in data){
              if(data[i].children!==undefined){
                optionsString+=makeOptionGroup(data[i]);
                for(var j in data[i].children){
                  optionsString+=makeOptionString(data[i].children[j]);
                }
                optionsString+="</option>";
              } else {
                optionsString+=makeOptionString(data[i]);
              }
            }
            self.$select.html(optionsString);
            self.$select.val(self.toList(self.$.value));
            self.$select.selectpicker("refresh");
          }
        });
      } else {
        jq(this.$).selectpicker();
      }
    },
    toList : function(str){
      return is.String(str) && !is.Empty(str) ? str.split(",") : (is.Array(str) ? str : []);
    },
    detachedCallback : function(){
      this.$select.selectpicker("destroy");
    },
    valueOnChange : function(e,oldValue,newValue){
      this.$select.selectpicker("val",this.toList(newValue));
    },
    updateOptions : function(options){
      console.log("updint",options);
    },
    searchChange : function(e){
      return preventPropagation(e);
    }
  };
});