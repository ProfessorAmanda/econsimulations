(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3699],{72706:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/modules/central-limit-theorem",function(){return t(36878)}])},34309:function(e,n,t){"use strict";t.d(n,{Z:function(){return x}});var r=t(85893),a=t(84762),i=t(10682),o=t(21608),s=t(88375),l=t(31555),u=t(96486),c=t.n(u),d=t(45697),p=t.n(d),m=t(22852),h=t(2828),f=t(70207);function b(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function x(e){var n,t=e.popArray,u=e.popMean,d=e.sampled,p=e.sampleMean,m=e.popShape,x=h.HB[m],y=x.xmaxval,v=x.xminval,j=x.ymaxval,g=x.title,S=x.xLabel,w=[{name:"Population Observations",data:t},{name:"Sampled Observations",data:d},{type:"line",name:"Sample Mean",data:[{x:p||0,y:0,id:1},{x:p||0,y:j,id:2}],color:"red",enableMouseTracking:!1,showInLegend:!1,visible:void 0!==p&&d.length>0,label:{format:"<div>Sample Mean: ".concat(p,"</div>")}}];return(0,r.jsx)("div",{children:(0,r.jsxs)(i.Z,{fluid:!0,children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(s.Z,{variant:"secondary",children:"Uniform"!==m?(0,r.jsxs)("p",{children:["We queried the ",h.oS[m][0]," of ",t.length," ",h.oS[m][1]," and plotted the results on the following chart."]}):(0,r.jsx)("p",{children:"Behavioral economists studying loss aversion design a lottery among 2000 participants where each amount between -10 and +10 is equally likely.  We plotted the winnings and losses below."})})}),(0,r.jsxs)(o.Z,{xs:1,lg:2,children:[(0,r.jsx)(l.Z,{lg:9,children:(0,r.jsx)(a.Z,{series:w,title:"".concat(g," <br /> Population Mean: ").concat(c().round(u,2)),xMin:v,xMax:y,yMax:j,xLabel:S,animation:!1})}),(0,r.jsxs)(l.Z,{lg:3,children:[(0,r.jsx)(f.Z,{data:t,headers:(n={},b(n,h.HB[m].tableCol,"id"),b(n,h.HB[m].xLabel,"x"),n),height:350,setRowColor:function(e){return d.map((function(e){return e.id})).includes(e.id)?"#747EF2":void 0}}),(0,r.jsx)("br",{})]})]})]})})}x.propTypes={popArray:m.WY.isRequired,popMean:p().number.isRequired,sampled:m.WY.isRequired,sampleMean:p().number,popShape:m.GH.isRequired}},76041:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var r=t(85893),a=t(56180),i=t.n(a),o=t(37727),s=t(45697),l=t.n(s),u=t(74645);function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){c(e,n,t[n])}))}return e}function p(e){var n=e.children,t=(0,u.Z)();return(0,r.jsx)("div",{children:(0,r.jsx)(i(),{style:{margin:"auto",width:"100%",textAlign:"center",backgroundColor:"rgba(255,255,255,0.4)",marginBottom:"1em"},isOpened:!0,springConfig:d({},o.um.gentle),children:(0,r.jsx)("div",{style:{height:"100%",padding:t.isMobile?"1em":"4em"},children:n})})})}p.propTypes={children:l().element.isRequired}},70207:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var r=t(85893),a=t(75147),i=t(45697),o=t.n(i),s=t(96486),l=t.n(s),u=t(28899),c=t.n(u);function d(e){var n=e.data,t=e.headers,i=e.height,o=e.setSelected,s=e.setRowColor,u=function(e){return s?s(e):void 0},d=n.map((function(e){return(0,r.jsx)("tr",{style:{backgroundColor:u(e)},onClick:function(){return n=e,void(o&&o(n));var n},children:l().values(t).map((function(n){return(0,r.jsx)("td",{children:isNaN(e[n])?e[n].toUpperCase():l().round(e[n],2)},n)}))},e.id)}));return d.reverse(),(0,r.jsx)("div",{className:c().dataTableContainer,style:{height:"".concat(i||250,"px")},children:(0,r.jsxs)(a.Z,{hover:!!o,striped:!0,className:c().dataTable,style:{cursor:o?"pointer":"default"},children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{children:l().keys(t).map((function(e){return(0,r.jsx)("th",{children:e},e)}))})}),(0,r.jsx)("tbody",{children:d})]})})}d.propTypes={data:o().arrayOf(o().shape({id:o().number.isRequired})).isRequired,headers:o().object.isRequired,height:o().number,setSelected:o().func,setRowColor:o().func}},23905:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var r=t(85893),a=t(67294),i=t(62318),o=t(99301),s=t(35005),l=t(45697),u=t.n(l);function c(e){var n=e.maxSize,t=e.minSize,l=e.handleClick,u=(0,a.useState)(""),c=u[0],d=u[1];return(0,a.useEffect)((function(){d("")}),[n]),(0,r.jsxs)(i.Z,{style:{width:"60%",margin:"auto",marginBottom:20},children:[(0,r.jsx)(o.Z.Control,{align:"right",type:"number",placeholder:"Sample Size:",min:t,value:c,max:n,onChange:function(e){return d(e.target.value)}}),(0,r.jsx)(s.Z,{variant:"secondary",disabled:!c||+c>n||+c<t,onClick:function(){return l(+c,1,!1)},children:"Sample"})]})}c.propTypes={maxSize:u().number.isRequired,minSize:u().number.isRequired,handleClick:u().func.isRequired,classname:u().string}},18448:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var r=t(85893),a=t(35005),i=t(2086),o=t(45697),s=t.n(o),l=t(22852),u=t(78524),c=t.n(u),d=t(74645);function p(e){var n=e.options,t=e.select,o=e.selected,s=(0,d.Z)(),l=n.map((function(e){return(0,r.jsx)(a.Z,{className:o===e?c().selected:c().unselected,variant:o===e?c().selected:c().unselected,onClick:function(){return t(e)},children:e},"".concat(e))}));return(0,r.jsx)("div",{className:c().container,children:(0,r.jsx)(i.Z,{size:s.isMobile?"sm":void 0,children:l})})}p.propTypes={options:s().arrayOf(l.yd).isRequired,select:s().func.isRequired,selected:l.yd}},74645:function(e,n,t){"use strict";var r=t(67294);n.Z=function(){var e=(0,r.useState)({width:void 0,height:void 0,isMobile:!1}),n=e[0],t=e[1];return(0,r.useEffect)((function(){var e=function(){t({width:window.innerWidth,height:window.innerHeight,isMobile:window.innerWidth<768})};return e(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n}},36878:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return F}});var r=t(85893),a=t(58544),i=t(67294),o=t(76041),s=t(34309),l=t(45697),u=t.n(l),c=t(84762),d=t(2828),p=t(88320),m=t(22852),h=t(96486),f=t.n(h),b=t(99301),x=t(95401);function y(e){var n=e.sampleMeans,t=e.popMean,a=e.sd,o=e.popShape,s=(0,i.useState)(!1),l=s[0],u=s[1],m=l?n.map((function(e){var n=e.size,r=e.mean;return f().round((r-t)/(a/(0,p._b3)(n)),2)})):n.map((function(e){var n=e.mean;return f().round(n,2)})),h=(0,x.gT)(m),y=h.map((function(e){return e.x})),v=h.map((function(e){return e.y}));return(0,r.jsxs)("div",{children:[(0,r.jsx)(c.Z,{series:[{name:"Sample Means",data:h}],title:"Sample Mean Distribution",xMin:l?(0,p.VV$)(-3,0!==y.length?(0,p.VV$)(y):0):d.HB[o].xminval,xMax:l?(0,p.Fp7)(3,0!==y.length?(0,p.Fp7)(y):0):d.HB[o].xmaxval,yMax:(0,p.Fp7)(8,0!==v.length?(0,p.Fp7)(v):0),xLabel:l?"Standard Deviations":d.HB[o].xLabel,yLabel:"Observations of Sample Mean"}),(0,r.jsx)(b.Z.Check,{checked:l,inline:!0,className:"form-switch",label:"Convert to Standard Normal",onChange:function(){return u(!l)}})]})}y.propTypes={sampleMeans:m.pg.isRequired,popMean:u().number,sd:u().number,popShape:m.GH.isRequired};var v=t(34051),j=t.n(v),g=t(35005),S=t(95774);function w(e,n,t,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void t(u)}s.done?n(l):Promise.resolve(l).then(r,a)}function Z(e){var n=e.population,a=e.addSamples,o=(0,i.useState)(0),s=o[0],l=o[1],u=(0,i.useState)(0),c=u[0],d=u[1],p=(0,i.useState)(!1),m=p[0],h=p[1],f=(0,i.useState)(0),x=f[0],y=f[1],v=(0,i.useRef)();(0,i.useEffect)((function(){v.current=new Worker(new URL(t.p+t.u(7515),t.b)),v.current.onmessage=function(e){"progress"===e.data.type?y(e.data.percentComplete):"done"===e.data.type&&(a(e.data.sampleMeans),y(100))}}),[]);var Z=function(){var e,t=(e=j().mark((function e(){return j().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y(0),h(!0),setTimeout((function(){v.current.postMessage({numberResamples:s,population:n,resampleSize:c})}),600);case 3:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,a){var i=e.apply(n,t);function o(e){w(i,r,a,o,s,"next",e)}function s(e){w(i,r,a,o,s,"throw",e)}o(void 0)}))});return function(){return t.apply(this,arguments)}}();return(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{children:" Sample Size: "}),(0,r.jsx)(b.Z.Control,{style:{width:"40%",margin:"auto"},min:1,type:"number",placeholder:"Sample Size:",onChange:function(e){return d(e.target.value)},value:c}),(0,r.jsx)("br",{}),(0,r.jsx)("span",{children:" Number of Replications: "}),(0,r.jsx)(b.Z.Control,{style:{width:"40%",margin:"auto"},min:1,type:"number",placeholder:"Number of Replications:",onChange:function(e){return l(e.target.value)},value:s}),(0,r.jsx)("br",{}),(0,r.jsx)(g.Z,{variant:"secondary",onClick:function(){return Z()},disabled:c<1||c>n.length||s<1,children:"Run"}),(0,r.jsx)(g.Z,{variant:"secondary",onClick:function(){a([]),h(!1)},children:"Clear"}),(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"2rem"},children:(0,r.jsx)("div",{style:{height:"100px",width:"100px"},children:m&&(0,r.jsx)(S.Ip,{value:x,text:"".concat(x,"%")})})})]})}Z.propTypes={population:m.WY.isRequired,addSamples:u().func.isRequired};var C=t(21608),O=t(31555),R=t(88375),M=t(23905),_=t(28899),T=t.n(_),k=t(6082);t(48283);function q(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function z(e){var n=e.data,t=e.headers,a=e.height,i=n.map((function(e){var n=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){q(e,n,t[n])}))}return e}({},e);return f().keys(n).forEach((function(e){"number"===typeof n[e]&&(n[e]=f().round(n[e],2))})),n})).reverse(),o=t.map((function(e){return(0,r.jsx)(k.sg,{style:{justifyContent:"center"},title:e.title,dataKey:e.dataKey,width:e.width},e.dataKey)}));return(0,r.jsx)("div",{className:T().dataTableDynamicContainer,children:(0,r.jsx)(k.ZP,{style:{fontSize:16},data:i,width:t.reduce((function(e,n){return e+n.width}),0),height:a,children:o})})}function P(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function N(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function E(e){return function(e){if(Array.isArray(e))return P(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"===typeof e)return P(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return P(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function D(e){var n=e.popShape,t=e.mainSampleSize,a=(0,i.useState)([]),l=a[0],u=a[1],c=(0,i.useState)([]),d=c[0],p=c[1],m=(0,i.useState)(1),h=m[0],b=m[1],v=(0,i.useState)([]),j=v[0],S=v[1];(0,i.useEffect)((function(){b(1);var e=(0,x.oq)(n,t);S(e),p([]),u([])}),[n,t]);var w=(0,x.uR)(j)||0;return(0,r.jsx)(o.Z,{children:(0,r.jsxs)("div",{"data-testid":"clt-sim",children:[(0,r.jsx)(s.Z,{popArray:j,popMean:w,sampled:d,popShape:n}),(0,r.jsx)(g.Z,{variant:"success",onClick:function(){return b(2)},children:"Continue"}),h>=2&&(0,r.jsxs)("div",{children:[(0,r.jsxs)(C.Z,{children:[(0,r.jsx)("p",{style:{margin:15},children:"Try drawing some samples and calculating means"}),(0,r.jsx)(M.Z,{maxSize:j.length,minSize:1,handleClick:function(e){var n=f().sampleSize(j,e);p(n);var t=E(l).concat([{size:e,mean:(0,x.uR)(n)}]);u(t.map((function(e,n){return function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){N(e,n,t[n])}))}return e}({},e,{id:n+1})})))},classname:"sample-size-input"})]}),(0,r.jsxs)(C.Z,{children:[(0,r.jsx)(O.Z,{lg:"8",children:(0,r.jsx)(y,{sampleMeans:l,popMean:w,sd:(0,x.d5)(j),popShape:n})}),(0,r.jsx)(O.Z,{lg:"4",children:(0,r.jsx)(z,{headers:[{title:"Sample",dataKey:"id",width:100},{title:"Size",dataKey:"size",width:80},{title:"Mean",dataKey:"mean",width:80}],data:l,height:240})})]}),(0,r.jsx)(C.Z,{children:(0,r.jsxs)("div",{children:[(0,r.jsx)("br",{}),(0,r.jsx)(R.Z,{variant:"primary",style:{width:"50%",margin:"auto"},children:"Simulate drawing many many samples"}),(0,r.jsx)("br",{}),(0,r.jsx)(Z,{population:j,addSamples:u})]})})]})]})})}z.propTypes={data:u().arrayOf(u().shape({id:u().number.isRequired})).isRequired,headers:u().arrayOf(u().shape({title:u().string.isRequired,dataKey:u().string.isRequired,width:u().number.isRequired})).isRequired,height:u().number},D.propTypes={popShape:m.GH.isRequired,mainSampleSize:u().number.isRequired};var B=t(58835),A=t(60456),L=t(18448);function H(){var e=(0,i.useState)(""),n=e[0],t=e[1];return(0,r.jsxs)("div",{className:"module-container",children:[(0,r.jsx)(B.Z,{name:"Central Limit Theorem",text:(0,r.jsxs)(r.Fragment,{children:["This simulation demonstrates the shape of the sampling distribution of the sample mean. Suppose I draw a large number of samples, each of size ",(0,r.jsx)(A.Z,{math:"n"}),", from some population. For each sample, I calculate a sample mean ",(0,r.jsx)(A.Z,{math:"\\bar{x}"}),". I now plot a histogram of those sample means. For a sufficiently large sample size, the shape of that histogram will look like a beautiful bell-shaped curve, no matter what shape the underlying population had."]})}),(0,r.jsx)("br",{}),(0,r.jsx)("p",{children:"Pick a Population Distribution:"}),(0,r.jsx)(L.Z,{options:["Normal","Uniform","Exponential","Chi-Squared","Mystery"],select:t,selected:n}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),n&&(0,r.jsx)(D,{popShape:n,mainSampleSize:2e3})]})}function F(){return(0,r.jsx)(a.Z,{children:(0,r.jsx)(H,{})})}},28899:function(e){e.exports={dataTableContainer:"DataTable_dataTableContainer__pVbbY",dataTable:"DataTable_dataTable__OJQDW",dataTableDynamicContainer:"DataTable_dataTableDynamicContainer__SlkFK"}},78524:function(e){e.exports={container:"SelectorButtonGroup_container__xygrc",selected:"SelectorButtonGroup_selected___QDDN",unselected:"SelectorButtonGroup_unselected__VIO8g"}}},function(e){e.O(0,[3662,1265,3714,6898,9581,5283,9169,8198,7469,1082,1013,2158,4660,9770,2152,2852,2864,9774,2888,179],(function(){return n=72706,e(e.s=n);var n}));var n=e.O();_N_E=n}]);