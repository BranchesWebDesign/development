var ak_js=document.getElementById("ak_js");ak_js?ak_js.parentNode.removeChild(ak_js):(ak_js=document.createElement("input"),ak_js.setAttribute("id","ak_js"),ak_js.setAttribute("name","ak_js"),ak_js.setAttribute("type","hidden"));ak_js.setAttribute("value",(new Date).getTime());var commentForm=document.getElementById("commentform");
if(commentForm)commentForm.appendChild(ak_js);else{var replyRowContainer=document.getElementById("replyrow");if(replyRowContainer){var children=replyRowContainer.getElementsByTagName("td");0<children.length&&children[0].appendChild(ak_js)}}
"undefined"!=typeof jQuery?("undefined"==typeof jQuery.fn.hoverIntent&&!function(c){c.fn.hoverIntent=function(h,a,m){var f={interval:100,sensitivity:7,timeout:0},f="object"==typeof h?c.extend(f,h):c.isFunction(a)?c.extend(f,{over:h,out:a,selector:m}):c.extend(f,{over:h,out:h,selector:a}),k,l,n,p,q=function(b){k=b.pageX;l=b.pageY},g=function(b,e){return e.hoverIntent_t=clearTimeout(e.hoverIntent_t),Math.abs(n-k)+Math.abs(p-l)<f.sensitivity?(c(e).off("mousemove.hoverIntent",q),e.hoverIntent_s=1,f.over.apply(e,
[b])):(n=k,p=l,e.hoverIntent_t=setTimeout(function(){g(b,e)},f.interval),void 0)};h=function(b){var e=jQuery.extend({},b),d=this;d.hoverIntent_t&&(d.hoverIntent_t=clearTimeout(d.hoverIntent_t));"mouseenter"==b.type?(n=e.pageX,p=e.pageY,c(d).on("mousemove.hoverIntent",q),1!=d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){g(e,d)},f.interval))):(c(d).off("mousemove.hoverIntent",q),1==d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){d.hoverIntent_t=clearTimeout(d.hoverIntent_t);d.hoverIntent_s=
0;f.out.apply(d,[e])},f.timeout)))};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},f.selector)}}(jQuery),jQuery(document).ready(function(c){var h,a,m,f=c("#wpadminbar"),k=!1;h=function(l,n){var f=c(n),a=f.attr("tabindex");a&&f.attr("tabindex","0").attr("tabindex",a)};a=function(l){f.find("li.menupop").on("click.wp-mobile-hover",function(n){var a=c(this);a.parent().is("#wp-admin-bar-root-default")&&!a.hasClass("hover")?(n.preventDefault(),f.find("li.menupop.hover").removeClass("hover"),
a.addClass("hover")):a.hasClass("hover")||(n.stopPropagation(),n.preventDefault(),a.addClass("hover"));l&&(c("li.menupop").off("click.wp-mobile-hover"),k=!1)})};m=function(){var l=/Mobile\/.+Safari/.test(navigator.userAgent)?"touchstart":"click";c(document.body).on(l+".wp-mobile-hover",function(l){c(l.target).closest("#wpadminbar").length||f.find("li.menupop.hover").removeClass("hover")})};f.removeClass("nojq").removeClass("nojs");"ontouchstart"in window?(f.on("touchstart",function(){a(!0);k=!0}),
m()):/IEMobile\/[1-9]/.test(navigator.userAgent)&&(a(),m());f.find("li.menupop").hoverIntent({over:function(){k||c(this).addClass("hover")},out:function(){k||c(this).removeClass("hover")},timeout:180,sensitivity:7,interval:100});window.location.hash&&window.scrollBy(0,-32);c("#wp-admin-bar-get-shortlink").click(function(l){l.preventDefault();c(this).addClass("selected").children(".shortlink-input").blur(function(){c(this).parents("#wp-admin-bar-get-shortlink").removeClass("selected")}).focus().select()});
c("#wpadminbar li.menupop > .ab-item").bind("keydown.adminbar",function(l){if(13==l.which){var a=c(l.target),f=a.closest("ab-sub-wrapper");l.stopPropagation();l.preventDefault();f.length||(f=c("#wpadminbar .quicklinks"));f.find(".menupop").removeClass("hover");a.parent().toggleClass("hover");a.siblings(".ab-sub-wrapper").find(".ab-item").each(h)}}).each(h);c("#wpadminbar .ab-item").bind("keydown.adminbar",function(a){if(27==a.which){var f=c(a.target);a.stopPropagation();a.preventDefault();f.closest(".hover").removeClass("hover").children(".ab-item").focus();
f.siblings(".ab-sub-wrapper").find(".ab-item").each(h)}});c("#wpadminbar").click(function(a){"wpadminbar"!=a.target.id&&"wp-admin-bar-top-secondary"!=a.target.id||(a.preventDefault(),c("html, body").animate({scrollTop:0},"fast"))});c(".screen-reader-shortcut").keydown(function(a){var f,k;13==a.which&&(f=c(this).attr("href"),k=navigator.userAgent.toLowerCase(),-1!=k.indexOf("applewebkit")&&f&&"#"==f.charAt(0)&&setTimeout(function(){c(f).focus()},100))});"sessionStorage"in window&&c("#wp-admin-bar-logout a").click(function(){try{for(var a in sessionStorage)-1!=
a.indexOf("wp-autosave-")&&sessionStorage.removeItem(a)}catch(c){}});navigator.userAgent&&-1===document.body.className.indexOf("no-font-face")&&/Android (1.0|1.1|1.5|1.6|2.0|2.1)|Nokia|Opera Mini|w(eb)?OSBrowser|webOS|UCWEB|Windows Phone OS 7|XBLWP7|ZuneWP7|MSIE 7/.test(navigator.userAgent)&&(document.body.className+=" no-font-face")})):!function(c,h){var a,m=function(a,b,e){a.addEventListener?a.addEventListener(b,e,!1):a.attachEvent&&a.attachEvent("on"+b,function(){return e.call(a,window.event)})},
f=RegExp("\\bhover\\b","g"),k=[],l=RegExp("\\bselected\\b","g"),n=function(g){for(;g&&g!=a&&g!=c;)"LI"==g.nodeName.toUpperCase()&&!function(b){var a=setTimeout(function(){b.className=b.className?b.className.replace(f,""):""},500);k[k.length]=[a,b]}(g),g=g.parentNode},p=function(g){for(var b,e,d=g.target||g.srcElement;;){if(!d||d==c||d==a)return;if(d.id&&"wp-admin-bar-get-shortlink"==d.id)break;d=d.parentNode}g.preventDefault&&g.preventDefault();g.returnValue=!1;-1==d.className.indexOf("selected")&&
(d.className+=" selected");g=0;for(b=d.childNodes.length;b>g;g++)if(e=d.childNodes[g],e.className&&-1!=e.className.indexOf("shortlink-input")){e.focus();e.select();e.onblur=function(){d.className=d.className?d.className.replace(l,""):""};break}return!1},q=function(a){var b,e,d,c;if(!("wpadminbar"!=a.id&&"wp-admin-bar-top-secondary"!=a.id||(b=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,1>b)))for(a=Math.min(12,Math.round(b/(800<b?130:100))),e=Math.round(800<b?
b/30:b/20),d=[],c=0;b;)b-=e,0>b&&(b=0),d.push(b),setTimeout(function(){window.scrollTo(0,d.shift())},c*a),c++};m(h,"load",function(){a=c.getElementById("wpadminbar");c.body&&a&&(c.body.appendChild(a),a.className&&(a.className=a.className.replace(/nojs/,"")),m(a,"mouseover",function(g){var b=g.target||g.srcElement,e,d,h;g=[];for(h=0;b&&b!=a&&b!=c;){if("LI"==b.nodeName.toUpperCase()){g[g.length]=b;a:{for(e=k.length;e--;)if(k[e]&&b==k[e][1]){e=k[e][0];break a}e=!1}e&&clearTimeout(e);b.className=b.className?
b.className.replace(f,"")+" hover":"hover";e=b}b=b.parentNode}if(e&&e.parentNode&&(d=e.parentNode,d&&"UL"==d.nodeName.toUpperCase()))for(b=d.childNodes.length;b--;)h=d.childNodes[b],h!=e&&(h.className=h.className?h.className.replace(l,""):"");for(b=k.length;b--;){d=!1;for(h=g.length;h--;)g[h]==k[b][1]&&(d=!0);d||(k[b][1].className=k[b][1].className?k[b][1].className.replace(f,""):"")}}),m(a,"mouseout",function(a){n(a.target||a.srcElement)}),m(a,"click",p),m(a,"click",function(a){q(a.target||a.srcElement)}),
m(document.getElementById("wp-admin-bar-logout"),"click",function(){if("sessionStorage"in window)try{for(var a in sessionStorage)-1!=a.indexOf("wp-autosave-")&&sessionStorage.removeItem(a)}catch(b){}}));h.location.hash&&h.scrollBy(0,-32);navigator.userAgent&&-1===document.body.className.indexOf("no-font-face")&&/Android (1.0|1.1|1.5|1.6|2.0|2.1)|Nokia|Opera Mini|w(eb)?OSBrowser|webOS|UCWEB|Windows Phone OS 7|XBLWP7|ZuneWP7|MSIE 7/.test(navigator.userAgent)&&(document.body.className+=" no-font-face")})}(document,
window);