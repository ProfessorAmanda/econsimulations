(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7973],{76041:function(n,e,t){"use strict";t.d(e,{Z:function(){return f}});var r=t(85893),i=t(56180),o=t.n(i),a=t(37727),u=t(45697),c=t.n(u),l=t(74645);function s(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function d(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){s(n,e,t[e])}))}return n}function f(n){var e=n.children,t=(0,l.Z)();return(0,r.jsx)("div",{children:(0,r.jsx)(o(),{style:{margin:"auto",width:"100%",textAlign:"center",backgroundColor:"rgba(255,255,255,0.4)",marginBottom:"1em"},isOpened:!0,springConfig:d({},a.um.gentle),children:(0,r.jsx)("div",{style:{height:"100%",padding:t.isMobilePortrait?"1em":"4em"},children:e})})})}f.propTypes={children:c().element.isRequired}},70207:function(n,e,t){"use strict";t.d(e,{Z:function(){return d}});var r=t(85893),i=t(75147),o=t(45697),a=t.n(o),u=t(96486),c=t.n(u),l=t(28899),s=t.n(l);function d(n){var e=n.data,t=n.headers,o=n.height,a=n.setSelected,u=n.setRowColor,l=function(n){return u?u(n):void 0},d=e.map((function(n){return(0,r.jsx)("tr",{style:{backgroundColor:l(n)},onClick:function(){return e=n,void(a&&a(e));var e},children:c().values(t).map((function(e){return(0,r.jsx)("td",{children:isNaN(n[e])?n[e].toUpperCase():c().round(n[e],2)},e)}))},n.id)}));return d.reverse(),(0,r.jsx)("div",{className:s().dataTableContainer,style:{height:"".concat(o||250,"px")},children:(0,r.jsxs)(i.Z,{hover:!!a,striped:!0,className:s().dataTable,style:{cursor:a?"pointer":"default"},children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{children:c().keys(t).map((function(n){return(0,r.jsx)("th",{children:n},n)}))})}),(0,r.jsx)("tbody",{children:d})]})})}d.propTypes={data:a().arrayOf(a().shape({id:a().number.isRequired})).isRequired,headers:a().object.isRequired,height:a().number,setSelected:a().func,setRowColor:a().func}},23905:function(n,e,t){"use strict";t.d(e,{Z:function(){return s}});var r=t(85893),i=t(67294),o=t(62318),a=t(99301),u=t(35005),c=t(45697),l=t.n(c);function s(n){var e=n.maxSize,t=n.minSize,c=n.handleClick,l=(0,i.useState)(""),s=l[0],d=l[1];return(0,i.useEffect)((function(){d("")}),[e]),(0,r.jsxs)(o.Z,{style:{width:"60%",margin:"auto",marginBottom:20},children:[(0,r.jsx)(a.Z.Control,{align:"right",type:"number",placeholder:"Sample Size:",min:t,value:s,max:e,onChange:function(n){return d(n.target.value)}}),(0,r.jsx)(u.Z,{variant:"secondary",disabled:!s||+s>e||+s<t,onClick:function(){return c(+s,1,!1)},children:"Sample"})]})}s.propTypes={maxSize:l().number.isRequired,minSize:l().number.isRequired,handleClick:l().func.isRequired,classname:l().string}},83836:function(n,e,t){"use strict";t.d(e,{Z:function(){return h}});var r=t(85893),i=t(67294),o=t(78840),a=t.n(o),u=t(75708),c=t.n(u),l=t(45697),s=t.n(l),d=t(22852),f=t(60195),m=t.n(f);function p(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function h(n){var e=n.series,t=n.title,o=n.xMin,u=n.xMax,l=n.yMin,s=n.yMax,d=n.xLabel,f=n.yLabel,m=n.animation,h=n.zoom,y=n.height,b=n.xCategories,v=n.yTickInterval,g=n.allowDecimalsY,x=n.tooltipFormat,w=(0,i.useState)({}),j=w[0],O=w[1];return(0,i.useEffect)((function(){var n={chart:{type:"scatter",animation:!!m,height:y,zoomType:h?"xy":""},boost:{useGPUTranslations:!0,usePreAllocated:!0},plotOptions:{series:{boostThreshold:5e3}},legend:{symbolHeight:12,symbolWidth:12,symbolRadius:6},xAxis:{min:o,max:u,title:{enabled:!0,text:d},startOnTick:!0,endOnTick:!0,categories:b},title:{text:t},yAxis:{min:l,max:s,startOnTick:!0,endOnTick:!0,title:{text:f},tickInterval:v,allowDecimals:g},series:e.map((function(n){return function(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){p(n,e,t[e])}))}return n}({showInLegend:n.data.length>0,turboThreshold:0,tooltip:{pointFormat:x||"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}},n,{data:n.data.map((function(n){return{x:n.x,y:n.y}}))})}))};O(n)}),[e,t,o,u,l,s,d,f,m,h,y,b,v,g,x]),(0,r.jsx)(c(),{highcharts:a(),options:j})}"object"===typeof a()&&m()(a()),h.propTypes={series:d.Jr.isRequired,title:s().string,xMin:s().number,xMax:s().number,yMin:s().number,yMax:s().number,xLabel:s().string,yLabel:s().string,animation:s().bool,zoom:s().bool,height:d.lR,xCategories:s().arrayOf(s().string),yTickInterval:s().number,allowDecimalsY:s().bool,tooltipFormat:s().string}},18448:function(n,e,t){"use strict";t.d(e,{Z:function(){return f}});var r=t(85893),i=t(35005),o=t(2086),a=t(45697),u=t.n(a),c=t(22852),l=t(78524),s=t.n(l),d=t(74645);function f(n){var e=n.options,t=n.select,a=n.selected,u=(0,d.Z)(),c=e.map((function(n){return(0,r.jsx)(i.Z,{className:a===n?s().selected:s().unselected,variant:a===n?s().selected:s().unselected,onClick:function(){return t(n)},children:n},"".concat(n))}));return(0,r.jsx)("div",{className:s().container,children:(0,r.jsx)(o.Z,{size:u.isMobilePortrait?"sm":void 0,children:c})})}f.propTypes={options:u().arrayOf(c.yd).isRequired,select:u().func.isRequired,selected:c.yd}},58835:function(n,e,t){"use strict";t.d(e,{Z:function(){return c}});var r=t(85893),i=t(88375),o=t(45697),a=t.n(o),u=t(22852);function c(n){var e=n.name,t=n.text;return(0,r.jsxs)(i.Z,{className:"sim-description",variant:"primary","data-testid":"".concat(e,"-into"),children:[(0,r.jsx)(i.Z.Heading,{children:e}),(0,r.jsx)("hr",{}),t]})}c.propTypes={name:a().string.isRequired,text:u.yd.isRequired}},95401:function(n,e,t){"use strict";t.d(e,{Mc:function(){return M},N1:function(){return R},PW:function(){return C},bd:function(){return P},d5:function(){return _},dn:function(){return k},gT:function(){return v},oq:function(){return S},uR:function(){return T},uZ:function(){return g},xh:function(){return Z}});var r=t(88320),i=t(37126),o=t.n(i),a=t(96486),u=t.n(a),c=t(2162),l=t(68856),s=t(22254),d=t.n(s);function f(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function m(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function p(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){m(n,e,t[e])}))}return n}function h(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,i,o=[],a=!0,u=!1;try{for(t=t.call(n);!(a=(r=t.next()).done)&&(o.push(r.value),!e||o.length!==e);a=!0);}catch(c){u=!0,i=c}finally{try{a||null==t.return||t.return()}finally{if(u)throw i}}return o}}(n,e)||b(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(n){return function(n){if(Array.isArray(n))return f(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||b(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(n,e){if(n){if("string"===typeof n)return f(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?f(n,e):void 0}}var v=function(n){var e=[];return u().entries(u().countBy(n)).forEach((function(n){for(var t=h(n,2),r=t[0],i=t[1],o=1;o<=i;o++)e.push({x:+r,y:o})})),e},g=function(n,e,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;return o().rnorm(n,e,t).map((function(n){return u().round(n,r)}))},x=function(n,e,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;return o().runif(n,e,t).map((function(n){return u().round(n,r)}))},w=function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;return o().rexp(n,e).map((function(n){return u().round(n,t)}))},j=function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;return o().rchisq(n,e).map((function(n){return u().round(n,t)}))},O=function(n,e,t,r,i){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:5,c=o().rnorm(n,e,r).map((function(n){return u().round(n,a)})),l=o().rnorm(n,t,i).map((function(n){return u().round(n,a)}));return u().sampleSize(y(c).concat(y(l)),2e3)},S=function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t.mean,i=void 0===r?64:r,o=t.standardDev,a=void 0===o?3:o,c=t.low,l=void 0===c?-10:c,s=t.hi,d=void 0===s?10:s,f=t.lambda,m=void 0===f?1/64:f,h=t.degreesOfFreedom,y=void 0===h?8:h,b=t.mysteryMean1,S=void 0===b?58:b,T=t.mysteryMean2,_=void 0===T?70:T,C=t.mysterySD1,k=void 0===C?1:C,M=t.mysterySD2,Z=void 0===M?3:M,P=t.precision,R=void 0===P?1:P,q={Normal:function(){return g(e,i,a,R)},Uniform:function(){return x(e,l,d,R)},Exponential:function(){return w(e,m,R)},"Chi-Squared":function(){return j(e,y,R)},Mystery:function(){return O(e,S,_,k,Z,R)}},D=q[n]();return u().shuffle(v(D)).map((function(n,e){return p({},n,{id:e+1})}))},T=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x";return n.length>0?(0,r.J69)(n.map((function(n){return n[e]}))):void 0},_=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x";return n.length>0?(0,r.qoR)(n.map((function(n){return n[e]}))):void 0},C=function(n,e,t,i,o){return"Z"===n?c.jStat.zscore(e,t,i/(0,r._b3)(o)):c.jStat.tscore(e,t,i,o)},k=function(n,e,t,i,o,a){return(n-e)/(0,r._b3)(Math.pow(t,2)/o+Math.pow(i,2)/a)},M=function(n,e,t,r,i){var o="Z"===n?c.jStat.ztest(e,i):c.jStat.ttest(e,r-1,i);return">"===t&&e<0||"<"===t&&e>=0?1-o:o},Z=function(n,e,t,r,i,a){var c=[[r*r,a*r*i],[a*r*i,i*i]],s=(0,l.Z)([e,t],c);return o().rnorm(n,0,5).map((function(n){var e=h(s.sample(),2),t=e[0],r=40+3*t+2.5*e[1]+n;return{x:u().clamp(u().round(t,2),0,15),y:u().clamp(u().round(r,2),0,100)}}))},P=function(n,e,t,r){return n.map((function(n){return p({},n,m({},r,(n[r]-e)/(t||1)))}))},R=function(n){var e,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(n.every((function(n){return u().isArray(n)})))e=n;else{if(!n.every((function(n){return u().isObject(n)})))throw new Error;e=n.map((function(n){return[n.x,n.y]}))}var r=d().linear(e,{precision:t}).equation;return{slope:r[0],intercept:r[1]}}},74645:function(n,e,t){"use strict";var r=t(67294);e.Z=function(){var n=(0,r.useState)({width:void 0,height:void 0,isMobile:!1,isMobilePortrait:!1}),e=n[0],t=n[1];return(0,r.useEffect)((function(){var n=function(){t({width:window.innerWidth,height:window.innerHeight,isMobile:window.innerWidth<768||window.innerHeight<768,isMobilePortrait:(window.innerWidth<768||window.innerHeight<768)&&window.innerWidth<window.innerHeight})};return n(),window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)}}),[]),e}},28899:function(n){n.exports={dataTableContainer:"DataTable_dataTableContainer__pVbbY",dataTable:"DataTable_dataTable__OJQDW",dataTableDynamicContainer:"DataTable_dataTableDynamicContainer__SlkFK"}},78524:function(n){n.exports={container:"SelectorButtonGroup_container__xygrc",selected:"SelectorButtonGroup_selected___QDDN",unselected:"SelectorButtonGroup_unselected__VIO8g"}},75042:function(){}}]);