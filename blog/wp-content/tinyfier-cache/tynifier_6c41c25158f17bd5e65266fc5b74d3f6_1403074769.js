WPGroHo=jQuery.extend({my_hash:"",data:{},renderers:{},syncProfileData:function(a,c){WPGroHo.data[a]||(WPGroHo.data[a]={},jQuery("div.grofile-hash-map-"+a+" span").each(function(){WPGroHo.data[a][this.className]=jQuery(this).text()}));WPGroHo.appendProfileData(WPGroHo.data[a],a,c)},appendProfileData:function(a,c,d){for(var b in a){if(jQuery.isFunction(WPGroHo.renderers[b]))return WPGroHo.renderers[b](a[b],c,d,b);jQuery("#"+d).find("h4").after(jQuery('<p class="grav-extra '+b+'" />').html(a[b]))}}},
WPGroHo);jQuery(document).ready(function(){Gravatar.profile_cb=function(a,c){WPGroHo.syncProfileData(a,c)};Gravatar.my_hash=WPGroHo.my_hash;Gravatar.init("body","#wpadminbar")});
var addComment={moveForm:function(a,c,d,b){var e;a=this.I(a);var f=this.I(d),g=this.I("cancel-comment-reply-link"),h=this.I("comment_parent"),k=this.I("comment_post_ID");if(a&&f&&g&&h){this.respondId=d;b=b||!1;this.I("wp-temp-form-div")||(e=document.createElement("div"),e.id="wp-temp-form-div",e.style.display="none",f.parentNode.insertBefore(e,f));a.parentNode.insertBefore(f,a.nextSibling);k&&b&&(k.value=b);h.value=c;g.style.display="";g.onclick=function(){var a=addComment,b=a.I("wp-temp-form-div"),
c=a.I(a.respondId);if(b&&c)return a.I("comment_parent").value="0",b.parentNode.insertBefore(c,b),b.parentNode.removeChild(b),this.style.display="none",this.onclick=null,!1};try{this.I("comment").focus()}catch(l){}return!1}},I:function(a){return document.getElementById(a)}};