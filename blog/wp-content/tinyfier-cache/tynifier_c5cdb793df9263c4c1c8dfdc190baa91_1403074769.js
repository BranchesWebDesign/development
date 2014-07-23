(function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()})(this,function(){function a(a,b){var k=document.createElement(a||"div"),c;for(c in b)k[c]=b[c];return k}function b(a){for(var b=1,k=arguments.length;b<k;b++)a.appendChild(arguments[b]);return a}function c(a,b,k,c){var e=["opacity",b,~~(100*a),k,c].join("-");k=.01+k/c*100;c=Math.max(1-(1-a)/b*(100-k),a);var f=A.substring(0,A.indexOf("Animation")).toLowerCase();n[e]||(H.insertRule("@"+
(f&&"-"+f+"-"||"")+"keyframes "+e+"{0%{opacity:"+c+"}"+k+"%{opacity:"+a+"}"+(k+.01)+"%{opacity:1}"+(k+b)%100+"%{opacity:"+a+"}100%{opacity:"+c+"}}",H.cssRules.length),n[e]=1);return e}function e(a,b){var c=a.style,e,f;if(void 0!==c[b])return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(f=0;f<I.length;f++)if(e=I[f]+b,void 0!==c[e])return e}function f(a,b){for(var c in b)a.style[e(a,c)||c]=b[c];return a}function h(a){for(var b=1;b<arguments.length;b++){var c=arguments[b],e;for(e in c)void 0===a[e]&&
(a[e]=c[e])}return a}function g(a){for(var b={x:a.offsetLeft,y:a.offsetTop};a=a.offsetParent;)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function p(a){if("undefined"==typeof this)return new p(a);this.opts=h(a||{},p.defaults,$)}function z(){function c(b,k){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',k)}H.addRule(".spin-vml","behavior:url(#default#VML)");p.prototype.lines=function(a,k){function e(){return f(c("group",{coordsize:p+" "+p,coordorigin:-h+" "+-h}),{width:p,
height:p})}function g(a,x,m){b(z,b(f(e(),{rotation:360/k.lines*a+"deg",left:~~x}),b(f(c("roundrect",{arcsize:k.corners}),{width:h,height:k.width,left:k.radius,top:-k.width>>1,filter:m}),c("fill",{color:k.color,opacity:k.opacity}),c("stroke",{opacity:0}))))}var h=k.length+k.width,p=2*h,n=2*-(k.width+k.length)+"px",z=f(e(),{position:"absolute",top:n,left:n});if(k.shadow)for(n=1;n<=k.lines;n++)g(n,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(n=1;n<=k.lines;n++)g(n);
return b(a,z)};p.prototype.opacity=function(a,b,c,e){a=a.firstChild;e=e.shadow&&e.lines||0;a&&b+e<a.childNodes.length&&(a=(a=(a=a.childNodes[b+e])&&a.firstChild)&&a.firstChild)&&(a.opacity=c)}}var I=["webkit","Moz","ms","O"],n={},A,H=function(){var c=a("style",{type:"text/css"});b(document.getElementsByTagName("head")[0],c);return c.sheet||c.styleSheet}(),$={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2E9,className:"spinner",
top:"auto",left:"auto",position:"relative"};p.defaults={};h(p.prototype,{spin:function(b){this.stop();var c=this,e=c.opts,h=c.el=f(a(0,{className:e.className}),{position:e.position,width:0,zIndex:e.zIndex}),n=e.radius+e.length+e.width,p,z;b&&(b.insertBefore(h,b.firstChild||null),z=g(b),p=g(h),f(h,{left:("auto"==e.left?z.x-p.x+(b.offsetWidth>>1):parseInt(e.left,10)+n)+"px",top:("auto"==e.top?z.y-p.y+(b.offsetHeight>>1):parseInt(e.top,10)+n)+"px"}));h.setAttribute("role","progressbar");c.lines(h,c.opts);
if(!A){var I=0,H=(e.lines-1)*(1-e.direction)/2,J,w=e.fps,m=w/e.speed,C=(1-e.opacity)/(m*e.trail/100),y=m/e.lines;(function P(){I++;for(var a=0;a<e.lines;a++)J=Math.max(1-(I+(e.lines-a)*y)%m*C,e.opacity),c.opacity(h,a*e.direction+H,J,e);c.timeout=c.el&&setTimeout(P,~~(1E3/w))})()}return c},stop:function(){var a=this.el;a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0);return this},lines:function(e,g){function k(b,c){return f(a(),{position:"absolute",width:g.length+
g.width+"px",height:g.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/g.lines*h+g.rotate)+"deg) translate("+g.radius+"px,0)",borderRadius:(g.corners*g.width>>1)+"px"})}for(var h=0,p=(g.lines-1)*(1-g.direction)/2,n;h<g.lines;h++)n=f(a(),{position:"absolute",top:1+~(g.width/2)+"px",transform:g.hwaccel?"translate3d(0,0,0)":"",opacity:g.opacity,animation:A&&c(g.opacity,g.trail,p+h*g.direction,g.lines)+" "+1/g.speed+"s linear infinite"}),g.shadow&&b(n,f(k("#000","0 0 4px #000"),
{top:"2px"})),b(e,b(n,k(g.color,"0 0 1px rgba(0,0,0,.1)")));return e},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var J=f(a("group"),{behavior:"url(#default#VML)"});!e(J,"transform")&&J.adj?z():A=e(J,"animation");return p});
(function(a){if("object"==typeof exports)a(require("jquery"),require("spin"));else if("function"==typeof define&&define.amd)define(["jquery","spin"],a);else{if(!window.Spinner)throw Error("Spin.js not present");a(window.jQuery,window.Spinner)}})(function(a,b){a.fn.spin=function(c,e){return this.each(function(){var f=a(this),h=f.data();h.spinner&&(h.spinner.stop(),delete h.spinner);if(!1!==c){c=a.extend({color:e||f.css("color")},a.fn.spin.presets[c]||c);if("undefined"!==typeof c.right&&"undefined"!==
typeof c.length&&"undefined"!==typeof c.width&&"undefined"!==typeof c.radius){var g=f.css("padding-left"),g="undefined"===typeof g?0:parseInt(g,10);c.left=f.outerWidth()-2*(c.length+c.width+c.radius)-g-c.right;delete c.right}h.spinner=(new b(c)).spin(this)}})};a.fn.spin.presets={tiny:{lines:8,length:2,width:2,radius:3},small:{lines:8,length:4,width:3,radius:5},large:{lines:10,length:8,width:4,radius:8}}});
(function(a){a.fn.spin.presets.wp={trail:60,speed:1.3};a.fn.spin.presets.small=a.extend({lines:8,length:2,width:2,radius:3},a.fn.spin.presets.wp);a.fn.spin.presets.medium=a.extend({lines:8,length:4,width:3,radius:5},a.fn.spin.presets.wp);a.fn.spin.presets.large=a.extend({lines:10,length:6,width:4,radius:7},a.fn.spin.presets.wp);a.fn.spin.presets["small-left"]=a.extend({left:5},a.fn.spin.presets.small);a.fn.spin.presets["small-right"]=a.extend({right:5},a.fn.spin.presets.small);a.fn.spin.presets["medium-left"]=
a.extend({left:5},a.fn.spin.presets.medium);a.fn.spin.presets["medium-right"]=a.extend({right:5},a.fn.spin.presets.medium);a.fn.spin.presets["large-left"]=a.extend({left:5},a.fn.spin.presets.large);a.fn.spin.presets["large-right"]=a.extend({right:5},a.fn.spin.presets.large)})(jQuery);
(function(a){function b(){this.galleries=[];this.findAndSetupNewGalleries()}function c(a){this.gallery=a;this.addCaptionEvents();this.resize();this.gallery.removeClass("tiled-gallery-unresized")}function e(b){function c(){b.resizeAll();e&&h(c)}var e=!1,f=null;a(window).resize(function(){clearTimeout(f);e||h(c);e=!0;f=setTimeout(function(){e=!1},15)})}function f(b){a(window).resize(function(){b.resizeAll()})}b.prototype.findAndSetupNewGalleries=function(){var b=this;a(".tiled-gallery.tiled-gallery-unresized").each(function(){b.galleries.push(new c(a(this)))})};
b.prototype.resizeAll=function(){a.each(this.galleries,function(a,b){b.resize()})};c.prototype.resizeableElementsSelector=".gallery-row, .gallery-group, .tiled-gallery-item img";c.prototype.addCaptionEvents=function(){this.gallery.find(".tiled-gallery-caption").hide();this.gallery.find(".tiled-gallery-item").hover(function(){a(this).find(".tiled-gallery-caption").slideDown("fast")},function(){a(this).find(".tiled-gallery-caption").slideUp("fast")})};c.prototype.getExtraDimension=function(a,b,c){return"horizontal"===
c?(c="border"==b?"borderRightWidth":b+"Right",(parseInt(a.css("border"==b?"borderLeftWidth":b+"Left"),10)||0)+(parseInt(a.css(c),10)||0)):"vertical"===c?(c="border"==b?"borderBottomWidth":b+"Bottom",(parseInt(a.css("border"==b?"borderTopWidth":b+"Top"),10)||0)+(parseInt(a.css(c),10)||0)):0};c.prototype.resize=function(){var b=this.gallery.data("original-width"),c=this.gallery.parent().width(),e=Math.min(1,c/b),f=this;this.gallery.find(this.resizeableElementsSelector).each(function(){var b=a(this),
c=f.getExtraDimension(b,"margin","horizontal"),g=f.getExtraDimension(b,"margin","vertical"),h=f.getExtraDimension(b,"padding","horizontal"),p=f.getExtraDimension(b,"padding","vertical"),O=f.getExtraDimension(b,"border","horizontal"),x=f.getExtraDimension(b,"border","vertical"),h=b.data("original-width")+h+O+c,p=b.data("original-height")+p+x+g;b.width(Math.floor(e*h)-c).height(Math.floor(e*p)-g)})};var h=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||
window.msRequestAnimationFrame;a(document).ready(function(){var c=new b;a("body").on("post-load",function(){c.findAndSetupNewGalleries()});a(document).on("page-rendered.wpcom-newdash",function(){c.findAndSetupNewGalleries()});window.chrome&&h?e(c):f(c)})})(jQuery);var TINY={};function tid(a){return document.getElementById(a)}function tag(a,b){b=b||document;return b.getElementsByTagName(a)}
TINY.slideshow=function(a){this.infoSpeed=this.imgSpeed=this.speed=10;this.thumbOpacity=this.navHover=70;this.navOpacity=25;this.scrollSpeed=5;this.letterbox="#000";this.n=a;this.c=0;this.a=[]};
TINY.slideshow.prototype={init:function(a,b,c,e,f){a=tid(a);a=tag("li",a);var h=0,g=0;this.l=a.length;this.q=tid(f);this.f=tid(b);this.r=tid(this.info);this.o=parseInt(TINY.style.val(b,"width"));this.thumbs&&(b=tid(this.left),f=tid(this.right),b.onmouseover=new Function('TINY.scroll.init("'+this.thumbs+'",-1,'+this.scrollSpeed+")"),b.onmouseout=f.onmouseout=new Function('TINY.scroll.cl("'+this.thumbs+'")'),f.onmouseover=new Function('TINY.scroll.init("'+this.thumbs+'",1,'+this.scrollSpeed+")"),this.p=
tid(this.thumbs));for(h;h<this.l;h++)this.a[h]={},b=a[h],f=this.a[h],f.t=tag("h3",b)[0].innerHTML,f.io=tag("h3",b)[0].style.opacity,f.d=tag("p",b)[0].innerHTML,f.l=tag("a",b)[0]?tag("a",b)[0].href:"",f.tg=""!=tag("a",b)[0]?tag("a",b)[0].target:"_self",f.p=tag("span",b)[0].innerHTML,this.thumbs&&(b=tag("img",b)[0],this.p.appendChild(b),g+=parseInt(b.offsetWidth),h!=this.l-1&&(b.style.marginRight=this.spacing+"px",g+=this.spacing),this.p.style.width=g+"px",b.style.opacity=this.thumbOpacity/100,b.style.filter=
"alpha(opacity="+this.thumbOpacity+")",b.onmouseover=new Function("TINY.alpha.set(this,100,5)"),b.onmouseout=new Function("TINY.alpha.set(this,"+this.thumbOpacity+",5)"),b.onclick=new Function(this.n+".pr("+h+",1)"));c&&e&&(c=tid(c),e=tid(e),c.style.opacity=e.style.opacity=this.navOpacity/100,c.style.filter=e.style.filter="alpha(opacity="+this.navOpacity+")",c.onmouseover=e.onmouseover=new Function("TINY.alpha.set(this,"+this.navHover+",5)"),c.onmouseout=e.onmouseout=new Function("TINY.alpha.set(this,"+
this.navOpacity+",5)"),c.onclick=new Function(this.n+".mv(-1,1)"),e.onclick=new Function(this.n+".mv(1,1)"));this.auto?this.is(0,0):this.is(0,1)},mv:function(a,b){var c=this.c+a;this.c=c=0>c?this.l-1:c>this.l-1?0:c;this.pr(c,b)},pr:function(a,b){clearTimeout(this.lt);b&&clearTimeout(this.at);this.c=a;this.is(a,b)},is:function(a,b){this.info&&(0<this.a[a].t.length||0<this.a[a].d.length?TINY.height.set(this.r,1,this.infoSpeed/2,-1):TINY.height.set(this.r,0,this.infoSpeed/2,-1));var c=new Image;c.style.opacity=
0;c.style.filter="alpha(opacity=0)";this.i=c;c.onload=new Function(this.n+".le("+a+","+b+")");string=this.a[a].p;string=string.replace(/&amp;/g,"&");c.src=string;if(this.thumbs){var c=tag("img",this.p),e=c.length,f=0;for(f;f<e;f++)c[f].style.borderColor=f!=a?"":this.active}},le:function(a,b){this.f.appendChild(this.i);parseInt(this.i.offsetWidth);TINY.alpha.set(this.i,100,this.imgSpeed);var c=new Function(this.n+".nf("+a+")");this.lt=setTimeout(c,100*this.imgSpeed);if(!b||!0==this.auto&&!0==this.alwaysauto)this.at=
setTimeout(new Function(this.n+".mv(1,0)"),1E3*this.speed);""!=this.a[a].l?(c=this.a[a].l.toLowerCase().match(/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/),this.q.onclick="true"!=this.imagesthickbox||".jpg"!=c&&".jpeg"!=c&&".png"!=c&&".gif"!=c&&".bmp"!=c?new Function('window.open("'+this.a[a].l+'","'+this.a[a].tg+'")'):new Function('jQuery.colorbox({href:"'+this.a[a].l+'",maxWidth:"90%",maxHeight:"90%",title:"'+this.a[a].t+'"})'),this.q.onmouseover=new Function('this.className="'+this.linkclass+'"'),this.q.onmouseout=
new Function('this.className=""'),this.q.style.cursor="pointer"):(this.q.onclick=this.q.onmouseover=null,this.q.style.cursor="default");c=tag("img",this.f);2<=c.length&&this.f.removeChild(c[0])},nf:function(a){if(this.info){a=this.a[a];tag("h3",this.r)[0].innerHTML=a.t;tag("p",this.r)[0].innerHTML=a.d;this.r.style.height="auto";var b=parseInt(this.r.offsetHeight);this.r.style.height=0;if(0<a.t.length||0<a.d.length)TINY.height.set(this.r,b,this.infoSpeed,0),TINY.alpha.set(this.r,a.io,5)}}};
TINY.scroll=function(){return{init:function(a,b,c){a="object"==typeof a?a:tid(a);var e=a.style.left||TINY.style.val(a,"left");a.style.left=e;var f=1==b?Math.abs(parseInt(a.offsetWidth)-parseInt(a.parentNode.offsetWidth)):0;(a.childNodes.length+1)*a.firstChild.width>a.parentNode.offsetWidth&&(a.si=setInterval(function(){TINY.scroll.mv(a,f,b,c)},20))},mv:function(a,b,c,e){var f=parseInt(a.style.left);f==b?TINY.scroll.cl(a):(b=Math.abs(b+f),a.style.left=f-(b<e?b:e)*c+"px")},cl:function(a){a="object"==
typeof a?a:tid(a);clearInterval(a.si)}}}();TINY.height=function(){return{set:function(a,b,c,e){a="object"==typeof a?a:tid(a);e=a.offsetHeight;var f=a.style.height||TINY.style.val(a,"height"),f=e-parseInt(f),h=e-f>b?-1:1;clearInterval(a.si);a.si=setInterval(function(){TINY.height.tw(a,b,f,h,c)},20)},tw:function(a,b,c,e,f){c=a.offsetHeight-c;c==b?clearInterval(a.si):c!=b&&(a.style.height=c+Math.ceil(Math.abs(b-c)/f)*e+"px")}}}();
TINY.alpha=function(){return{set:function(a,b,c){a="object"==typeof a?a:tid(a);var e=a.style.opacity||TINY.style.val(a,"opacity"),f=b>100*e?1:-1;a.style.opacity=e;clearInterval(a.ai);a.ai=setInterval(function(){TINY.alpha.tw(a,b,f,c)},20)},tw:function(a,b,c,e){var f=Math.round(100*a.style.opacity);f==b?clearInterval(a.ai):(b=f+Math.ceil(Math.abs(b-f)/e)*c,a.style.opacity=b/100,a.style.filter="alpha(opacity="+b+")")}}}();
TINY.style=function(){return{val:function(a,b){a="object"==typeof a?a:tid(a);return a.currentStyle?a.currentStyle[b]:document.defaultView.getComputedStyle(a,null).getPropertyValue(b)}}}();
(function(a,b,c){function e(d,c,e){d=b.createElement(d);c&&(d.id=k+c);e&&(d.style.cssText=e);return a(d)}function f(){return c.innerHeight?c.innerHeight:a(c).height()}function h(a){var b=r.length;a=(v+a)%b;return 0>a?b+a:a}function g(a,b){return Math.round((/%/.test(a)?("x"===b?D.width():f())/100:1)*parseInt(a,10))}function p(a,b){return a.retinaUrl&&1<c.devicePixelRatio?b.replace(a.photoRegex,a.retinaSuffix):b}function z(a){"contains"in m[0]&&!m[0].contains(a.target)&&(a.stopPropagation(),m.focus())}
function I(){var b,c=a.data(u,x);null==c?(d=a.extend({},O),console&&console.log&&console.log("Error: cboxElement missing settings object")):d=a.extend({},c);for(b in d)a.isFunction(d[b])&&"on"!==b.slice(0,2)&&(d[b]=d[b].call(u));d.rel=d.rel||u.rel||a(u).data("rel")||"nofollow";d.href=d.href||a(u).attr("href");d.title=d.title||u.title;"string"===typeof d.href&&(d.href=a.trim(d.href))}function n(d,c){a(b).trigger(d);B.triggerHandler(d);a.isFunction(c)&&c.call(u)}function A(c){if(!Q){u=c;I();r=a(u);
v=0;"nofollow"!==d.rel&&(r=a("."+M).filter(function(){var b=a.data(this,x),c;b&&(c=a(this).data("rel")||b.rel||this.rel);return c===d.rel}),v=r.index(u),-1===v&&(r=r.add(u),v=r.length-1));w.css({opacity:parseFloat(d.opacity),cursor:d.overlayClose?"pointer":"auto",visibility:"visible"}).show();da&&m.add(w).removeClass(da);d.className&&m.add(w).addClass(d.className);da=d.className;d.closeButton?Y.html(d.close).appendTo(y):Y.appendTo("<div/>");if(!E&&(E=R=!0,m.css({visibility:"hidden",display:"block"}),
t=e(q,"LoadedContent","width:0; height:0; overflow:hidden"),y.css({width:"",height:""}).append(t),F=ea.height()+fa.height()+y.outerHeight(!0)-y.height(),G=P.width()+ca.width()+y.outerWidth(!0)-y.width(),K=t.outerHeight(!0),L=t.outerWidth(!0),d.w=g(d.initialWidth,"x"),d.h=g(d.initialHeight,"y"),t.css({width:"",height:d.h}),s.position(),n(pa,d.onOpen),ga.add(ha).hide(),m.focus(),d.trapFocus&&b.addEventListener&&(b.addEventListener("focus",z,!0),B.one(aa,function(){b.removeEventListener("focus",z,!0)})),
d.returnFocus))B.one(aa,function(){a(u).focus()});J()}}function H(){!m&&b.body&&(ia=!1,D=a(c),m=e(q).attr({id:x,"class":!1===a.support.opacity?k+"IE":"",role:"dialog",tabindex:"-1"}).hide(),w=e(q,"Overlay").hide(),Z=a([e(q,"LoadingOverlay")[0],e(q,"LoadingGraphic")[0]]),C=e(q,"Wrapper"),y=e(q,"Content").append(ha=e(q,"Title"),ja=e(q,"Current"),S=a('<button type="button"/>').attr({id:k+"Previous"}),T=a('<button type="button"/>').attr({id:k+"Next"}),N=e("button","Slideshow"),Z),Y=a('<button type="button"/>').attr({id:k+
"Close"}),C.append(e(q).append(e(q,"TopLeft"),ea=e(q,"TopCenter"),e(q,"TopRight")),e(q,!1,"clear:left").append(P=e(q,"MiddleLeft"),y,ca=e(q,"MiddleRight")),e(q,!1,"clear:left").append(e(q,"BottomLeft"),fa=e(q,"BottomCenter"),e(q,"BottomRight"))).find("div div").css({"float":"left"}),U=e(q,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),ga=T.add(S).add(ja).add(N),a(b.body).append(w,m.append(C,U)))}function $(){function c(a){1<a.which||a.shiftKey||a.altKey||a.metaKey||
a.ctrlKey||(a.preventDefault(),A(this))}if(m){if(!ia)if(ia=!0,T.click(function(){s.next()}),S.click(function(){s.prev()}),Y.click(function(){s.close()}),w.click(function(){d.overlayClose&&s.close()}),a(b).bind("keydown."+k,function(a){var b=a.keyCode;E&&d.escKey&&27===b&&(a.preventDefault(),s.close());E&&d.arrowKey&&r[1]&&!a.altKey&&(37===b?(a.preventDefault(),S.click()):39===b&&(a.preventDefault(),T.click()))}),a.isFunction(a.fn.on))a(b).on("click."+k,"."+M,c);else a("."+M).live("click."+k,c);return!0}return!1}
function J(){var f,h,m=s.prep,la,ma=++ka;R=!0;l=!1;u=r[v];I();n(X);n(V,d.onLoad);d.h=d.height?g(d.height,"y")-K-F:d.innerHeight&&g(d.innerHeight,"y");d.w=d.width?g(d.width,"x")-L-G:d.innerWidth&&g(d.innerWidth,"x");d.mw=d.w;d.mh=d.h;d.maxWidth&&(d.mw=g(d.maxWidth,"x")-L-G,d.mw=d.w&&d.w<d.mw?d.w:d.mw);d.maxHeight&&(d.mh=g(d.maxHeight,"y")-K-F,d.mh=d.h&&d.h<d.mh?d.h:d.mh);f=d.href;na=setTimeout(function(){Z.show()},100);d.inline?(la=e(q).hide().insertBefore(a(f)[0]),B.one(X,function(){la.replaceWith(t.children())}),
m(a(f))):d.iframe?m(" "):d.html?m(d.html):d.photo||d.photoRegex.test(f)?(f=p(d,f),l=b.createElement("img"),a(l).addClass(k+"Photo").bind("error",function(){d.title=!1;m(e(q,"Error").html(d.imgError))}).one("load",function(){var b;ma===ka&&(a.each(["alt","longdesc","aria-describedby"],function(b,d){var c=a(u).attr(d)||a(u).attr("data-"+d);c&&l.setAttribute(d,c)}),d.retinaImage&&1<c.devicePixelRatio&&(l.height/=c.devicePixelRatio,l.width/=c.devicePixelRatio),d.scalePhotos&&(h=function(){l.height-=l.height*
b;l.width-=l.width*b},d.mw&&l.width>d.mw&&(b=(l.width-d.mw)/l.width,h()),d.mh&&l.height>d.mh&&(b=(l.height-d.mh)/l.height,h())),d.h&&(l.style.marginTop=Math.max(d.mh-l.height,0)/2+"px"),r[1]&&(d.loop||r[v+1])&&(l.style.cursor="pointer",l.onclick=function(){s.next()}),l.style.width=l.width+"px",l.style.height=l.height+"px",setTimeout(function(){m(l)},1))}),setTimeout(function(){l.src=f},1)):f&&U.load(f,d.data,function(b,c){ma===ka&&m("error"===c?e(q,"Error").html(d.xhrError):a(this).contents())})}
var O={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",
slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1},x="colorbox",k="cbox",M=k+"Element",pa=k+"_open",V=k+"_load",W=k+"_complete",ba=k+"_cleanup",aa=k+"_closed",
X=k+"_purge",w,m,C,y,ea,P,ca,fa,r,D,t,U,Z,ha,ja,N,T,S,Y,ga,B=a("<a/>"),d,F,G,K,L,u,v,l,E,R,Q,na,s,q="div",da,ka=0,oa={},ia,qa=function(){function a(){clearTimeout(n)}function b(){if(d.loop||r[v+1])a(),n=setTimeout(s.next,d.slideshowSpeed)}function c(){N.html(d.slideshowStop).unbind(l).one(l,e);B.bind(W,b).bind(V,a);m.removeClass(h+"off").addClass(h+"on")}function e(){a();B.unbind(W,b).unbind(V,a);N.html(d.slideshowStart).unbind(l).one(l,function(){s.next();c()});m.removeClass(h+"on").addClass(h+"off")}
function f(){g=!1;N.hide();a();B.unbind(W,b).unbind(V,a);m.removeClass(h+"off "+h+"on")}var g,h=k+"Slideshow_",l="click."+k,n;return function(){g?d.slideshow||(B.unbind(ba,f),f()):d.slideshow&&r[1]&&(g=!0,B.one(ba,f),d.slideshowAuto?c():e(),N.show())}}();a.colorbox||(a(H),s=a.fn[x]=a[x]=function(b,d){var c=this;b=b||{};H();if($()){if(a.isFunction(c))c=a("<a/>"),b.open=!0;else if(!c[0])return c;d&&(b.onComplete=d);c.each(function(){a.data(this,x,a.extend({},a.data(this,x)||O,b))}).addClass(M);(a.isFunction(b.open)&&
b.open.call(c)||b.open)&&A(c[0])}return c},s.position=function(b,c){function e(){ea[0].style.width=fa[0].style.width=y[0].style.width=parseInt(m[0].style.width,10)-G+"px";y[0].style.height=P[0].style.height=ca[0].style.height=parseInt(m[0].style.height,10)-F+"px"}var h,l=0,n=0,p=m.offset(),q,r;D.unbind("resize."+k);m.css({top:-9E4,left:-9E4});q=D.scrollTop();r=D.scrollLeft();d.fixed?(p.top-=q,p.left-=r,m.css({position:"fixed"})):(l=q,n=r,m.css({position:"absolute"}));n=!1!==d.right?n+Math.max(D.width()-
d.w-L-G-g(d.right,"x"),0):!1!==d.left?n+g(d.left,"x"):n+Math.round(Math.max(D.width()-d.w-L-G,0)/2);l=!1!==d.bottom?l+Math.max(f()-d.h-K-F-g(d.bottom,"y"),0):!1!==d.top?l+g(d.top,"y"):l+Math.round(Math.max(f()-d.h-K-F,0)/2);m.css({top:p.top,left:p.left,visibility:"visible"});C[0].style.width=C[0].style.height="9999px";h={width:d.w+L+G,height:d.h+K+F,top:l,left:n};if(b){var t=0;a.each(h,function(a){h[a]!==oa[a]&&(t=b)});b=t}oa=h;b||m.css(h);m.dequeue().animate(h,{duration:b||0,complete:function(){e();
R=!1;C[0].style.width=d.w+L+G+"px";C[0].style.height=d.h+K+F+"px";d.reposition&&setTimeout(function(){D.bind("resize."+k,function(){s.position()})},1);a.isFunction(c)&&c()},step:e})},s.resize=function(a){var b;E&&(a=a||{},a.width&&(d.w=g(a.width,"x")-L-G),a.innerWidth&&(d.w=g(a.innerWidth,"x")),t.css({width:d.w}),a.height&&(d.h=g(a.height,"y")-K-F),a.innerHeight&&(d.h=g(a.innerHeight,"y")),a.innerHeight||a.height||(b=t.scrollTop(),t.css({height:"auto"}),d.h=t.height()),t.css({height:d.h}),b&&t.scrollTop(b),
s.position("none"===d.transition?0:d.speed))},s.prep=function(c){function f(){d.w=d.w||t.width();d.w=d.mw&&d.mw<d.w?d.mw:d.w;return d.w}function g(){d.h=d.h||t.height();d.h=d.mh&&d.mh<d.h?d.mh:d.h;return d.h}if(E){var u,w="none"===d.transition?0:d.speed;t.empty().remove();t=e(q,"LoadedContent").append(c);t.hide().appendTo(U.show()).css({width:f(),overflow:d.scrolling?"auto":"hidden"}).css({height:g()}).prependTo(y);U.hide();a(l).css({"float":"none"});u=function(){function c(){!1===a.support.opacity&&
m[0].style.removeAttribute("filter")}var f=r.length,g,l;E&&(l=function(){clearTimeout(na);Z.hide();n(W,d.onComplete)},ha.html(d.title).add(t).show(),1<f?("string"===typeof d.current&&ja.html(d.current.replace("{current}",v+1).replace("{total}",f)).show(),T[d.loop||v<f-1?"show":"hide"]().html(d.next),S[d.loop||v?"show":"hide"]().html(d.previous),qa(),d.preloading&&a.each([h(-1),h(1)],function(){var c,d;d=r[this];var e=a.data(d,x);e&&e.href?(c=e.href,a.isFunction(c)&&(c=c.call(d))):c=a(d).attr("href");
c&&(e.photo||e.photoRegex.test(c))&&(c=p(e,c),d=b.createElement("img"),d.src=c)})):ga.hide(),d.iframe?(g=e("iframe")[0],"frameBorder"in g&&(g.frameBorder=0),"allowTransparency"in g&&(g.allowTransparency="true"),d.scrolling||(g.scrolling="no"),a(g).attr({src:d.href,name:(new Date).getTime(),"class":k+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",l).appendTo(t),B.one(X,function(){g.src="//about:blank"}),d.fastIframe&&a(g).trigger("load")):l(),"fade"===d.transition?
m.fadeTo(w,1,c):c())};"fade"===d.transition?m.fadeTo(w,0,function(){s.position(0,u)}):s.position(w,u)}},s.next=function(){!R&&r[1]&&(d.loop||r[v+1])&&(v=h(1),A(r[v]))},s.prev=function(){!R&&r[1]&&(d.loop||v)&&(v=h(-1),A(r[v]))},s.close=function(){E&&!Q&&(Q=!0,E=!1,n(ba,d.onCleanup),D.unbind("."+k),w.fadeTo(d.fadeOut||0,0),m.stop().fadeTo(d.fadeOut||0,0,function(){m.add(w).css({opacity:1,cursor:"auto"}).hide();n(X);t.empty().remove();setTimeout(function(){Q=!1;n(aa,d.onClosed)},1)}))},s.remove=function(){m&&
(m.stop(),a.colorbox.close(),m.stop().remove(),w.remove(),Q=!1,m=null,a("."+M).removeData(x).removeClass(M),a(b).unbind("click."+k))},s.element=function(){return a(u)},s.settings=O)})(jQuery,document,window);