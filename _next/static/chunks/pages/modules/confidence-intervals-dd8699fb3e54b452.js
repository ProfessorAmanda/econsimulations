(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4298],{75727:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/modules/confidence-intervals",function(){return t(2520)}])},84762:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var r=t(85893),i=t(45697),a=t.n(i),o=t(22852),s=t(83836);function l(e){var n=e.series,t=e.title,i=e.xMin,a=e.xMax,o=e.yMax,l=e.xLabel,c=e.yLabel,u=e.animation,d=e.zoom;return(0,r.jsx)(s.Z,{series:n,title:t,xMin:i,xMax:a,yMin:0,yMax:o,xLabel:l,yLabel:c||"Count",animation:u,zoom:d,allowDecimalsY:!1,tooltipFormat:"".concat(l,": <b>{point.x}</b><br />")})}l.propTypes={series:o.Jr.isRequired,title:a().string,xMin:a().number,xMax:a().number,yMax:a().number,xLabel:a().string,yLabel:a().string,animation:a().bool,zoom:a().bool}},78618:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var r=t(85893),i=t(62318),a=t(99301),o=t(45697),s=t.n(o),l=t(22852);function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){c(e,n,t[n])}))}return e}function d(e){var n=e.value,t=e.min,o=e.max,s=e.step,l=e.onChange,c=e.customStyle;return(0,r.jsxs)(i.Z,{className:"input-slider-group",style:u({height:30,width:400,margin:"auto",alignItems:"center"},c),children:[(0,r.jsx)(a.Z.Control,{type:"range",className:"form-range",value:n,style:{width:"60%",borderWidth:0},min:t,max:o,step:s,onChange:function(e){return l(e.target.value)}}),(0,r.jsx)(a.Z.Control,{type:"number",className:"input-group-append",value:n,min:t,max:o,step:s,onChange:function(e){return l(e.target.value)}})]})}d.propTypes={value:l.lR.isRequired,min:s().number.isRequired,max:s().number.isRequired,step:s().number.isRequired,onChange:s().func.isRequired}},58544:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var r=t(85893),i=t(41664),a=t.n(i),o=t(35005),s=t(9008),l=t.n(s);function c(e){var n=e.children;return(0,r.jsxs)("div",{className:"wrapper",children:[(0,r.jsxs)(l(),{children:[(0,r.jsx)("title",{children:"Econ Simulations"}),(0,r.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"})]}),(0,r.jsxs)("div",{"data-testid":"sim-container",style:{paddingBottom:25},children:[(0,r.jsx)(a(),{href:"/menu",passHref:!0,children:(0,r.jsx)(o.Z,{className:"home-button",variant:"outline-danger",id:"Menu",style:{margin:15},children:"MENU"})}),(0,r.jsx)("div",{className:"mini-logo"}),n]})]})}},23846:function(e,n,t){"use strict";t.d(n,{Z:function(){return U}});var r=t(85893),i=t(67294),a=t(76041),o=t(21608),s=t(31555),l=t(78618),c=t(18448),u=t(45697),d=t.n(u),p=t(22852),f=t(60456);function m(e){var n=e.distType,t=e.setDistType,i=e.confLevel,a=e.setConfLevel;return(0,r.jsxs)("div",{children:[(0,r.jsx)(o.Z,{children:(0,r.jsxs)("div",{children:["1) Do you want to assume that you know ",(0,r.jsx)(f.Z,{math:"\\sigma"}),"? If yes, choose Z. If no, choose T: "," ",(0,r.jsx)(c.Z,{options:["Z","T"],select:t,selected:n})]})}),(0,r.jsx)("br",{}),(0,r.jsx)(o.Z,{children:(0,r.jsxs)("div",{children:["2) Confidence Level: "," ",(0,r.jsx)(c.Z,{options:["90%","95%","99%"],select:function(e){return a(e.slice(0,2))},selected:"".concat(i,"%")})]})}),(0,r.jsx)("br",{}),(0,r.jsx)(o.Z,{children:(0,r.jsx)(s.Z,{sm:"12",md:{span:6,offset:3},children:(0,r.jsxs)("div",{children:["More Levels:",(0,r.jsx)(l.Z,{value:i,min:1,max:99,step:1,onChange:a})]})})})]})}m.propTypes={distType:p.bS.isRequired,setDistType:d().func.isRequired,confLevel:p.lR.isRequired,setConfLevel:d().func.isRequired};var h=t(23905),b=t(78840),v=t.n(b),x=t(75708),y=t.n(x),g=t(88375),j=t(96486),w=t.n(j),S=t(88320),O=t(2828),C=t(44814),Z=t.n(C);function M(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function R(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){M(e,n,t[n])}))}return e}function L(e){var n=e.confidenceLevel,t=e.samples,a=e.popShape,o=e.popMean,s=e.selected,l=e.setSelected,c=(0,i.useState)({}),u=c[0],d=c[1];return(0,i.useEffect)((function(){var e=O.cA[a],n=e.xmaxval,r=e.xminval,i=e.title,s=e.xLabel,c=[],u=[],p=[];t.forEach((function(e){c.push(R({},e,{x:e.id,y:e.mean})),e.label?u.push(R({},e,{low:e.lowerConf,high:e.upperConf,x:e.id})):p.push(R({},e,{low:e.lowerConf,high:e.upperConf,x:e.id}))}));var f={headerFormat:"",pointFormat:"Sample Size: <b>{point.size}</b><br/>Sample Mean: <b>{point.mean}</b><br/>Lower Bound of CI: <b>{point.lowerConf}</b><br/>Upper Bound of CI: <b>{point.upperConf}</b><br/>Confidence Level: <b>{point.confidenceLevel}%</b><br/>Distribution: <b>{point.distribution}</b><br/>",outside:!0,borderColor:"gray"},m={chart:{type:"columnrange",inverted:!0,animation:!1,zoomType:"xy",events:{selection:function(e){e.target.series.forEach((function(e){e.data.forEach((function(e){e.select(!1,!1)}))}))}}},plotOptions:{series:{point:{events:{click:function(){l(this),this.select(!1,!1)}}},animation:{duration:0},cursor:"pointer"}},title:{text:i},xAxis:{reversed:!1,min:1,max:(0,S.Fp7)(t.length,10),startOnTick:!0,title:{text:"Sample Number"},tickPixelInterval:1,tickInterval:1,tickWidth:0,lineWidth:0},yAxis:{min:r,max:n,startOnTick:!0,endOnTick:!0,title:{text:s}},series:[{name:"Confidence Interval",data:u,color:"rgba(0, 170, 0, 0.5)",centerInCategory:!0,showInLegend:!1,tooltip:f,allowPointSelect:!0,animation:{duration:0},states:{hover:{color:"rgba(0, 170, 0, 1)"},inactive:{color:"rgba(0, 170, 0, 0.5)"},select:{enabled:!1,color:"rgba(0, 170, 0, 0.5)"}}},{name:"Confidence Interval",data:p,color:"rgba(255, 0, 0, 0.5)",centerInCategory:!0,showInLegend:!1,tooltip:f,allowPointSelect:!0,animation:{duration:0},states:{hover:{color:"rgba(255, 0, 0, 1)"},inactive:{color:"rgba(255, 0, 0, 0.5)"},select:{enabled:!1,color:"rgba(255, 0, 0, 0.5)"}}},{name:"Sample Means",type:"scatter",data:c,color:"#616161",marker:{enabled:!0,symbol:"diamond",radius:1},allowPointSelect:!0,animation:{duration:0},states:{hover:{enabled:!1},select:{enabled:!1}},tooltip:f},{type:"line",name:"Population Mean",data:[[0,o],[t.length,o]],color:"gray",enableMouseTracking:!1,showInLegend:!1,label:{enabled:!1},marker:{enabled:!1},zIndex:-5}]};d(m)}),[n,t,a,o,l]),(0,r.jsxs)("div",{children:[s?(0,r.jsxs)(g.Z,{variant:s.label?"success":"danger",children:["Sample number ",s.id," has a mean of ",s.mean.toFixed(2),", with ",n,"% CI (",w().round(s.lowerConf,2),", ",w().round(s.upperConf,2),"). CI contains the population mean? ",s.label.toString()]}):(0,r.jsx)("div",{style:{height:80}}),(0,r.jsx)(y(),{highcharts:v(),options:u})]})}"object"===typeof v()&&Z()(v()),L.propTypes={confidenceLevel:d().number.isRequired,samples:d().arrayOf(p.Tq).isRequired,popShape:p.GH.isRequired,popMean:d().number.isRequired,selected:p.Tq,setSelected:d().func.isRequired};var P=t(99301),_=t(35005);function T(e){var n=e.populationSize,t=e.addSamples,a=(0,i.useState)(0),o=a[0],s=a[1],l=(0,i.useState)(0),c=l[0],u=l[1];return(0,r.jsxs)("div",{style:{padding:50},children:[(0,r.jsx)(g.Z,{variant:"primary",style:{width:"50%",margin:"auto"},children:"Simulate drawing many many samples"}),(0,r.jsx)("br",{}),(0,r.jsx)("span",{children:" Sample Size: "}),(0,r.jsx)(P.Z.Control,{style:{width:"40%",margin:"auto"},min:1,type:"number",placeholder:"Sample Size:",onChange:function(e){return u(e.target.value)},value:c}),(0,r.jsx)("br",{}),(0,r.jsx)("span",{children:" Number of Replications: "}),(0,r.jsx)(P.Z.Control,{style:{width:"40%",margin:"auto"},min:1,type:"number",placeholder:"Number of Replications:",onChange:function(e){return s(e.target.value)},value:o}),(0,r.jsx)("br",{}),(0,r.jsx)(_.Z,{variant:"secondary",onClick:function(){return t(c,o)},disabled:c<1||c>n||o<1,children:"Run"}),(0,r.jsx)(_.Z,{variant:"secondary",onClick:function(){return t()},children:"Clear"})]})}T.propTypes={populationSize:d().number.isRequired,addSamples:d().func.isRequired};var k=t(95401),q=t(84762),E=t(10682);function z(e){var n=e.popArray,t=e.popMean,i=e.sampled,a=e.popShape,o=O.cA[a],s=o.xmaxval,l=o.xminval,c=o.ymaxval,u=o.title,d=o.xLabel,p=[{name:"Population",data:n},{name:"Samples",data:i}];return(0,r.jsxs)(E.Z,{fluid:!0,children:[(0,r.jsxs)(g.Z,{variant:"secondary",children:["We queried the ",O.NQ[a][0]," of ",n.length," ",O.NQ[a][1]," and plotted the results on the following chart."]}),(0,r.jsx)(q.Z,{series:p,title:"".concat(u," <br /> Population Mean: ").concat(w().round(t,2)),xMin:l,xMax:s,yMax:c,xLabel:d})]})}z.propTypes={popArray:p.WY.isRequired,popMean:d().number,sampled:p.WY.isRequired,popShape:p.GH.isRequired};var I=t(70207),N=t(18498),D=t.n(N);function A(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function F(e){var n=e.popShape,l=e.populationSize,c=(0,i.useState)("Z"),u=c[0],d=c[1],p=(0,i.useState)(95),f=p[0],b=p[1],x=(0,i.useState)([]),y=x[0],j=x[1],S=(0,i.useState)([]),O=S[0],C=S[1],Z=(0,i.useState)(),M=Z[0],R=Z[1],P=(0,i.useState)(!1),_=P[0],q=P[1],E=(0,i.useRef)();(0,i.useEffect)((function(){E.current=new Worker(new URL(t.p+t.u(9369),t.b)),E.current.onmessage=function(e){if("done"===e.data.type){var n=O.concat(e.data.samples).map((function(e,n){return function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){A(e,n,t[n])}))}return e}({},e,{id:n+1})}));C(n),R(n[n.length-1]),q(!1)}}}),[]),(0,i.useEffect)((function(){var e=(0,k.oq)(n,l,{low:55,hi:75});j(e),C([]),R()}),[n,l]);var N=function(){v().charts.forEach((function(e){e&&e.series.forEach((function(e){e.data.forEach((function(e){e.select(!1,!1)}))}))}))},F=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;N(),e?(q(!0),setTimeout((function(){E.current.postMessage({size:e,replications:n,popArray:y,distType:u,confLevel:f})}),600)):(C([]),R())};return(0,r.jsx)(a.Z,{children:(0,r.jsxs)("div",{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(m,{distType:u,setDistType:d,confLevel:+f,setConfLevel:b})}),(0,r.jsx)("br",{}),(0,r.jsxs)(o.Z,{md:1,lg:2,children:[(0,r.jsxs)(s.Z,{children:[(0,r.jsx)(z,{popArray:y,popMean:(0,k.uR)(y),sampled:M?M.data:[],popShape:n}),(0,r.jsx)("p",{children:"Try drawing some samples and calculating means"}),(0,r.jsx)(h.Z,{maxSize:y.length,minSize:1,handleClick:F,classname:"sample-size-input"})]}),(0,r.jsx)(s.Z,{children:(0,r.jsx)(L,{confidenceLevel:+f,samples:O,popShape:n,popMean:w().round((0,k.uR)(y),2),selected:M,setSelected:R})})]}),(0,r.jsxs)(o.Z,{children:[(0,r.jsxs)(s.Z,{lg:12,xl:5,children:[(0,r.jsx)(T,{populationSize:y.length,addSamples:F}),_&&(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{children:"Calculating..."}),(0,r.jsx)(D(),{color:"#3e98c7"})]})]}),(0,r.jsx)(s.Z,{lg:12,xl:7,children:(0,r.jsx)(I.Z,{data:O,headers:{Sample:"id",Size:"size",Mean:"mean","Lower Bound for CI":"lowerConf","Upper Bound for CI":"upperConf","Confidence Level":"confidenceLevel",Distribution:"distribution"},height:400,setSelected:function(e){R(e),N()},setRowColor:function(e){return e.label?"rgba(23, 161, 80, 0.233)":"rgba(161, 23, 23, 0.233)"}})})]}),(0,r.jsx)("br",{}),(0,r.jsx)(o.Z,{children:O.length>0&&(0,r.jsxs)(g.Z,{variant:"info",children:[O.filter((function(e){return!e.label})).length," intervals did not contain the population mean.",(0,r.jsx)("br",{}),O.filter((function(e){return e.label})).length," did (",w().round(100*O.filter((function(e){return e.label})).length/O.length,2),"%)."]})})]})})}F.propTypes={popShape:p.GH.isRequired,populationSize:d().number.isRequired};var B=t(58835);function U(){var e=(0,i.useState)(""),n=e[0],t=e[1];return(0,r.jsxs)("div",{className:"module-container",children:[(0,r.jsx)(B.Z,{name:"Confidence Intervals",text:(0,r.jsxs)(r.Fragment,{children:["This simulation demonstrates how confidence intervals provide an estimate for the location of the true population mean ",(0,r.jsx)(f.Z,{math:"\\mu"}),". In this exercise you will first choose 1) whether to assume that you know the true population standard deviation and 2) what confidence level to impose. Then, you will take random samples from the population, calculation a sample mean for each, and construct confidence intervals around those sample means. The proportion of confidence intervals that contain the true mean corresponds to the chosen confidence level!"]})}),(0,r.jsx)("br",{}),(0,r.jsx)("p",{children:"Pick a Population Distribution:"}),(0,r.jsx)(c.Z,{options:["Normal","Uniform","Exponential","Chi-Squared"],select:t,selected:n}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),n&&(0,r.jsx)(F,{popShape:n,populationSize:O.EV})]})}},2520:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return o}});var r=t(85893),i=t(23846),a=t(58544);function o(){return(0,r.jsx)(a.Z,{children:(0,r.jsx)(i.Z,{})})}},9008:function(e,n,t){e.exports=t(83121)},18498:function(e,n,t){"use strict";var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e},r.apply(this,arguments)},i=this&&this.__createBinding||(Object.create?function(e,n,t,r){void 0===r&&(r=t);var i=Object.getOwnPropertyDescriptor(n,t);i&&!("get"in i?!n.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return n[t]}}),Object.defineProperty(e,r,i)}:function(e,n,t,r){void 0===r&&(r=t),e[r]=n[t]}),a=this&&this.__setModuleDefault||(Object.create?function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}:function(e,n){e.default=n}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&i(n,e,t);return a(n,e),n},s=this&&this.__rest||function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)n.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(t[r[i]]=e[r[i]])}return t};Object.defineProperty(n,"__esModule",{value:!0});var l=o(t(67294)),c=t(96657),u=(0,t(60010).createAnimation)("BeatLoader","50% {transform: scale(0.75);opacity: 0.2} 100% {transform: scale(1);opacity: 1}","beat");n.default=function(e){var n=e.loading,t=void 0===n||n,i=e.color,a=void 0===i?"#000000":i,o=e.speedMultiplier,d=void 0===o?1:o,p=e.cssOverride,f=void 0===p?{}:p,m=e.size,h=void 0===m?15:m,b=e.margin,v=void 0===b?2:b,x=s(e,["loading","color","speedMultiplier","cssOverride","size","margin"]),y=r({display:"inherit"},f),g=function(e){return{display:"inline-block",backgroundColor:a,width:(0,c.cssValue)(h),height:(0,c.cssValue)(h),margin:(0,c.cssValue)(v),borderRadius:"100%",animation:"".concat(u," ").concat(.7/d,"s ").concat(e%2?"0s":"".concat(.35/d,"s")," infinite linear"),animationFillMode:"both"}};return t?l.createElement("span",r({style:y},x),l.createElement("span",{style:g(1)}),l.createElement("span",{style:g(2)}),l.createElement("span",{style:g(3)})):null}},60010:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.createAnimation=void 0;n.createAnimation=function(e,n,t){var r="react-spinners-".concat(e,"-").concat(t);if("undefined"==typeof window||!window.document)return r;var i=document.createElement("style");document.head.appendChild(i);var a=i.sheet,o="\n    @keyframes ".concat(r," {\n      ").concat(n,"\n    }\n  ");return a&&a.insertRule(o,0),r}},96657:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.cssValue=n.parseLengthAndUnit=void 0;var t={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function r(e){if("number"===typeof e)return{value:e,unit:"px"};var n,r=(e.match(/^[0-9.]*/)||"").toString();n=r.includes(".")?parseFloat(r):parseInt(r,10);var i=(e.match(/[^0-9]*$/)||"").toString();return t[i]?{value:n,unit:i}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(n,"px.")),{value:n,unit:"px"})}n.parseLengthAndUnit=r,n.cssValue=function(e){var n=r(e);return"".concat(n.value).concat(n.unit)}}},function(e){e.O(0,[3662,3714,1265,6898,9581,5283,6817,9169,202,7469,1887,8564,1013,2158,4660,9770,4814,2852,7973,9774,2888,179],(function(){return n=75727,e(e.s=n);var n}));var n=e.O();_N_E=n}]);