(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1938],{1834:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/modules/multiple-regression",function(){return r(19487)}])},58544:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(85893),i=r(41664),a=r.n(i),o=r(35005);function s(e){var t=e.children;return(0,n.jsx)("div",{className:"wrapper",children:(0,n.jsxs)("div",{"data-testid":"sim-container",style:{paddingBottom:25},children:[(0,n.jsx)(a(),{href:"/menu",passHref:!0,children:(0,n.jsx)(o.Z,{className:"home-button",variant:"outline-danger",id:"Menu",style:{margin:15},children:"MENU"})}),(0,n.jsx)("div",{className:"mini-logo"}),t]})})}},18448:function(e,t,r){"use strict";r.d(t,{Z:function(){return h}});var n=r(85893),i=r(35005),a=r(2086),o=r(45697),s=r.n(o),u=r(22852),c=r(78524),l=r.n(c),f=r(74645);function h(e){var t=e.options,r=e.select,o=e.selected,s=(0,f.Z)(),u=t.map((function(e){return(0,n.jsx)(i.Z,{className:o===e?l().selected:l().unselected,variant:o===e?l().selected:l().unselected,onClick:function(){return r(e)},children:e},"".concat(e))}));return(0,n.jsx)("div",{className:l().container,children:(0,n.jsx)(a.Z,{size:s.isMobile?"sm":void 0,children:u})})}h.propTypes={options:s().arrayOf(u.yd).isRequired,select:s().func.isRequired,selected:u.yd}},58835:function(e,t,r){"use strict";r.d(t,{Z:function(){return u}});var n=r(85893),i=r(88375),a=r(45697),o=r.n(a),s=r(22852);function u(e){var t=e.name,r=e.text;return(0,n.jsxs)(i.Z,{className:"sim-description",variant:"primary","data-testid":"".concat(t,"-into"),children:[(0,n.jsx)(i.Z.Heading,{children:t}),(0,n.jsx)("hr",{}),r]})}u.propTypes={name:o().string.isRequired,text:s.yd.isRequired}},61284:function(e,t,r){"use strict";r.d(t,{$:function(){return c}});var n=r(34051),i=r.n(n),a=r(57460),o=r.n(a);function s(e,t,r,n,i,a,o){try{var s=e[a](o),u=s.value}catch(c){return void r(c)}s.done?t(u):Promise.resolve(u).then(n,i)}function u(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var a=e.apply(t,r);function o(e){s(a,n,i,o,u,"next",e)}function u(e){s(a,n,i,o,u,"throw",e)}o(void 0)}))}}function c(e,t){return l.apply(this,arguments)}function l(){return(l=u(i().mark((function e(t,r){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o().parse(t,{download:!0,skipEmptyLines:!0,complete:function(e){r(e.data.slice(1))}});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},95401:function(e,t,r){"use strict";r.d(t,{Mc:function(){return j},N1:function(){return I},PW:function(){return R},bd:function(){return D},d5:function(){return C},dn:function(){return O},gT:function(){return v},oq:function(){return S},uR:function(){return E},uZ:function(){return _},xh:function(){return A}});var n=r(88320),i=r(37126),a=r.n(i),o=r(96486),s=r.n(o),u=r(2162),c=r(68856),l=r(22254),f=r.n(l);function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){d(e,t,r[t])}))}return e}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,a=[],o=!0,s=!1;try{for(r=r.call(e);!(o=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);o=!0);}catch(u){s=!0,i=u}finally{try{o||null==r.return||r.return()}finally{if(s)throw i}}return a}}(e,t)||y(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||y(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){if(e){if("string"===typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}var v=function(e){var t=[];return s().entries(s().countBy(e)).forEach((function(e){for(var r=m(e,2),n=r[0],i=r[1],a=1;a<=i;a++)t.push({x:+n,y:a})})),t},_=function(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;return a().rnorm(e,t,r).map((function(e){return s().round(e,n)}))},b=function(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;return a().runif(e,t,r).map((function(e){return s().round(e,n)}))},x=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;return a().rexp(e,t).map((function(e){return s().round(e,r)}))},k=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;return a().rchisq(e,t).map((function(e){return s().round(e,r)}))},w=function(e,t,r,n,i){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:5,u=a().rnorm(e,t,n).map((function(e){return s().round(e,o)})),c=a().rnorm(e,r,i).map((function(e){return s().round(e,o)}));return s().sampleSize(g(u).concat(g(c)),2e3)},S=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.mean,i=void 0===n?64:n,a=r.standardDev,o=void 0===a?3:a,u=r.low,c=void 0===u?-10:u,l=r.hi,f=void 0===l?10:l,h=r.lambda,d=void 0===h?1/64:h,m=r.degreesOfFreedom,g=void 0===m?8:m,y=r.mysteryMean1,S=void 0===y?58:y,E=r.mysteryMean2,C=void 0===E?70:E,R=r.mysterySD1,O=void 0===R?1:R,j=r.mysterySD2,A=void 0===j?3:j,D=r.precision,I=void 0===D?1:D,z={Normal:function(){return _(t,i,o,I)},Uniform:function(){return b(t,c,f,I)},Exponential:function(){return x(t,d,I)},"Chi-Squared":function(){return k(t,g,I)},Mystery:function(){return w(t,S,C,O,A,I)}},T=z[e]();return s().shuffle(v(T)).map((function(e,t){return p({},e,{id:t+1})}))},E=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x";return e.length>0?(0,n.J69)(e.map((function(e){return e[t]}))):void 0},C=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x";return e.length>0?(0,n.qoR)(e.map((function(e){return e[t]}))):void 0},R=function(e,t,r,i,a){return"Z"===e?u.jStat.zscore(t,r,i/(0,n._b3)(a)):u.jStat.tscore(t,r,i,a)},O=function(e,t,r,i,a,o){return(e-t)/(0,n._b3)(Math.pow(r,2)/a+Math.pow(i,2)/o)},j=function(e,t,r,n,i){var a="Z"===e?u.jStat.ztest(t,i):u.jStat.ttest(t,n-1,i);return">"===r&&t<0||"<"===r&&t>=0?1-a:a},A=function(e,t,r,n,i,o){var u=[[n*n,o*n*i],[o*n*i,i*i]],l=(0,c.Z)([t,r],u);return a().rnorm(e,0,5).map((function(e){var t=m(l.sample(),2),r=t[0],n=40+3*r+2.5*t[1]+e;return{x:s().clamp(s().round(r,2),0,15),y:s().clamp(s().round(n,2),0,100)}}))},D=function(e,t,r,n){return e.map((function(e){return p({},e,d({},n,(e[n]-t)/(r||1)))}))},I=function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(e.every((function(e){return s().isArray(e)})))t=e;else{if(!e.every((function(e){return s().isObject(e)})))throw new Error;t=e.map((function(e){return[e.x,e.y]}))}var n=f().linear(t,{precision:r}).equation;return{slope:n[0],intercept:n[1]}}},74645:function(e,t,r){"use strict";var n=r(67294);t.Z=function(){var e=(0,n.useState)({width:void 0,height:void 0,isMobile:!1}),t=e[0],r=e[1];return(0,n.useEffect)((function(){var e=function(){r({width:window.innerWidth,height:window.innerHeight,isMobile:window.innerWidth<768})};return e(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),t}},19487:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return j}});var n=r(85893),i=r(58835),a=r(67294),o=r(96486),s=r.n(o),u=r(88320),c=r(45697),l=r.n(c),f=r(2828),h=r(21608),d=r(31555),p=r(99301),m=r(35005),g=r(95401),y=r(5152);function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,a=[],o=!0,s=!1;try{for(r=r.call(e);!(o=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);o=!0);}catch(u){s=!0,i=u}finally{try{o||null==r.return||r.return()}finally{if(s)throw i}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var b=r.n(y)()((function(){return Promise.all([r.e(2960),r.e(8660)]).then(r.bind(r,58660))}),{loadableGenerated:{webpack:function(){return[58660]}},ssr:!1,loading:function(){return(0,n.jsx)("div",{style:{width:800,height:700}})}});function x(e){var t=e.x,r=e.y,i=e.z,o=e.dataSet,c=(0,a.useState)("3D"),l=c[0],y=c[1],v=(0,a.useState)(!1),x=v[0],k=v[1],w=f.oQ[o][l],S=[{x:"YZ"===l?r:t,y:"XY"===l||"3D"===l?r:i,z:i,type:"3D"===l?"scatter3d":"scatter",mode:"markers",marker:{size:"3D"===l?8:12,color:"red",line:{color:"black",width:"3D"===l?1:.5}},hovertemplate:"".concat(w.xAbbr,": %{x}<br>").concat(w.yAbbr,": %{y}<br>").concat("3D"===l?"".concat(w.zAbbr,": %{z}"):"","<extra></extra>")}],E="";if("3D"===l&&x){var C=function(e){for(var r=s().range(0,s().floor((0,u.VV$)(t))).map((function(){})),n=s().floor((0,u.VV$)(t));n<=s().ceil((0,u.Fp7)(t));n++)r.push(j(n,e));A.push(r)},R=(0,u.pIu)(s().zip(s().range(0,t.length).map((function(){return 1})),t,r)),O=(0,u.JpY)((0,u.JBn)((0,u.JpY)((0,u.p4s)(R),R)),(0,u.JpY)((0,u.p4s)(R),(0,u.pIu)(i)));E="".concat(w.zAbbr,"\u1d62 = ").concat(s().round((0,u.$QP)([O],0),2)," + ").concat(s().round((0,u.$QP)([O],1),2)," * ").concat(w.xAbbr,"\u1d62 + ").concat(s().round((0,u.$QP)([O],2),2)," * ").concat(w.yAbbr,"\u1d62 + u\u1d62");for(var j=function(e,t){return(0,u.$QP)([O],0)+(0,u.$QP)([O],1)*e+(0,u.$QP)([O],2)*t},A=s().range(0,s().floor((0,u.VV$)(r))).map((function(){return s().range(0,s().ceil((0,u.Fp7)(t))).map((function(){}))})),D=s().floor((0,u.VV$)(r));D<=s().ceil((0,u.Fp7)(r));D++)C(D);S.push({z:A,type:"surface",showscale:!1,opacity:.5,hoverinfo:"x+y+z",colorscale:[[0,"rgb(0,0,0)"],[1,"rgb(0,0,0)"]],visible:"3D"===l,hovertemplate:"".concat(w.xAbbr,": %{x}<br>").concat(w.yAbbr,": %{y}<br>").concat("3D"===l?"".concat(w.zAbbr,": %{z}"):"","<extra></extra>")})}else if(x){var I={XY:s().zip(t,r),YZ:s().zip(r,i),XZ:s().zip(t,i)},z=(0,g.N1)(I[l]),T=z.slope,L=z.intercept,M=_(s().unzip(I[l].map((function(e){return[e[0],e[0]*T+L]}))),2),F=M[0],P=M[1];E="".concat(w.yAbbr,"\u1d62 = ").concat(L," + ").concat(T," * ").concat(w.xAbbr,"\u1d62 + u\u1d62"),S.push({x:F,y:P,mode:"lines",marker:{color:"black"},hovertemplate:"(%{x}, %{y})<extra></extra>"})}return(0,n.jsxs)(h.Z,{children:[(0,n.jsxs)(d.Z,{style:{width:802,padding:0},children:[(0,n.jsx)(b,{style:{border:"1px solid black"},data:S,layout:{title:{text:E,y:.95,yanchor:"top"},width:800,height:700,margin:{l:"3D"===l?0:80,r:"3D"===l?0:80,t:"3D"===l?0:80,b:"3D"===l?0:80},showlegend:!1,xaxis:{title:w.xLabel,range:w.xRange,tickvals:w.xtickvals,ticktext:w.xticktext},yaxis:{title:w.yLabel,range:w.yRange,tickvals:w.ytickvals,ticktext:w.yticktext},scene:{xaxis:{title:{text:w.xLabel},range:w.xRange,tickvals:w.xtickvals,ticktext:w.xticktext},yaxis:{title:{text:w.yLabel},range:w.yRange,tickvals:w.ytickvals,ticktext:w.yticktext},zaxis:{title:{text:w.zLabel},range:w.zRange},camera:{eye:{x:1.6,y:1.6,z:1.6}}}},config:{scrollZoom:!0,displayModeBar:!0,modeBarButtonsToRemove:["toImage","resetCameraLastSave3d","select2d","lasso2d","autoScale2d"]}}),(0,n.jsx)("p",{children:f.oQ[o].citation})]}),(0,n.jsx)(d.Z,{style:{margin:"auto",paddingLeft:50},children:(0,n.jsxs)(p.Z,{children:[["3D","XY","YZ","XZ"].map((function(e){return(0,n.jsxs)(a.Fragment,{children:[(0,n.jsx)(p.Z.Check,{checked:l===e,type:"radio",label:f.oQ[o][e].buttonLabel,onChange:function(){return y(e)}}),(0,n.jsx)("hr",{})]},e)})),(0,n.jsxs)(m.Z,{onClick:function(){return k(!x)},variant:"outline-primary",active:x,children:[x?"Hide":"Show"," Best Fit ","3D"===l?"Plane":"Line"]})]})})]})}x.propTypes={x:l().arrayOf(l().number).isRequired,y:l().arrayOf(l().number).isRequired,z:l().arrayOf(l().number).isRequired,dataSet:l().oneOf(["California Schools Data","CPS Earnings Data","CPS Log Earnings Data"]).isRequired};var k=r(18448),w=r(61284);function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,i,a=[],o=!0,s=!1;try{for(r=r.call(e);!(o=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);o=!0);}catch(u){s=!0,i=u}finally{try{o||null==r.return||r.return()}finally{if(s)throw i}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return S(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return S(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(){var e=(0,a.useState)([]),t=e[0],r=e[1],i=(0,a.useState)("California Schools Data"),o=i[0],u=i[1];(0,a.useEffect)((function(){(0,w.$)("/public/data/".concat(f.oQ[o].path),(function(e){r(e.map((function(e){return s().values(e).map((function(e){return+e}))})))}))}),[o]);var c=E(s().unzip(t),3),l=c[0],h=c[1],d=c[2];return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(k.Z,{options:["California Schools Data","CPS Earnings Data","CPS Log Earnings Data"],select:u,selected:o}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsx)(x,{x:h||[],y:d||[],z:l||[],dataSet:o})]})}function R(){return(0,n.jsxs)("div",{className:"module-container",children:[(0,n.jsx)(i.Z,{name:"Multiple Regression",text:"Unlike single variable regression, multiple regression is hard to sketch on paper. This demonstration helps visualize multiple regression when we have two regressors."}),(0,n.jsx)("br",{}),(0,n.jsx)(C,{})]})}var O=r(58544);function j(){return(0,n.jsx)(O.Z,{children:(0,n.jsx)(R,{})})}},78524:function(e){e.exports={container:"SelectorButtonGroup_container__xygrc",selected:"SelectorButtonGroup_selected___QDDN",unselected:"SelectorButtonGroup_unselected__VIO8g"}},57460:function(e,t){var r,n,i;n=[],r=function e(){"use strict";var t="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{},r=!t.document&&!!t.postMessage,n=r&&/blob:/i.test((t.location||{}).protocol),i={},a=0,o={parse:function(r,n){var s=(n=n||{}).dynamicTyping||!1;if(x(s)&&(n.dynamicTypingFunction=s,s={}),n.dynamicTyping=s,n.transform=!!x(n.transform)&&n.transform,n.worker&&o.WORKERS_SUPPORTED){var u=function(){if(!o.WORKERS_SUPPORTED)return!1;var r,n,s=(r=t.URL||t.webkitURL||null,n=e.toString(),o.BLOB_URL||(o.BLOB_URL=r.createObjectURL(new Blob(["(",n,")();"],{type:"text/javascript"})))),u=new t.Worker(s);return u.onmessage=g,u.id=a++,i[u.id]=u}();return u.userStep=n.step,u.userChunk=n.chunk,u.userComplete=n.complete,u.userError=n.error,n.step=x(n.step),n.chunk=x(n.chunk),n.complete=x(n.complete),n.error=x(n.error),delete n.worker,void u.postMessage({input:r,config:n,workerId:u.id})}var d=null;return o.NODE_STREAM_INPUT,"string"==typeof r?d=n.download?new c(n):new f(n):!0===r.readable&&x(r.read)&&x(r.on)?d=new h(n):(t.File&&r instanceof File||r instanceof Object)&&(d=new l(n)),d.stream(r)},unparse:function(e,t){var r=!1,n=!0,i=",",a="\r\n",s='"',u=s+s,c=!1,l=null,f=!1;!function(){if("object"==typeof t){if("string"!=typeof t.delimiter||o.BAD_DELIMITERS.filter((function(e){return-1!==t.delimiter.indexOf(e)})).length||(i=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(r=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(c=t.skipEmptyLines),"string"==typeof t.newline&&(a=t.newline),"string"==typeof t.quoteChar&&(s=t.quoteChar),"boolean"==typeof t.header&&(n=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");l=t.columns}void 0!==t.escapeChar&&(u=t.escapeChar+s),("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(f=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/)}}();var h=new RegExp(p(s),"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return d(null,e,c);if("object"==typeof e[0])return d(l||Object.keys(e[0]),e,c)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||l),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),d(e.fields||[],e.data||[],c);throw new Error("Unable to serialize unrecognized input");function d(e,t,r){var o="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var s=Array.isArray(e)&&0<e.length,u=!Array.isArray(t[0]);if(s&&n){for(var c=0;c<e.length;c++)0<c&&(o+=i),o+=m(e[c],c);0<t.length&&(o+=a)}for(var l=0;l<t.length;l++){var f=s?e.length:t[l].length,h=!1,d=s?0===Object.keys(t[l]).length:0===t[l].length;if(r&&!s&&(h="greedy"===r?""===t[l].join("").trim():1===t[l].length&&0===t[l][0].length),"greedy"===r&&s){for(var p=[],g=0;g<f;g++){var y=u?e[g]:g;p.push(t[l][y])}h=""===p.join("").trim()}if(!h){for(var v=0;v<f;v++){0<v&&!d&&(o+=i);var _=s&&u?e[v]:v;o+=m(t[l][_],v)}l<t.length-1&&(!r||0<f&&!d)&&(o+=a)}}return o}function m(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var n=!1;f&&"string"==typeof e&&f.test(e)&&(e="'"+e,n=!0);var a=e.toString().replace(h,u);return(n=n||!0===r||"function"==typeof r&&r(e,t)||Array.isArray(r)&&r[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1}(a,o.BAD_DELIMITERS)||-1<a.indexOf(i)||" "===a.charAt(0)||" "===a.charAt(a.length-1))?s+a+s:a}}};if(o.RECORD_SEP=String.fromCharCode(30),o.UNIT_SEP=String.fromCharCode(31),o.BYTE_ORDER_MARK="\ufeff",o.BAD_DELIMITERS=["\r","\n",'"',o.BYTE_ORDER_MARK],o.WORKERS_SUPPORTED=!r&&!!t.Worker,o.NODE_STREAM_INPUT=1,o.LocalChunkSize=10485760,o.RemoteChunkSize=5242880,o.DefaultDelimiter=",",o.Parser=m,o.ParserHandle=d,o.NetworkStreamer=c,o.FileStreamer=l,o.StringStreamer=f,o.ReadableStreamStreamer=h,t.jQuery){var s=t.jQuery;s.fn.parse=function(e){var r=e.config||{},n=[];return this.each((function(e){if("INPUT"!==s(this).prop("tagName").toUpperCase()||"file"!==s(this).attr("type").toLowerCase()||!t.FileReader||!this.files||0===this.files.length)return!0;for(var i=0;i<this.files.length;i++)n.push({file:this.files[i],inputElem:this,instanceConfig:s.extend({},r)})})),i(),this;function i(){if(0!==n.length){var t,r,i,u,c=n[0];if(x(e.before)){var l=e.before(c.file,c.inputElem);if("object"==typeof l){if("abort"===l.action)return t="AbortError",r=c.file,i=c.inputElem,u=l.reason,void(x(e.error)&&e.error({name:t},r,i,u));if("skip"===l.action)return void a();"object"==typeof l.config&&(c.instanceConfig=s.extend(c.instanceConfig,l.config))}else if("skip"===l)return void a()}var f=c.instanceConfig.complete;c.instanceConfig.complete=function(e){x(f)&&f(e,c.file,c.inputElem),a()},o.parse(c.file,c.instanceConfig)}else x(e.complete)&&e.complete()}function a(){n.splice(0,1),i()}}}function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=_(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new d(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,r){if(this.isFirstChunk&&x(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);void 0!==i&&(e=i)}this.isFirstChunk=!1,this._halted=!1;var a=this._partialLine+e;this._partialLine="";var s=this._handle.parse(a,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var u=s.meta.cursor;this._finished||(this._partialLine=a.substring(u-this._baseIndex),this._baseIndex=u),s&&s.data&&(this._rowCount+=s.data.length);var c=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(n)t.postMessage({results:s,workerId:o.WORKER_ID,finished:c});else if(x(this._config.chunk)&&!r){if(this._config.chunk(s,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);s=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(s.data),this._completeResults.errors=this._completeResults.errors.concat(s.errors),this._completeResults.meta=s.meta),this._completed||!c||!x(this._config.complete)||s&&s.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),c||s&&s.meta.paused||this._nextChunk(),s}this._halted=!0},this._sendError=function(e){x(this._config.error)?this._config.error(e):n&&this._config.error&&t.postMessage({workerId:o.WORKER_ID,error:e,finished:!1})}}function c(e){var t;(e=e||{}).chunkSize||(e.chunkSize=o.RemoteChunkSize),u.call(this,e),this._nextChunk=r?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),r||(t.onload=b(this._chunkLoaded,this),t.onerror=b(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!r),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var n in e)t.setRequestHeader(n,e[n])}if(this._config.chunkSize){var i=this._start+this._config.chunkSize-1;t.setRequestHeader("Range","bytes="+this._start+"-"+i)}try{t.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}r&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){4===t.readyState&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substring(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var r=t.statusText||e;this._sendError(new Error(r))}}function l(e){var t,r;(e=e||{}).chunkSize||(e.chunkSize=o.LocalChunkSize),u.call(this,e);var n="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,n?((t=new FileReader).onload=b(this._chunkLoaded,this),t.onerror=b(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var i=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,i)}var a=t.readAsText(e,this._config.encoding);n||this._chunkLoaded({target:{result:a}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function f(e){var t;u.call(this,e=e||{}),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,r=this._config.chunkSize;return r?(e=t.substring(0,r),t=t.substring(r)):(e=t,t=""),this._finished=!t,this.parseChunk(e)}}}function h(e){u.call(this,e=e||{});var t=[],r=!0,n=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){n&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=b((function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}}),this),this._streamError=b((function(e){this._streamCleanUp(),this._sendError(e)}),this),this._streamEnd=b((function(){this._streamCleanUp(),n=!0,this._streamData("")}),this),this._streamCleanUp=b((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function d(e){var t,r,n,i=Math.pow(2,53),a=-i,s=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,u=/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,c=this,l=0,f=0,h=!1,d=!1,g=[],y={data:[],errors:[],meta:{}};if(x(e.step)){var v=e.step;e.step=function(t){if(y=t,w())k();else{if(k(),0===y.data.length)return;l+=t.data.length,e.preview&&l>e.preview?r.abort():(y.data=y.data[0],v(y,c))}}}function b(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function k(){return y&&n&&(E("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+o.DefaultDelimiter+"'"),n=!1),e.skipEmptyLines&&(y.data=y.data.filter((function(e){return!b(e)}))),w()&&function(){if(y)if(Array.isArray(y.data[0])){for(var t=0;w()&&t<y.data.length;t++)y.data[t].forEach(r);y.data.splice(0,1)}else y.data.forEach(r);function r(t,r){x(e.transformHeader)&&(t=e.transformHeader(t,r)),g.push(t)}}(),function(){if(!y||!e.header&&!e.dynamicTyping&&!e.transform)return y;function t(t,r){var n,i=e.header?{}:[];for(n=0;n<t.length;n++){var a=n,o=t[n];e.header&&(a=n>=g.length?"__parsed_extra":g[n]),e.transform&&(o=e.transform(o,a)),o=S(a,o),"__parsed_extra"===a?(i[a]=i[a]||[],i[a].push(o)):i[a]=o}return e.header&&(n>g.length?E("FieldMismatch","TooManyFields","Too many fields: expected "+g.length+" fields but parsed "+n,f+r):n<g.length&&E("FieldMismatch","TooFewFields","Too few fields: expected "+g.length+" fields but parsed "+n,f+r)),i}var r=1;return!y.data.length||Array.isArray(y.data[0])?(y.data=y.data.map(t),r=y.data.length):y.data=t(y.data,0),e.header&&y.meta&&(y.meta.fields=g),f+=r,y}()}function w(){return e.header&&0===g.length}function S(t,r){return n=t,e.dynamicTypingFunction&&void 0===e.dynamicTyping[n]&&(e.dynamicTyping[n]=e.dynamicTypingFunction(n)),!0===(e.dynamicTyping[n]||e.dynamicTyping)?"true"===r||"TRUE"===r||"false"!==r&&"FALSE"!==r&&(function(e){if(s.test(e)){var t=parseFloat(e);if(a<t&&t<i)return!0}return!1}(r)?parseFloat(r):u.test(r)?new Date(r):""===r?null:r):r;var n}function E(e,t,r,n){var i={type:e,code:t,message:r};void 0!==n&&(i.row=n),y.errors.push(i)}this.parse=function(i,a,s){var u=e.quoteChar||'"';if(e.newline||(e.newline=function(e,t){e=e.substring(0,1048576);var r=new RegExp(p(t)+"([^]*?)"+p(t),"gm"),n=(e=e.replace(r,"")).split("\r"),i=e.split("\n"),a=1<i.length&&i[0].length<n[0].length;if(1===n.length||a)return"\n";for(var o=0,s=0;s<n.length;s++)"\n"===n[s][0]&&o++;return o>=n.length/2?"\r\n":"\r"}(i,u)),n=!1,e.delimiter)x(e.delimiter)&&(e.delimiter=e.delimiter(i),y.meta.delimiter=e.delimiter);else{var c=function(t,r,n,i,a){var s,u,c,l;a=a||[",","\t","|",";",o.RECORD_SEP,o.UNIT_SEP];for(var f=0;f<a.length;f++){var h=a[f],d=0,p=0,g=0;c=void 0;for(var y=new m({comments:i,delimiter:h,newline:r,preview:10}).parse(t),v=0;v<y.data.length;v++)if(n&&b(y.data[v]))g++;else{var _=y.data[v].length;p+=_,void 0!==c?0<_&&(d+=Math.abs(_-c),c=_):c=_}0<y.data.length&&(p/=y.data.length-g),(void 0===u||d<=u)&&(void 0===l||l<p)&&1.99<p&&(u=d,s=h,l=p)}return{successful:!!(e.delimiter=s),bestDelimiter:s}}(i,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess);c.successful?e.delimiter=c.bestDelimiter:(n=!0,e.delimiter=o.DefaultDelimiter),y.meta.delimiter=e.delimiter}var l=_(e);return e.preview&&e.header&&l.preview++,t=i,r=new m(l),y=r.parse(t,a,s),k(),h?{meta:{paused:!0}}:y||{meta:{paused:!1}}},this.paused=function(){return h},this.pause=function(){h=!0,r.abort(),t=x(e.chunk)?"":t.substring(r.getCharIndex())},this.resume=function(){c.streamer._halted?(h=!1,c.streamer.parseChunk(t,!0)):setTimeout(c.resume,3)},this.aborted=function(){return d},this.abort=function(){d=!0,r.abort(),y.meta.aborted=!0,x(e.complete)&&e.complete(y),t=""}}function p(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function m(e){var t,r=(e=e||{}).delimiter,n=e.newline,i=e.comments,a=e.step,s=e.preview,u=e.fastMode,c=t=void 0===e.quoteChar||null===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(c=e.escapeChar),("string"!=typeof r||-1<o.BAD_DELIMITERS.indexOf(r))&&(r=","),i===r)throw new Error("Comment character same as delimiter");!0===i?i="#":("string"!=typeof i||-1<o.BAD_DELIMITERS.indexOf(i))&&(i=!1),"\n"!==n&&"\r"!==n&&"\r\n"!==n&&(n="\n");var l=0,f=!1;this.parse=function(e,o,h){if("string"!=typeof e)throw new Error("Input must be a string");var d=e.length,m=r.length,g=n.length,y=i.length,v=x(a),_=[],b=[],k=[],w=l=0;if(!e)return M();if(u||!1!==u&&-1===e.indexOf(t)){for(var S=e.split(n),E=0;E<S.length;E++){if(k=S[E],l+=k.length,E!==S.length-1)l+=n.length;else if(h)return M();if(!i||k.substring(0,y)!==i){if(v){if(_=[],I(k.split(r)),F(),f)return M()}else I(k.split(r));if(s&&s<=E)return _=_.slice(0,s),M(!0)}}return M()}for(var C=e.indexOf(r,l),R=e.indexOf(n,l),O=new RegExp(p(c)+p(t),"g"),j=e.indexOf(t,l);;)if(e[l]!==t)if(i&&0===k.length&&e.substring(l,l+y)===i){if(-1===R)return M();l=R+g,R=e.indexOf(n,l),C=e.indexOf(r,l)}else if(-1!==C&&(C<R||-1===R))k.push(e.substring(l,C)),l=C+m,C=e.indexOf(r,l);else{if(-1===R)break;if(k.push(e.substring(l,R)),L(R+g),v&&(F(),f))return M();if(s&&_.length>=s)return M(!0)}else for(j=l,l++;;){if(-1===(j=e.indexOf(t,j+1)))return h||b.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:_.length,index:l}),T();if(j===d-1)return T(e.substring(l,j).replace(O,t));if(t!==c||e[j+1]!==c){if(t===c||0===j||e[j-1]!==c){-1!==C&&C<j+1&&(C=e.indexOf(r,j+1)),-1!==R&&R<j+1&&(R=e.indexOf(n,j+1));var A=z(-1===R?C:Math.min(C,R));if(e.substr(j+1+A,m)===r){k.push(e.substring(l,j).replace(O,t)),e[l=j+1+A+m]!==t&&(j=e.indexOf(t,l)),C=e.indexOf(r,l),R=e.indexOf(n,l);break}var D=z(R);if(e.substring(j+1+D,j+1+D+g)===n){if(k.push(e.substring(l,j).replace(O,t)),L(j+1+D+g),C=e.indexOf(r,l),j=e.indexOf(t,l),v&&(F(),f))return M();if(s&&_.length>=s)return M(!0);break}b.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:_.length,index:l}),j++}}else j++}return T();function I(e){_.push(e),w=l}function z(t){var r=0;if(-1!==t){var n=e.substring(j+1,t);n&&""===n.trim()&&(r=n.length)}return r}function T(t){return h||(void 0===t&&(t=e.substring(l)),k.push(t),l=d,I(k),v&&F()),M()}function L(t){l=t,I(k),k=[],R=e.indexOf(n,l)}function M(e){return{data:_,errors:b,meta:{delimiter:r,linebreak:n,aborted:f,truncated:!!e,cursor:w+(o||0)}}}function F(){a(M()),_=[],b=[]}},this.abort=function(){f=!0},this.getCharIndex=function(){return l}}function g(e){var t=e.data,r=i[t.workerId],n=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var a={abort:function(){n=!0,y(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(x(r.userStep)){for(var o=0;o<t.results.data.length&&(r.userStep({data:t.results.data[o],errors:t.results.errors,meta:t.results.meta},a),!n);o++);delete t.results}else x(r.userChunk)&&(r.userChunk(t.results,a,t.file),delete t.results)}t.finished&&!n&&y(t.workerId,t.results)}function y(e,t){var r=i[e];x(r.userComplete)&&r.userComplete(t),r.terminate(),delete i[e]}function v(){throw new Error("Not implemented.")}function _(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=_(e[r]);return t}function b(e,t){return function(){e.apply(t,arguments)}}function x(e){return"function"==typeof e}return n&&(t.onmessage=function(e){var r=e.data;if(void 0===o.WORKER_ID&&r&&(o.WORKER_ID=r.workerId),"string"==typeof r.input)t.postMessage({workerId:o.WORKER_ID,results:o.parse(r.input,r.config),finished:!0});else if(t.File&&r.input instanceof File||r.input instanceof Object){var n=o.parse(r.input,r.config);n&&t.postMessage({workerId:o.WORKER_ID,results:n,finished:!0})}}),(c.prototype=Object.create(u.prototype)).constructor=c,(l.prototype=Object.create(u.prototype)).constructor=l,(f.prototype=Object.create(f.prototype)).constructor=f,(h.prototype=Object.create(u.prototype)).constructor=h,o},void 0===(i="function"===typeof r?r.apply(t,n):r)||(e.exports=i)},2086:function(e,t,r){"use strict";var n=r(94184),i=r.n(n),a=r(67294),o=r(76792),s=r(85893);const u=a.forwardRef((({bsPrefix:e,size:t,vertical:r,className:n,as:a="div",...u},c)=>{const l=(0,o.vE)(e,"btn-group");let f=l;return r&&(f=`${l}-vertical`),(0,s.jsx)(a,{...u,ref:c,className:i()(n,f,t&&`${l}-${t}`)})}));u.displayName="ButtonGroup",u.defaultProps={vertical:!1,role:"group"},t.Z=u},75042:function(){}},function(e){e.O(0,[3662,1265,3714,9581,5283,9169,8198,7469,1082,1013,9953,2852,9774,2888,179],(function(){return t=1834,e(e.s=t);var t}));var t=e.O();_N_E=t}]);