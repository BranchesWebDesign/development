WPGroHo=jQuery.extend({my_hash:"",data:{},renderers:{},syncProfileData:function(a,b){WPGroHo.data[a]||(WPGroHo.data[a]={},jQuery("div.grofile-hash-map-"+a+" span").each(function(){WPGroHo.data[a][this.className]=jQuery(this).text()}));WPGroHo.appendProfileData(WPGroHo.data[a],a,b)},appendProfileData:function(a,b,c){for(var d in a){if(jQuery.isFunction(WPGroHo.renderers[d]))return WPGroHo.renderers[d](a[d],b,c,d);jQuery("#"+c).find("h4").after(jQuery('<p class="grav-extra '+d+'" />').html(a[d]))}}},
WPGroHo);jQuery(document).ready(function(){Gravatar.profile_cb=function(a,b){WPGroHo.syncProfileData(a,b)};Gravatar.my_hash=WPGroHo.my_hash;Gravatar.init("body","#wpadminbar")});
(function(){var a=document.getElementById("access"),b,c;a&&(b=a.getElementsByTagName("h3")[0],c=a.getElementsByTagName("ul")[0],b&&(c&&c.childNodes.length?b.onclick=function(){-1==c.className.indexOf("nav-menu")&&(c.className="nav-menu");-1!=b.className.indexOf("toggled-on")?(b.className=b.className.replace(" toggled-on",""),c.className=c.className.replace(" toggled-on","")):(b.className+=" toggled-on",c.className+=" toggled-on")}:b.style.display="none"))})();
var addComment={moveForm:function(a,b,c,d){var e;a=this.I(a);var f=this.I(c),g=this.I("cancel-comment-reply-link"),h=this.I("comment_parent"),k=this.I("comment_post_ID");if(a&&f&&g&&h){this.respondId=c;d=d||!1;this.I("wp-temp-form-div")||(e=document.createElement("div"),e.id="wp-temp-form-div",e.style.display="none",f.parentNode.insertBefore(e,f));a.parentNode.insertBefore(f,a.nextSibling);k&&d&&(k.value=d);h.value=b;g.style.display="";g.onclick=function(){var a=addComment,b=a.I("wp-temp-form-div"),
c=a.I(a.respondId);if(b&&c)return a.I("comment_parent").value="0",b.parentNode.insertBefore(c,b),b.parentNode.removeChild(b),this.style.display="none",this.onclick=null,!1};try{this.I("comment").focus()}catch(l){}return!1}},I:function(a){return document.getElementById(a)}};