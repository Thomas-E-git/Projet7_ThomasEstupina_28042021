(function(t){function e(e){for(var r,a,i=e[0],s=e[1],c=e[2],l=0,f=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);p&&p(e);while(f.length)f.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var t,e=0;e<u.length;e++){for(var n=u[e],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(u.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},a={app:0},o={app:0},u=[];function i(t){return s.p+"js/"+({about:"about"}[t]||t)+"."+{about:"3072ea38"}[t]+".js"}function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n={about:1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise((function(e,n){for(var r="css/"+({about:"about"}[t]||t)+"."+{about:"d4b77489"}[t]+".css",o=s.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var c=u[i],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===r||l===o))return e()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){c=f[i],l=c.getAttribute("data-href");if(l===r||l===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var r=e&&e.target&&e.target.src||o,u=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[t],p.parentNode.removeChild(p),n(u)},p.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(p)})).then((function(){a[t]=0})));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var u=new Promise((function(e,n){r=o[t]=[e,n]}));e.push(r[2]=u);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=i(t);var f=new Error;c=function(e){l.onerror=l.onload=null,clearTimeout(p);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;f.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[t]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(e)},s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var f=0;f<c.length;f++)e(c[f]);var p=l;u.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},3888:function(t,e,n){t.exports=n.p+"img/icon-left-font-monochrome-white.4891a9da.svg"},"3d9a":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Nav"),n("Router-view")],1)},o=[],u=n("1da1"),i=(n("96cf"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"row"},[r("b-navbar",{staticClass:"col navbar-dark bg-primary d-flex justify-content-around",attrs:{toggleable:"lg"}},[r("router-link",{staticClass:"navbar-brand w-auto",attrs:{to:"/"}},[r("img",{staticClass:"img-fluid w-75",attrs:{src:n("3888"),alt:"logo Groupomania"}})]),r("b-navbar-toggle",{attrs:{target:"navbarContent"}}),r("b-collapse",{staticClass:"font-weight-bold",attrs:{id:"navbarContent","is-nav":""}},[t.user?t._e():r("b-navbar-nav",{staticClass:"ml-auto"},[r("b-nav-item",[r("router-link",{staticClass:"nav-link h5 text-light",attrs:{to:"/login"}},[t._v("Connexion")])],1),r("b-nav-item",[r("router-link",{staticClass:"nav-link nav-link h5 text-light",attrs:{to:"/register"}},[t._v("Créer un compte")])],1)],1),t.user?r("b-navbar-nav",{staticClass:"ml-auto"},[r("b-nav-item",[r("router-link",{staticClass:"nav-link nav-link h5 text-light",attrs:{to:"/forum"}},[t._v("Forum")])],1),r("b-nav-item",[r("router-link",{staticClass:"nav-link nav-link h5 text-light",attrs:{to:"/profil"}},[t._v("Profil")])],1),r("b-nav-item",[r("a",{staticClass:"nav-link h5 text-light",attrs:{href:"javascript:void(0)"},on:{click:t.handleClick}},[t._v("Déconnexion")])])],1):t._e()],1)],1)],1)])}),s=[],c=n("5530"),l=n("2f62"),f={name:"Nav",methods:{handleClick:function(){localStorage.removeItem("token"),this.$store.dispatch("user",null),this.$router.push("/")}},computed:Object(c["a"])({},Object(l["b"])(["user"]))},p=f,m=(n("e99a"),n("2877")),d=Object(m["a"])(p,i,s,!1,null,"04678fc2",null),h=d.exports,b=n("bc3a"),v=n.n(b),g={name:"App",components:{Nav:h},beforeCreate:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("users/me");case 2:n=e.sent,t.$store.dispatch("user",n.data);case 4:case"end":return e.stop()}}),e)})))()}},k=g,w=(n("5c0b"),Object(m["a"])(k,a,o,!1,null,null,null)),y=w.exports,x=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f"));r["default"].use(x["a"]);var P=x["a"].prototype.push;x["a"].prototype.push=function(t){return P.call(this,t).catch((function(t){return t}))};var C=[{path:"/",name:"Home",component:function(){return n.e("about").then(n.bind(null,"bb51"))}},{path:"/register",name:"Register",component:function(){return n.e("about").then(n.bind(null,"1feb"))}},{path:"/login",name:"Login",component:function(){return n.e("about").then(n.bind(null,"578a"))}},{path:"/profil",name:"Profil",component:function(){return n.e("about").then(n.bind(null,"2768"))}},{path:"/post",name:"NewPost",component:function(){return n.e("about").then(n.bind(null,"6e73"))}},{path:"/user/:userId",name:"OthersProfil",component:function(){return n.e("about").then(n.bind(null,"37f9"))}},{path:"/profil/modify",name:"ModifyProfil",component:function(){return n.e("about").then(n.bind(null,"9b27"))}},{path:"/post/:topicId",name:"ModifyPost",component:function(){return n.e("about").then(n.bind(null,"97fc"))}},{path:"/forum",name:"Forum",component:function(){return n.e("about").then(n.bind(null,"5916"))}}],O=new x["a"]({mode:"history",routes:C}),S=O;n("bb36");r["default"].use(l["a"]);var j=new l["a"].Store({state:{user:null,allPosts:[],likes:[],likeStatus:[],usersPosts:[]},getters:{user:function(t){return t.user},posts:function(t){return t.usersPosts},likes:function(t){return t.likes},likeStatus:function(t){return t.likeStatus},usersPosts:function(t){return t.usersPosts}},mutations:{user:function(t,e){t.user=e},SET_POSTS:function(t,e){t.allPosts=e},likes:function(t,e){t.likes=e},likeStatus:function(t,e){t.likeStatus=e},usersPosts:function(t,e){t.usersPosts=e}},actions:{user:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.commit("user",e);case 2:case"end":return n.stop()}}),n)})))()},getAllPosts:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.commit("SET_POSTS",e);case 2:case"end":return n.stop()}}),n)})))()},getLikes:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.commit("likes",e);case 2:case"end":return n.stop()}}),n)})))()},getUserLikeStatus:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.commit("likeStatus",e);case 2:case"end":return n.stop()}}),n)})))()},getUsersPosts:function(t,e){return Object(u["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.commit("usersPosts",e);case 2:case"end":return n.stop()}}),n)})))()}}}),_=n("5f5b"),R=n("b1e0");n("de82"),n("15f5"),n("7051");r["default"].use(_["a"]),r["default"].use(R["a"]),r["default"].config.productionTip=!1,new r["default"]({router:S,store:j,render:function(t){return t(y)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"9c0c":function(t,e,n){},bb36:function(t,e,n){"use strict";var r=n("bc3a"),a=n.n(r);a.a.defaults.baseURL="http://localhost:8080/api/",a.a.defaults.headers.common["Authorization"]="Bearer "+localStorage.getItem("token")},de82:function(t,e,n){},e99a:function(t,e,n){"use strict";n("3d9a")}});
//# sourceMappingURL=app.5836960a.js.map