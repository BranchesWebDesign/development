var _underscore_template = _.template;

_.template = function(str, data) {
    return _underscore_template(
            str.replace(
                    /<%\s*include\s*(.*?)\s*%>/g,
                    function(match, templateId) {
                        var el = jQuery('#' + templateId);
                        return el ? el.html() : '';
                    }
            ),
            data
            );
};


/**
 * Element for tabs html of div#dnui_tabs_db
 * @type @exp;Backbone@pro;View@call;extend
 */

var DnuiVGeneral=Backbone.View.extend({
    el:"div#dnui_general"
});

/**
 * Element for tabs html of div#dnui_tabs_db
 * @type @exp;Backbone@pro;View@call;extend
 */

var DnuiVTabsDb=Backbone.View.extend({
    el:"div#dnui_tabs_db"
});

/**
 * Element for tabs html of div#dnui_tabs_folder
 * @type @exp;Backbone@pro;View@call;extend
 */
var DnuiVTabsFolder=Backbone.View.extend({
    el:"div#dnui_tabs_folder"
});

/**
 * Element for tabs html of div#dnui_tabs_backup
 * @type @exp;Backbone@pro;View@call;extend
 */
var DnuiVTabsBackup=Backbone.View.extend({
    el:"div#dnui_tabs_backup"
});

/**
 * Element for tabs html of div#dnui_tabs_option
 * @type @exp;Backbone@pro;View@call;extend
 */
var DnuiVTabsOption=Backbone.View.extend({
    el:"div#dnui_tabs_option"
});

/**
 * Element for see dirs 
 * @type @exp;Backbone@pro;View@call;extend
 */
var DnuiVSelecDir=Backbone.View.extend({
    tagName:"select",
    className:'rien',
    template:_.template(jQuery("#dnui_search_dir").html()),
    render:function(){
        console.log(this.collection);
       this.$el.html(this.template({dirs:this.collection}));
       return this;
    },
    events:{
        "change": "scanDir"
    },
    scanDir:function(evt){
        
    }
});

/**
 * Table html with the option
 * @type @exp;Backbone@pro;View@call;extend
 */

var DnuiVTableOption=Backbone.View.extend({
    className:'form-table',
    tagName:'table',
     template: _.template(jQuery("#dnui_option").html()),
    render:function(){
       this.$el.html(this.template({option:this.model.attributes}));
       return this;
    },events:{
      "change .dnui_check" :"updateCheck",
      "change .dnui_select" :"updateSelect",
      "change .dnui_cant":"updateCant"  
    },
        updateCheck:function(evt){
         this.model.set(jQuery(evt.target).data("dnui"),jQuery(evt.target).attr("checked")=== 'checked'?true:false);
    },updateSelect:function(evt){
         this.model.set(jQuery(evt.target).data("dnui"), parseInt(jQuery(evt.target).val()));
    },updateCant: function(evt){
        var cant=jQuery(evt.target).val();
        if(cant<this.collection.length){
            this.model.set("cantInPage",jQuery(evt.target).val());
        }else if(this.collection.length==this.model.get("cantInPage")){
             this.model.set("cantInPage",jQuery(evt.target).val());
        }
        else{
            this.model.set({cantInPage : cant},{silent: true});
        }
    }
});

/**
 * Show the table with all image search in the database 
 * @type @exp;Backbone@pro;View@call;extend
 */

var DnuiVTableImage = Backbone.View.extend({
    
    className:"wp-list-table widefat fixed",
    tagName:"table",
    template: _.template(jQuery("#dnui_table").html()),
    render: function() {
      
       this.$el.html(this.template());
       return this;
    },
    events: {
        "click #dnui-select-all" : "all"
    },
    all : function(){
        var evt={};
        var self=this;
        jQuery('input.dnui_father').each(function(key,input){

            if(!jQuery(input).prop("disabled")){
                jQuery(input).prop("checked", !jQuery(input).prop("checked"));
            }
            evt.target=input;
            self.father(evt);

        });
    }
});

/**
 * 
 * @type @exp;Backbone@pro;View@call;extend
 */
var DnuiVTbody=Backbone.View.extend({
    tagName:"tbody",
    template: _.template(jQuery("#dnui_tbody").html()),
    render:function(){
       this.$el.html(this.template({image:this.model}));
       return this;
    },
    events: {
        "click .dnui_father" : "father"
    },
    father :function(evt){
        
        var id=jQuery(evt.target).data("id");

        if(!jQuery(evt.target).prop("disabled")){
            
           jQuery('input.dnui_sons[data-id="'+id+'"]').each(function(key,input){
            console.log(input);
            console.log(jQuery(input).prop("disabled"));
           if(!jQuery(input).prop("disabled")){
              
               jQuery(input).prop("disabled",true);
               jQuery(input).prop("checked",false);
           }else{

                jQuery(input).removeProp("disabled");
           }
        });
    }else {

         jQuery('input.dnui_sons[data-id="'+id+'"]').each(function(key,input){
             if(!jQuery(input).attr("disabled")){
               
               jQuery(input).attr("checked", !jQuery(input).attr("checked"));
           }             
         });
    }
   
    }
    
});

/**
 * 
 * @type @exp;Backbone@pro;View@call;extend
 */
var DnuiVTableButton = Backbone.View.extend({
 
    tagName:"div",
    template: _.template(jQuery("#dnui_button").html()),
    render: function() {
       this.$el.html(this.template());
       return this;
    },
    events: {
        "click .dnui_next": "next",
        "click .dnui_before": "before",
        "click .dnui_delete": "deleteSelectd"
    },
    next: function() {
        if(this.collection.length== this.model.option.get("cantInPage")){
              this.model.option.set("numberOfPage", this.model.option.get("numberOfPage") + 1);
        }
      
    },
    before: function() {
        if (this.model.option.get("numberOfPage") > 0)
            this.model.option.set("numberOfPage", this.model.option.get("numberOfPage") - 1);

    },
    deleteSelectd: function(evt) {
        var imageToDelete={};
        var id, type;
         jQuery("input:checked").each(function(index,element){
            id=jQuery(element).data("id");
            type=jQuery(element).data("type");
            if(_.isUndefined(imageToDelete[id])){
                imageToDelete[id]={};
                 imageToDelete[id]["id"]=id;
                
                 imageToDelete[id]["toDelete"]=[];
            }
             imageToDelete[id]["toDelete"].push(type);

         });
         if(!_.isEmpty(imageToDelete)){
            
         imageToDelete=_.compact(imageToDelete);
  
         this.model.imageDeleted.fetch({type:"POST",data:{action: "dnui_delete",imageToDelete:imageToDelete,updateInServer:this.model.option.get("updateInServer")}});
         }
     }
});
/**
 * 
 * @type @exp;Backbone@pro;Collection@call;extend
 */
var DnuiCImageDeleted = Backbone.Collection.extend({
    url:ajaxurl
});


var DnuiCDirsImage = Backbone.Collection.extend({
    url:ajaxurl
});

/**
 * 
 * @type @exp;Backbone@pro;Collection@call;extend
 */
var DnuiCImageServer = Backbone.Collection.extend({
    url:ajaxurl
});
/**
 * 
 * @type @exp;Backbone@pro;Model@call;extend
 */

var DnuiMOption = Backbone.Model.extend({
    url:ajaxurl
});

jQuery(document).ready(function() {
    
    /*
   var dnuiCDirsImage= new DnuiCDirsImage(); 
   
   var dnuiVTabsFolder= new DnuiVTabsFolder();
   
   
   var dnuiVSelecDir = new DnuiVSelecDir({collection:dnuiCDirsImage});
   dnuiVTabsFolder.$el.append( dnuiVSelecDir.render().$el);
   
    dnuiVSelecDir.listenTo(dnuiCDirsImage,"sync", function(){
        console.log(dnuiCDirsImage);
        console.log("something");
        dnuiVSelecDir.render();
    });
   
   
   dnuiCDirsImage.fetch({type:'POST',data:{action: "dnui_get_dirs"}});
    */
    
   var dnuiCImageServer= new DnuiCImageServer();

   var dnuiMOption = new DnuiMOption(); 
    
    var dnuiCImageDeleted= new DnuiCImageDeleted();
    /*
     *  Configuration of view's all this is only for backbone view 
     */
   var dnuiVTabsDb= new DnuiVTabsDb();
   var dnuiVTableImage= new DnuiVTableImage();
   
   var dnuiVTableButton1 = new DnuiVTableButton({collection:dnuiCImageServer,model:{option:dnuiMOption,imageDeleted:dnuiCImageDeleted}});
   var dnuiVTableButton2 = new DnuiVTableButton({collection:dnuiCImageServer,model:{option:dnuiMOption,imageDeleted:dnuiCImageDeleted}});
   
   dnuiVTableButton1.render();
   dnuiVTableButton2.render();
   dnuiVTabsDb.$el.append(dnuiVTableButton1.el);
   dnuiVTabsDb.$el.append(dnuiVTableImage.render().el);
   dnuiVTabsDb.$el.append(dnuiVTableButton2.el);
   var dnuiVTabsOption= new DnuiVTabsOption();
   var dnuiVTableOption= new DnuiVTableOption({model:dnuiMOption, collection:dnuiCImageServer});
   dnuiVTabsOption.$el.append(dnuiVTableOption.render().el);
   
   var dnuiVGeneral= new DnuiVGeneral();
   dnuiVGeneral.$el.tabs();
   
   /*
    *Update the view with the new option,  
    */
   dnuiVTableOption.listenTo(dnuiMOption,"sync", function(){
        dnuiVTableOption.render();
    });
   
   dnuiCImageServer.listenTo(dnuiMOption,"change", function(){
          if(dnuiMOption.get("scan")){
            dnuiCImageServer.fetch({type:'POST',data:{action: "dnui_all",option:dnuiMOption.attributes}});
          }
    });
    
    dnuiVTableImage.listenTo(dnuiCImageServer,"sync", function(){
        dnuiVTableImage.render();
        dnuiCImageServer.forEach(function(image){
            var dnuiVTbody= new DnuiVTbody({id:image.id, model:image.attributes});
            dnuiVTbody.render();
            dnuiVTableImage.$el.append(dnuiVTbody.el);
            
        });
        
    });
    
    dnuiCImageDeleted.listenTo(dnuiCImageDeleted,"sync", function(){
       if( dnuiCImageDeleted.at(0).get("isOk")){
          dnuiMOption.trigger("change");
       }
        
    });
   /*
    * Get the options from the database
    */
   dnuiMOption.fetch({type:'GET',data:{action:'dnui_get_option'}});
});

