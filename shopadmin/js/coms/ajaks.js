void function(){var c=new Hash();try{c.empty.periodical(60*1000,c)}catch(d){}var b=new Class({Extends:Ajax,initialize:function(f,e){c.set(f,"init");this.addEvent("onCancel",function(){c.set(f,"cancel")});this.parent(f,e)},send:function(h,g){c.set(this.url,"request");if(!this.check(arguments.callee,g)){return this}this.running=true;var i=$type(g);if(i=="string"||i=="element"){g={data:g}}var f=this.options;g=$extend({data:f.data,url:h,method:f.method},g);var k=g.data,h=g.url,m=g.method;switch($type(k)){case"element":k=$(k).toQueryString();break;case"object":case"hash":k=Hash.toQueryString(k)}if(this.options.urlEncoded&&"post"==m.toLowerCase()){var j=(this.options.encoding)?"; charset="+this.options.encoding:"";this.headers.set("Content-type","application/x-www-form-urlencoded"+j)}if(k&&"get"==m.toLowerCase()){h=h+(h.contains("?")?"&":"?")+k;k=null}h+="&_ajax=true";if(W){h+="&_ss="+W.sideStore}this.xhr.open(m.toUpperCase(),h,this.options.async);this.xhr.onreadystatechange=this.onStateChange.bind(this);this.headers.each(function(n,e){if(!$try(function(){this.xhr.setRequestHeader(e,n);return true}.bind(this))){this.fireEvent("exception",[e,n])}},this);this.loadMask("onrequest",$(this.options.update));if(window.ie&&this.options.update&&$(this.options.update)){try{$ES("iframe",this.options.update).each(function(n){n.remove()})}catch(l){}}this.fireEvent("request");this.xhr.send(k);if(!this.options.async){this.onStateChange()}return this},onFailure:function(){if($chk($("loadMask"))){this.loadMask("onfailure")}switch(this.transport.status){case 404:MessageBox.error("页面未找到.");break;case 401:new Dialog("401.html",{ajaksable:false,modal:true,width:300,height:150,resizeable:false});break;case 403:MessageBox.error("您无此操作的权限.");break}c.set(this.url,"failure");this.fireEvent("onFailure",this.transport)},onException:function(f,e){if($chk($("loadMask"))){this.loadMask("onException")}MessageBox.error("出现错误:"+f+":"+e)},success:function(i,g){var f=this.options;var e=this.response;var h=$(f.update);e.html=i.stripScripts(function(j){e.javascript=j});e.html=this.processHTML(e.html);if(!h){MessageBox.show(e.html);this.onSuccess(e.html);this.loadMask("complete");return}if(f.elMap){$each(f.elMap,function(k,j){if(j==".sideContent"){return}$(k).empty().setStyle("fontSize",0)});e.html=e.html.replace(/<\!-{5}(.*?)-{5}([\s\S]*?)-{5}(.*?)-{5}>/g,function(){if(f.elMap[arguments[1]]){if(arguments[1]==".sideContent"&&arguments[2]){f.elMap[arguments[1]].adopt(new Element("div").setHTML(arguments[2]).getFirst().setStyle("display","none"))}else{f.elMap[arguments[1]].set("html",arguments[2]).setStyle("fontSize","")}}return""});updateSize()}h.empty().setHTML(e.html);if(f.evalScripts){$exec(e.javascript)}makeAjaksLink(h);this.onSuccess(e.html,null,f,null,e.javascript);this.loadMask("oncomplete");document.title=$("shop_title_block").getText()+" - Powered By ShopEx"},loadMask:function(e,g){g=$(g);var f=g||window;switch(e){case"onrequest":return $("loadMask").amongTo(window).show();default:$("loadMask").hide();c.set(this.url,"success")}}});ShopEx_AdminXHR=new Class({options:{evalScripts:true,autoCancel:true,method:"get",elMap:false,data:null,link:"cancel"},initialize:function(){this.historyMangerInit.call(this);$$("#mainMenus a[name]").addEvent("click",function(f){f.stop();document.body.fireEvent("click",{target:this,stop:$empty})})},historyMangerInit:function(){try{this.history=historyManager.register("page",["ctl=dashboard&act=getInfo"],function(e,i){var h=this.options;if($("main")){var g="index.php?"+(e.input?e.input:i[0]);return this.page(g)}}.bind(this),function(e){return e[0]},".*");historyManager.start()}catch(f){MessageBox.error(f.message)}},page:function(){var i=Array.flatten(arguments).link({url:String.type,options:Object.type,sponsor:Element.type});if(["request","init"].indexOf(c.get(f))>-1){return $("loadMask").amongTo(window).show()}var g=$merge(this.options,i.options);var f=i.url;var h=i.sponsor;if(g.autoCancel&&this.curAjax){this.curAjax.cancel()}if($type(g.data)=="element"){if(!$(g.data).bindValidator("x-input")){return $("loadMask").hide()}}g.update=g.update||$($chk(h)?$(h).getContainer():false)||"main";if(g.update=="main"||($type(g.update)=="element"&&g.update.id=="main")){var e=f.match("index\\.php\\?(.*)");if(e){this.history.setValue(0,e[1])}if(!g.elMap){g.elMap={".mainHead":$("headBar"),".mainFoot":$("footBar")}}}$extend(g.elMap,{".sideContent":$("sidecontent")});this.curAjax=new b(f,g);this.curAjax.request()}});var a=function(g){var h=location.hash.slice(1);if(!$("sidecontent").retrieve("info")){return}var f=$("sidecontent").retrieve("info").cur;var j=$("sidecontent").retrieve("curAction");var e=$("mainMenus").retrieve("curAction");if(j){j.removeClass("cur")}if(e){e.removeClass("current")}var k=$("submenu_"+f).getElement("a[href$="+h+"]");if(k){$("sidecontent").store("curAction",k.addClass("cur"))}var i=$("mainMenus").getElement("a[name="+g+"]");if(i){$("mainMenus").store("curAction",i.addClass("current"))}};SideRender=function(g){if(!g){return}var f=$("sidecontent");var h=f.retrieve("info",{cur:g,store:[]});var i=h.store;var e=h.cur;$("submenu_"+e).hide();$("submenu_"+g).show();h.cur=g;a(g);if(i.indexOf(g)>-1){return}i.include(g);if(W){W.sideStore=i.join(",")}showSide()};void function(){var f=function(g){if(g.getTag()!="a"){g=g.getParent("a")}if(!g){return false}if((!$chk($(g).target)||g.target.test("{","i"))&&!g.href.match(/^javascript.+/i)&&!g.onclick){return g}if(g.get("target")=="_blank"&&g.href.contains(SHOPADMINDIR)){return g}return false};var e=function(g){if(g.getTag()!="form"){return false}return $chk($(g).getProperty("action"))&&(!$chk(g.target)||g.target.test("{","i"))&&!g.onsubmit};$(document.body).addEvents({click:function(j){var i=f($(j.target));if(!i){return}j.stop();if(i.get("target")=="_blank"){return _open(i.href)}var k;try{k=Json.evaluate(i.target)}catch(j){if($chk(i.href)){return W.page(i.href,i)}return false}if(dlg=i.get("dialog")){var h={title:$pick(i.title,i.get("text")),width:window.getSize().x*0.7,height:window.getSize().y*0.7};dlg=JSON.decode(dlg);dlg=$type(dlg)=="object"?dlg:{};h=$extend(h,dlg);return new Dialog(i.href,h)}if("fm" in k&&$chk(k.fm)){var l=false;k.update=(k.update||"main");if(k.update=="main"||(k.update.id&&k.update.id=="main")){[$("footBar"),$("headBar")].each(Element.empty);updateSize()}var g=new Element("iframe",{name:k.fm,styles:{width:"100%",height:"98%",border:"none","overflow-y":"scroll"}}).inject($(k.update).empty());g.setProperty("src",i.href)}else{if(j.shift){return open(i.href.replace("?","#"))}W.page(i.href,k,i)}},submit:function(k){var h=$(k.target);if(e(h)){k.stop();new Element("input",{type:"hidden",value:1,name:"__"}).inject(h);if(!h.bindValidator("x-input")){return $("loadMask").hide()}$ES("textarea[ishtml=true]",h).getValue();var j=h.getProperty("action");var i=i||{};if(h.target.test("{","i")){try{i=Json.evaluate(h.target)}catch(k){}}if(f_target_obj=h.retrieve("target")){$extend(i,f_target_obj)}if(k.requestOptions){$extend(i,k.requestOptions)}var g=$ES('input[type="file"]',h);if(g.length>0&&g.some(function(l){return l.value})){MODALPANEL.show();$("loadMask").amongTo(window).show();if(!$("upload_iframe")){new Element("iframe",{id:"upload_iframe",name:"upload_iframe",styles:{display:"none"}}).inject(document.body)}if(h.target){h.store("reset_target",h.target)}h.setProperty("target","upload_iframe");h.set({enctype:"multipart/form-data",encoding:"multipart/form-data"});h.setProperty("action",h.getProperty("action")+"&_upload=true");window.upload_rs_el=i&&i.ure?i.ure:$(k.target).getContainer();h.submit();h.retrieve("reset_target")?h.target=h.retrieve("reset_target"):h.target="";return h.removeProperties("enctype","encoding")}if(i){if("fm" in i){h.setProperty("target",ftarget.fm);return h.submit()}return W.page(j,$extend(i,{method:h.getProperty("method"),data:h.toQueryString()}),h)}W.page(j,{method:h.getProperty("method"),data:h.toQueryString()},h)}}})}();makeAjaksLink=function(e){$(e).getElements("form").addEvent("submit",function(g){var f=g?(g.stop?g.stop:$empty):$empty;document.body.fireEvent("submit",$extend((g||{}),{target:this,stop:f}))})};Splash={go:function(g,f,e){$$($("loadMaks"),MODALPANEL).hide();(function(){var j=$$($("successSplash"),$("noticeSplash"),$("failedSplash"));var i;var h=j.some(function(k){if($chk(k)){i=k;return true}});if(i){W.page(g,JSON.decode(e),i)}}).delay(f.toInt())}}}();