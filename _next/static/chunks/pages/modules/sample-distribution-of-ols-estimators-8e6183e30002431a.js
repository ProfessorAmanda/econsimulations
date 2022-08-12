(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3084],{69125:function(e,t,r){"use strict";var n,a,i;i=function(e){function t(e,t,r,n){e.hasOwnProperty(t)||(e[t]=n.apply(null,r))}t(e=e?e._modules:{},"Series/DerivedComposition.js",[e["Core/Globals.js"],e["Core/Series/Series.js"],e["Core/Utilities.js"]],(function(e,t,r){var n,a=e.noop,i=r.addEvent,o=r.defined;return function(e){function r(){t.prototype.init.apply(this,arguments),this.initialised=!1,this.baseSeries=null,this.eventRemovers=[],this.addEvents()}function n(){var e=this.chart,t=this.options.baseSeries;this.baseSeries=o(t)&&(e.series[t]||e.get(t))||null}function s(){var e=this;this.eventRemovers.push(i(this.chart,"afterLinkSeries",(function(){e.setBaseSeries(),e.baseSeries&&!e.initialised&&(e.setDerivedData(),e.addBaseSeriesEvents(),e.initialised=!0)})))}function u(){var e=this;this.eventRemovers.push(i(this.baseSeries,"updatedData",(function(){e.setDerivedData()})),i(this.baseSeries,"destroy",(function(){e.baseSeries=null,e.initialised=!1})))}function c(){this.eventRemovers.forEach((function(e){e()})),t.prototype.destroy.apply(this,arguments)}var l=[];e.hasDerivedData=!0,e.setDerivedData=a,e.compose=function(e){if(-1===l.indexOf(e)){l.push(e);var t=e.prototype;t.addBaseSeriesEvents=u,t.addEvents=s,t.destroy=c,t.init=r,t.setBaseSeries=n}return e},e.init=r,e.setBaseSeries=n,e.addEvents=s,e.addBaseSeriesEvents=u,e.destroy=c}(n||(n={})),n})),t(e,"Series/Histogram/HistogramSeries.js",[e["Series/DerivedComposition.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],(function(e,t,r){var n=this&&this.__extends||function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},e(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),a=t.seriesTypes.column,i=r.arrayMax,o=r.arrayMin,s=r.correctFloat,u=r.extend,c=r.isNumber,l=r.merge,p=r.objectEach,d={"square-root":function(e){return Math.ceil(Math.sqrt(e.options.data.length))},sturges:function(e){return Math.ceil(Math.log(e.options.data.length)*Math.LOG2E)},rice:function(e){return Math.ceil(2*Math.pow(e.options.data.length,1/3))}};return r=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.data=void 0,t.options=void 0,t.points=void 0,t.userOptions=void 0,t}return n(t,e),t.prototype.binsNumber=function(){var e=this.options.binsNumber,t=d[e]||"function"===typeof e&&e;return Math.ceil(t&&t(this.baseSeries)||(c(e)?e:d["square-root"](this.baseSeries)))},t.prototype.derivedData=function(e,t,r){var n=s(i(e)),a=s(o(e)),u=[],l={},d=[];for(r=this.binWidth=s(c(r)?r||1:(n-a)/t),this.options.pointRange=Math.max(r,0),t=a;t<n&&(this.userOptions.binWidth||s(n-t)>=r||0>=s(s(a+u.length*r)-t));t=s(t+r))u.push(t),l[t]=0;0!==l[a]&&(u.push(a),l[a]=0);var f=function(e){return function(t){for(var r=1;e[r]<=t;)r++;return e[--r]}}(u.map((function(e){return parseFloat(e)})));return e.forEach((function(e){e=s(f(e)),l[e]++})),p(l,(function(e,t){d.push({x:Number(t),y:e,x2:s(Number(t)+r)})})),d.sort((function(e,t){return e.x-t.x})),d[d.length-1].x2=n,d},t.prototype.setDerivedData=function(){var e=this.baseSeries.yData;e.length?(e=this.derivedData(e,this.binsNumber(),this.options.binWidth),this.setData(e,!1)):this.setData([])},t.defaultOptions=l(a.defaultOptions,{binsNumber:"square-root",binWidth:void 0,pointPadding:0,groupPadding:0,grouping:!1,pointPlacement:"between",tooltip:{headerFormat:"",pointFormat:'<span style="font-size: 10px">{point.x} - {point.x2}</span><br/><span style="color:{point.color}">\u25cf</span> {series.name} <b>{point.y}</b><br/>'}}),t}(a),u(r.prototype,{hasDerivedData:e.hasDerivedData}),e.compose(r),t.registerSeriesType("histogram",r),r})),t(e,"Series/Bellcurve/BellcurveSeries.js",[e["Series/DerivedComposition.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],(function(e,t,r){var n=this&&this.__extends||function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},e(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),a=t.seriesTypes.areaspline,i=r.correctFloat,o=r.isNumber,s=r.merge;return r=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.data=void 0,t.options=void 0,t.points=void 0,t}return n(t,e),t.mean=function(e){var t=e.length;return e=e.reduce((function(e,t){return e+t}),0),0<t&&e/t},t.standardDeviation=function(e,r){var n=e.length;return r=o(r)?r:t.mean(e),e=e.reduce((function(e,t){return e+(t-=r)*t}),0),1<n&&Math.sqrt(e/(n-1))},t.normalDensity=function(e,t,r){return e-=t,Math.exp(-e*e/(2*r*r))/(r*Math.sqrt(2*Math.PI))},t.prototype.derivedData=function(e,r){var n=this.options.intervals,a=this.options.pointsInInterval,i=e-n*r;n=n*a*2+1,a=r/a;var o,s=[];for(o=0;o<n;o++)s.push([i,t.normalDensity(i,e,r)]),i+=a;return s},t.prototype.setDerivedData=function(){1<this.baseSeries.yData.length&&(this.setMean(),this.setStandardDeviation(),this.setData(this.derivedData(this.mean,this.standardDeviation),!1))},t.prototype.setMean=function(){this.mean=i(t.mean(this.baseSeries.yData))},t.prototype.setStandardDeviation=function(){this.standardDeviation=i(t.standardDeviation(this.baseSeries.yData,this.mean))},t.defaultOptions=s(a.defaultOptions,{intervals:3,pointsInInterval:3,marker:{enabled:!1}}),t}(a),e.compose(r),t.registerSeriesType("bellcurve",r),r})),t(e,"masters/modules/histogram-bellcurve.src.js",[],(function(){}))},e.exports?(i.default=i,e.exports=i):(n=[r(78840)],void 0===(a=function(e){return i(e),i.Highcharts=e,i}.apply(t,n))||(e.exports=a))},53702:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/modules/sample-distribution-of-ols-estimators",function(){return r(5052)}])},84762:function(e,t,r){"use strict";r.d(t,{Z:function(){return u}});var n=r(85893),a=r(45697),i=r.n(a),o=r(22852),s=r(83836);function u(e){var t=e.series,r=e.title,a=e.xMin,i=e.xMax,o=e.yMax,u=e.xLabel,c=e.yLabel,l=e.animation,p=e.zoom;return(0,n.jsx)(s.Z,{series:t,title:r,xMin:a,xMax:i,yMin:0,yMax:o,xLabel:u,yLabel:c||"Count",animation:l,zoom:p,allowDecimalsY:!1,tooltipFormat:"".concat(u,": <b>{point.x}</b><br />")})}u.propTypes={series:o.Jr.isRequired,title:i().string,xMin:i().number,xMax:i().number,yMax:i().number,xLabel:i().string,yLabel:i().string,animation:i().bool,zoom:i().bool}},41704:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var n=r(85893),a=r(35005),i=r(53025),o=r(45697),s=r.n(o),u=r(67294);function c(e){var t=e.showButton,r=(0,u.useState)(!1),o=r[0],s=r[1];return(0,n.jsx)(n.Fragment,{children:t&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.Z,{size:"sm",variant:"outline-success",onClick:function(){return s(!o)},children:"More about this dataset"}),(0,n.jsxs)(i.Z,{show:o,onHide:function(){return s(!1)},size:"lg",centered:!0,children:[(0,n.jsxs)(i.Z.Header,{children:[(0,n.jsx)(i.Z.Title,{children:"More about this dataset:"}),(0,n.jsx)(a.Z,{variant:"light",className:"btn-close",onClick:function(){return s(!1)}})]}),(0,n.jsx)(i.Z.Body,{children:"The Department of Labor commissioned a multi-year study of Job Corps, the nation\u2019s largest education and job training program for disadvantaged youth. The study randomly assigned applicants into two groups: 1) Job Corp group (participated in the program), and 2) Control group (did not participate in the program). Information on earnings for both groups was collected in the following years. This randomized control trial (RCT) found that four years after random assignment, Job Corps participants had weekly earnings $16 per month ($211 vs $195) higher than individuals in the control group representing an 8% increase in earnings. We created a synthetic population dataset to match this finding."}),(0,n.jsx)(i.Z.Footer,{children:(0,n.jsx)("cite",{children:"Schochet, Peter Z, John Burghard, and Sheena McConnell. 2006. \u201cNational Job Corps Study and Longer-Term Follow-Up Study: Impact and Benefit-Cost Findings Using Survey and Summary Earnings Records Data.\u201d Mathematica Policy Research, Inc."})})]})]})})}c.propTypes={showButton:s().bool.isRequired}},58544:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var n=r(85893),a=r(41664),i=r.n(a),o=r(35005),s=r(9008),u=r.n(s);function c(e){var t=e.children;return(0,n.jsxs)("div",{className:"wrapper",children:[(0,n.jsxs)(u(),{children:[(0,n.jsx)("title",{children:"Econ Simulations"}),(0,n.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"})]}),(0,n.jsxs)("div",{"data-testid":"sim-container",style:{paddingBottom:25},children:[(0,n.jsx)(i(),{href:"/menu",passHref:!0,children:(0,n.jsx)(o.Z,{className:"home-button",variant:"outline-danger",id:"Menu",style:{margin:15},children:"MENU"})}),(0,n.jsx)("div",{className:"mini-logo"}),t]})]})}},61284:function(e,t,r){"use strict";r.d(t,{$:function(){return c}});var n=r(34051),a=r.n(n),i=r(57460),o=r.n(i);function s(e,t,r,n,a,i,o){try{var s=e[i](o),u=s.value}catch(c){return void r(c)}s.done?t(u):Promise.resolve(u).then(n,a)}function u(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function o(e){s(i,n,a,o,u,"next",e)}function u(e){s(i,n,a,o,u,"throw",e)}o(void 0)}))}}function c(e,t){return l.apply(this,arguments)}function l(){return(l=u(a().mark((function e(t,r){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o().parse(t,{download:!0,skipEmptyLines:!0,complete:function(e){r(e.data.slice(1))}});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},70786:function(e,t,r){"use strict";r.d(t,{Z:function(){return ae}});var n=r(85893),a=r(34051),i=r.n(a),o=r(67294),s=r(76041),u=r(96486),c=r.n(u),l=r(10682),p=r(21608),d=r(31555),f=r(88375),h=r(83836),m=r(23905),y=r(22852),b=r(45697),v=r.n(b),x=r(60456),g=r(2828),S=r(70207);function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function w(e){return function(e){if(Array.isArray(e))return j(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return j(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return j(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e){var t=e.data,r=e.addSamples,a=e.selected,i=e.samples,o=e.selectSample,s=e.regressorType,u=a||{data:[]},y="Binary"===s?{headerFormat:"",pointFormat:"<div><strong>{point.category}</strong><br/><strong>${point.y}</strong><br/></div>"}:void 0,b=[{name:"data",data:t,tooltip:y},{name:"sample",data:u.data,tooltip:y}],v=[{name:"best fit line",type:"line",data:[{x:0}].concat(w(u.data),[{x:g.Fo[s].xMax}]).map((function(e){return{x:e.x,y:c().round(e.x*u.slope+u.intercept,2)}})),label:!1,marker:!1,showInLegend:u.data.length>0,enableMouseTracking:!1,color:"black"},{name:"sample",type:"scatter",data:u.data,color:"orange",marker:{lineWidth:1,lineColor:"orange"},tooltip:y}].concat(w(i.filter((function(e){return e!==a})).map((function(e){var t=e.data,r=e.slope,n=e.intercept,a=e.id;return{name:"Sample ".concat(a),type:"line",data:[{x:0}].concat(w(t.sort((function(e,t){return e.x-t.x}))),[{x:g.Fo[s].xMax}]).map((function(e){return{x:e.x,y:e.x*r+n}})),color:"#dddddd",animation:!1,label:!1,marker:!1,showInLegend:!1,enableMouseTracking:!1,zIndex:-5,states:{hover:{enabled:!1},inactive:{enabled:!1}}}}))));return(0,n.jsxs)(l.Z,{children:[(0,n.jsx)(p.Z,{children:(0,n.jsx)(d.Z,{lg:{span:12,offset:0},xl:{span:8,offset:2},children:(0,n.jsx)(h.Z,{series:b,title:"Population",xMin:g.Fo[s].xMin,xMax:g.Fo[s].xMax,yMin:g.Fo[s].yMin,yMax:g.Fo[s].yMax,xLabel:g.Fo[s].xLabel,yLabel:g.Fo[s].yLabel,height:"75%",xCategories:g.Fo[s].xCategories,yTickInterval:g.Fo[s].yTickInterval})})}),(0,n.jsx)("br",{}),(0,n.jsxs)(p.Z,{md:1,lg:2,children:[(0,n.jsxs)(d.Z,{children:[(0,n.jsxs)(f.Z,{variant:"primary",children:[(0,n.jsx)("p",{children:"Try drawing some samples and observe the line of best fit on the graph"}),(0,n.jsx)(m.Z,{maxSize:t.length,minSize:2,handleClick:r,classname:"sample-size-input"})]}),(0,n.jsx)(S.Z,{data:i,headers:{Sample:"id",Size:"size",Slope:"slope",Intercept:"intercept"},setSelected:o,setRowColor:function(e){return a&&e.id===a.id?"#747EF2":void 0}})]}),(0,n.jsxs)(d.Z,{children:[(0,n.jsxs)("div",{style:{marginLeft:"20%"},children:[(0,n.jsx)(x.Z,{block:!0,math:"\\widehat{".concat("Continuous"===s?"Test\\ Score":"Earnings","}_i = \\hat{\\beta}_0 + \\hat{\\beta}_1{").concat("Continuous"===s?"Study\\ Hours":"Job\\ Corps","_i}")}),a&&(0,n.jsx)(x.Z,{block:!0,math:"\\widehat{".concat("Continuous"===s?"Test\\ Score":"Earnings","}_i = ").concat(a.intercept," + ").concat(a.slope,"{").concat("Continuous"===s?"Study\\ Hours":"Job\\ Corps","_i}")})]}),(0,n.jsx)(h.Z,{series:v,xMin:g.Fo[s].xMin,xMax:g.Fo[s].xMax,yMin:g.Fo[s].yMin,yMax:g.Fo[s].yMax,xLabel:g.Fo[s].xLabel,yLabel:g.Fo[s].yLabel,xCategories:g.Fo[s].xCategories,yTickInterval:g.Fo[s].yTickInterval})]})]})]})}C.propTypes={data:y.WY.isRequired,addSamples:v().func.isRequired,selected:y.Nx,samples:v().arrayOf(y.Nx).isRequired,selectSample:v().func.isRequired,regressorType:v().oneOf(["Continuous","Binary"]).isRequired};var M=r(84762),k=r(88320),O=r(95401),T=r(99301),D=r(78840),R=r.n(D),_=r(75708),Z=r.n(_),I=r(69125),N=r.n(I);function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function E(e){return function(e){if(Array.isArray(e))return A(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return A(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return A(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e){var t=e.seriesName,r=e.data,a=(0,o.useState)({}),i=a[0],s=a[1],u=(0,o.useState)((0,O.oq)("Normal",2e3,{mean:0,standardDev:1}))[0];return(0,o.useEffect)((function(){var e={chart:{type:"scatter",animation:!1},title:{text:"Distribution of Sample ".concat(t)},xAxis:{title:{text:"Standard Deviations"},startOnTick:!0,endOnTick:!0},yAxis:[{startOnTick:!0,endOnTick:!0,min:0,max:k.Fp7.apply(void 0,[4].concat(E(r.map((function(e){return e.y}))))),allowDecimals:!1,title:{text:"Observation of Sample ".concat(t.slice(0,-1))}},{visible:!1}],series:[{name:"Normal Distribution",type:"bellcurve",baseSeries:1,zIndex:-1,enableMouseTracking:!1,label:!1,showInLegend:!1,yAxis:1},{name:"Data",type:"scatter",data:u.map((function(e){return e.x})),visible:!1,showInLegend:!1},{name:t,data:r,showInLegend:!1,color:"red",marker:{symbol:"circle"},tooltip:{pointFormat:"".concat(t,": <b>{point.x}</b><br/>")}}]};s(e)}),[t,r,u]),(0,n.jsx)(Z(),{highcharts:R(),options:i})}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function L(e){return function(e){if(Array.isArray(e))return P(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return P(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function B(e){var t=e.samples,r=e.regressorType,a=(0,o.useState)(!1),i=a[0],s=a[1];(0,o.useEffect)((function(){s(!1)}),[r]);var u=(0,O.uR)(t,"slope"),l=(0,O.d5)(t,"slope"),p=i?(0,O.bd)(t,u,l,"slope"):t,d=(0,O.gT)(p.map((function(e){var t=e.slope;return c().round(t,2)})));return(0,n.jsxs)("div",{children:[i?(0,n.jsx)(F,{seriesName:"Slopes",data:d}):(0,n.jsx)(M.Z,{series:[{name:"Slopes",data:d,showInLegend:!1}],title:"Distribution of Sample Slopes",xMin:k.VV$.apply(void 0,[g.Fo[r].slopeMin].concat(L(d.map((function(e){return e.x}))))),xMax:k.Fp7.apply(void 0,[g.Fo[r].slopeMax].concat(L(d.map((function(e){return e.x}))))),yMax:k.Fp7.apply(void 0,[4].concat(L(d.map((function(e){return e.y}))))),xLabel:"Slope",yLabel:"Observations of Sample Slope"}),(0,n.jsx)(T.Z.Check,{checked:i,inline:!0,className:"form-switch",label:"Convert to Standard Normal",onChange:function(){return s(!i)}})]})}function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function q(e){return function(e){if(Array.isArray(e))return z(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return z(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return z(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e){var t=e.samples,r=e.regressorType,a=(0,o.useState)(!1),i=a[0],s=a[1];(0,o.useEffect)((function(){s(!1)}),[r]);var u=(0,O.uR)(t,"intercept"),l=(0,O.d5)(t,"intercept"),p=i?(0,O.bd)(t,u,l,"intercept"):t,d=(0,O.gT)(p.map((function(e){var t=e.intercept;return c().round(t,2)})));return(0,n.jsxs)("div",{children:[i?(0,n.jsx)(F,{seriesName:"Intercepts",data:d}):(0,n.jsx)(M.Z,{series:[{name:"Intercepts",data:d,showInLegend:!1}],title:"Distribution of Sample Intercepts",xMin:k.VV$.apply(void 0,[g.Fo[r].interceptMin].concat(q(d.map((function(e){return e.x}))))),xMax:k.Fp7.apply(void 0,[g.Fo[r].interceptMax].concat(q(d.map((function(e){return e.x}))))),yMax:k.Fp7.apply(void 0,[4].concat(q(d.map((function(e){return e.y}))))),xLabel:"Intercept",yLabel:"Observations of Sample Intercept"}),(0,n.jsx)(T.Z.Check,{checked:i,inline:!0,className:"form-switch",label:"Convert to Standard Normal",onChange:function(){return s(!i)}})]})}"object"===typeof R()&&N()(R()),F.propTypes={seriesName:v().string.isRequired,data:y.WY.isRequired},B.propTypes={samples:v().arrayOf(y.Nx).isRequired,regressorType:v().oneOf(["Continuous","Binary"]).isRequired},W.propTypes={samples:v().arrayOf(y.Nx).isRequired,regressorType:v().oneOf(["Continuous","Binary"]).isRequired};var $=r(35005);function U(e){var t=e.populationSize,r=e.addSamples,a=e.minSize,i=(0,o.useState)(""),s=i[0],u=i[1],c=(0,o.useState)(""),l=c[0],p=c[1];return(0,o.useEffect)((function(){p(""),u("")}),[t]),(0,n.jsx)("div",{children:(0,n.jsxs)(f.Z,{variant:"primary",children:[(0,n.jsx)("p",{children:"Simulate drawing many many samples"}),(0,n.jsx)("span",{children:"Sample Size:"}),(0,n.jsx)(T.Z.Control,{type:"number",style:{width:"50%",margin:"auto"},placeholder:"Sample Size:",min:a,value:l,onChange:function(e){return p(e.target.value)}}),(0,n.jsx)("br",{}),(0,n.jsx)("span",{children:"Number of Replications:"}),(0,n.jsx)(T.Z.Control,{style:{width:"50%",margin:"auto"},min:1,type:"number",placeholder:"Replications:",onChange:function(e){return u(e.target.value)},value:s}),(0,n.jsx)("br",{}),(0,n.jsx)($.Z,{variant:"secondary",onClick:function(){return r(l,s,!0)},disabled:l<a||l>t||s<1,children:"Run"}),(0,n.jsx)($.Z,{variant:"secondary",onClick:function(){return r(0,0,!0)},children:"Clear"})]})})}U.propTypes={populationSize:v().number.isRequired,addSamples:v().func.isRequired,minSize:v().number.isRequired};var J=r(61284),H=r(95774);function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Y(e,t,r,n,a,i,o){try{var s=e[i](o),u=s.value}catch(c){return void r(c)}s.done?t(u):Promise.resolve(u).then(n,a)}function G(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function X(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,i=[],o=!0,s=!1;try{for(r=r.call(e);!(o=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);o=!0);}catch(u){s=!0,a=u}finally{try{o||null==r.return||r.return()}finally{if(s)throw a}}return i}}(e,t)||Q(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function K(e){return function(e){if(Array.isArray(e))return V(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Q(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Q(e,t){if(e){if("string"===typeof e)return V(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?V(e,t):void 0}}function ee(e){var t=e.regressorType,a=(0,o.useState)([]),u=a[0],f=a[1],h=(0,o.useState)([]),m=h[0],y=h[1],b=(0,o.useState)(),v=b[0],x=b[1],g=(0,o.useState)(!1),S=g[0],j=g[1],w=(0,o.useState)(0),M=w[0],k=w[1],T=(0,o.useRef)();(0,o.useEffect)((function(){T.current=new Worker(new URL(r.p+r.u(9558),r.b)),T.current.onmessage=function(e){"progress"===e.data.type?k(e.data.percentComplete):"done"===e.data.type&&(x(e.data.selected),y(e.data.samples),k(100))}}),[]);var D=function(){var e,r=(e=i().mark((function e(r,n,a){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k(0),j(!0),setTimeout((function(){T.current.postMessage({size:r,replications:n,clear:a,data:u,regressorType:t,samples:m})}),600);case 3:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function o(e){Y(i,n,a,o,s,"next",e)}function s(e){Y(i,n,a,o,s,"throw",e)}o(void 0)}))});return function(e,t,n){return r.apply(this,arguments)}}();(0,o.useEffect)((function(){if("Continuous"===t)f((0,O.xh)(1e3,7,2,2.5,6,-.5));else if("Binary"===t){(0,J.$)("/data/Job_Corps_data.csv",(function(e){f(e.map((function(e,t){var r=X(e,3);return{x:+r[0],y:+r[1],category:r[2],id:t+1}})))}))}y([]),x()}),[t]);return(0,n.jsx)(s.Z,{children:(0,n.jsxs)(l.Z,{children:[(0,n.jsx)(C,{data:u,addSamples:function(e,r,n){for(var a=[],i=0;i<r;i++){var o=c().sampleSize(u,e);if("Binary"!==t||1!==c().uniq(o.map((function(e){return e.x}))).length){var s=(0,O.N1)(o,1),l={data:o,size:e,slope:s.slope,intercept:s.intercept};a.push(l)}else i-=1}var p=(n?a:K(m).concat(K(a))).map((function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){G(e,t,r[t])}))}return e}({},e,{id:t+1})}));x(p[p.length-1]),y(p)},selected:v,samples:m,selectSample:x,regressorType:t}),(0,n.jsx)("br",{}),(0,n.jsx)(p.Z,{children:(0,n.jsxs)(d.Z,{xs:{span:8,offset:2},children:[(0,n.jsx)(U,{populationSize:u.length,addSamples:D,minSize:2}),(0,n.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"1rem"},children:(0,n.jsx)("div",{style:{height:"100px",width:"100px"},children:S&&(0,n.jsx)(H.Ip,{value:M,text:"".concat(M,"%")})})})]})}),(0,n.jsxs)(p.Z,{children:[(0,n.jsx)(d.Z,{children:(0,n.jsx)(B,{samples:m,regressorType:t})}),(0,n.jsx)(d.Z,{children:(0,n.jsx)(W,{samples:m,regressorType:t})})]})]})})}ee.propTypes={regressorType:v().oneOf(["Continuous","Binary"]).isRequired};var te=r(18448),re=r(58835),ne=r(41704);function ae(){var e=(0,o.useState)(""),t=e[0],r=e[1];return(0,n.jsxs)("div",{className:"module-container",children:[(0,n.jsx)(re.Z,{name:"Sample Distribution of OLS Estimators",text:(0,n.jsxs)(n.Fragment,{children:["Like the sample mean, the OLS estimated slope and intercept are random variables with sampling distributions. The Central Limit theorem states that the distribution of the sample average is approximately normal when the sample size is large. This incredibly useful attribute of the sample average also holds for our OLS estimators ",(0,n.jsx)(x.Z,{math:"\\hat{\\beta}_0"})," and ",(0,n.jsx)(x.Z,{math:"\\hat{\\beta}_1"}),"!"]})}),(0,n.jsx)("br",{}),(0,n.jsx)("p",{children:"Select a regressor type:"}),(0,n.jsx)(te.Z,{options:["Continuous","Binary"],select:r,selected:t}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsx)(ne.Z,{showButton:"Binary"===t}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),t&&(0,n.jsx)(ee,{regressorType:t})]})}},5052:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return o}});var n=r(85893),a=r(70786),i=r(58544);function o(){return(0,n.jsx)(i.Z,{children:(0,n.jsx)(a.Z,{})})}},9008:function(e,t,r){e.exports=r(83121)},95774:function(e,t,r){"use strict";r.d(t,{Ip:function(){return u}});var n=r(67294),a=function(e,t){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},a(e,t)};function i(e){var t=e.className,r=e.counterClockwise,a=e.dashRatio,i=e.pathRadius,u=e.strokeWidth,c=e.style;return(0,n.createElement)("path",{className:t,style:Object.assign({},c,s({pathRadius:i,dashRatio:a,counterClockwise:r})),d:o({pathRadius:i,counterClockwise:r}),strokeWidth:u,fillOpacity:0})}function o(e){var t=e.pathRadius,r=e.counterClockwise?1:0;return"\n      M 50,50\n      m 0,-"+t+"\n      a "+t+","+t+" "+r+" 1 1 0,"+2*t+"\n      a "+t+","+t+" "+r+" 1 1 0,-"+2*t+"\n    "}function s(e){var t=e.counterClockwise,r=e.dashRatio,n=e.pathRadius,a=2*Math.PI*n,i=(1-r)*a;return{strokeDasharray:a+"px "+a+"px",strokeDashoffset:(t?-i:i)+"px"}}var u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return function(e,t){function r(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(t,e),t.prototype.getBackgroundPadding=function(){return this.props.background?this.props.backgroundPadding:0},t.prototype.getPathRadius=function(){return 50-this.props.strokeWidth/2-this.getBackgroundPadding()},t.prototype.getPathRatio=function(){var e=this.props,t=e.value,r=e.minValue,n=e.maxValue;return(Math.min(Math.max(t,r),n)-r)/(n-r)},t.prototype.render=function(){var e=this.props,t=e.circleRatio,r=e.className,a=e.classes,o=e.counterClockwise,s=e.styles,u=e.strokeWidth,c=e.text,l=this.getPathRadius(),p=this.getPathRatio();return(0,n.createElement)("svg",{className:a.root+" "+r,style:s.root,viewBox:"0 0 100 100","data-test-id":"CircularProgressbar"},this.props.background?(0,n.createElement)("circle",{className:a.background,style:s.background,cx:50,cy:50,r:50}):null,(0,n.createElement)(i,{className:a.trail,counterClockwise:o,dashRatio:t,pathRadius:l,strokeWidth:u,style:s.trail}),(0,n.createElement)(i,{className:a.path,counterClockwise:o,dashRatio:p*t,pathRadius:l,strokeWidth:u,style:s.path}),c?(0,n.createElement)("text",{className:a.text,style:s.text,x:50,y:50},c):null)},t.defaultProps={background:!1,backgroundPadding:0,circleRatio:1,classes:{root:"CircularProgressbar",trail:"CircularProgressbar-trail",path:"CircularProgressbar-path",text:"CircularProgressbar-text",background:"CircularProgressbar-background"},counterClockwise:!1,className:"",maxValue:100,minValue:0,strokeWidth:8,styles:{root:{},trail:{},path:{},text:{},background:{}},text:""},t}(n.Component)}},function(e){e.O(0,[3662,3714,1265,6898,9581,5283,6817,9169,202,7469,1887,8564,1013,2158,4660,9770,9016,2852,7973,9774,2888,179],(function(){return t=53702,e(e.s=t);var t}));var t=e.O();_N_E=t}]);