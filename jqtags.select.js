_tag_("jqtags.select", function (select) {

  var jq = module("jQuery");
  var makeOptionString = function (option) {
    return "<option value='" + option.id + "'>" + option.text + "</option>";
  };
  var makeOptionGroup = function (option) {
    return "<optgroup label='" + option.text + "'>";
  };

  var isCorrupted = {"null" : true, "undefined" : true };

  return {
    tagName: "jq-select",
    events: {
      "change .bs-searchbox input": "searchChange"
    },
    accessors: {
      value: {
        type: "string",
        default: "",
        onChange: "valueOnChange"
      },
      multivalue: {
        type: "string",
        default: "",
        onChange: "valueOnChange"
      },
      multiple: {
        type: "boolean",
        default: false
      },
      live: {
        type: "boolean",
        default: true
      },
      disabled : {
        type: "string",
        default: "disabled",
        onChange: "disabledOnChange"
      }
    },
    methods: ["setOptions"],
    attachedCallback: function () {
      var self = this;
      if (this.$.tagName !== "SELECT") {
        this.$.innerHTML = "<select "
          + (this.$.multiple ? "multiple" : "") +
          ">" + this.$.innerHTML + "</select>";
        this.$select = jq(this.$).find("select");
        this.$select.val((this.$.value + "").split(","));
        this.$select.data(this.$.dataset).selectpicker();
        this.$select.detach();
        this.$select.change(function (e) {
          if (self.$.live) {
            self.$.value = self.$select.val() || "";
            
            /** order of events is important here. 
              * (e.g. for any callback to read the updated value should be reflected in advance, 
              * which is possible only if input event is triggered first)
              */
            self.trigger("input");
            self.trigger("change");
          }
        });
        this.$select.on("hidden.bs.select", function () {
          if(!self.$.live){
            self.oMyChange();
          }
        });
        this.trigger("jq.query", {
          value: this.$.value,
          callback: function (data) {
            self.setOptions(data);
          }
        });
      } else {
        jq(this.$).selectpicker();
      }
    },
    oMyChange: function () {
      var self = this;
      if(this.$select){
        self.$.value = self.$select.val() || "";
      }
      /** order of events is important here. 
        * (e.g. for any callback to read the updated value should be reflected in advance, 
        * which is possible only if input event is triggered first)
        */
      self.trigger("input");
      self.trigger("change");
    },
    toList: function (str) {
      return to.List(str);
    },
    detachedCallback: function () {
      if(this.$select){
        this.$select.selectpicker("destroy");
      }
    },
    valueOnChange: function (e, oldValue, newValue) {
      if(this.$select){
        this.$select.selectpicker("val", this.toList(newValue));
      }
    },
    setOptions: function (options) {
      var self = this;
      var optionsString = "";
      for (var i in options) {
        if (options[i].children !== undefined) {
          optionsString += makeOptionGroup(options[i]);
          for (var j in options[i].children) {
            optionsString += makeOptionString(options[i].children[j]);
          }
          optionsString += "</option>";
        } else {
          optionsString += makeOptionString(options[i]);
        }
      }
      if(self.$select){
        self.$select.html(optionsString);
        self.$select.val(self.toList(self.$.value));
        self.$select.selectpicker("refresh");
      }
    },
    searchChange: function (e) {
      return preventPropagation(e);
    },
    disabledOnChange : function(e, oldValue, newValue){
    	if(this.$.hasAttribute('disabled')){
    		this.$select.attr("disabled",true);
    	} else {
    		this.$select.removeAttr("disabled");
    	}
    }
  };
});
