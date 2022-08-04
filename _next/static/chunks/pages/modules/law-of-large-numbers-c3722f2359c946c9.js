(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1218],{17848:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/modules/law-of-large-numbers",function(){return t(61643)}])},34309:function(e,n,t){"use strict";t.d(n,{Z:function(){return x}});var r=t(85893),a=t(84762),i=t(10682),o=t(21608),s=t(88375),l=t(31555),u=t(96486),c=t.n(u),d=t(45697),p=t.n(d),m=t(22852),f=t(2828),h=t(70207);function b(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function x(e){var n,t=e.popArray,u=e.popMean,d=e.sampled,p=e.sampleMean,m=e.popShape,x=f.HB[m],v=x.xmaxval,y=x.xminval,g=x.ymaxval,j=x.title,S=x.xLabel,w=[{name:"Population Observations",data:t},{name:"Sampled Observations",data:d},{type:"line",name:"Sample Mean",data:[{x:p||0,y:0,id:1},{x:p||0,y:g,id:2}],color:"red",enableMouseTracking:!1,showInLegend:!1,visible:void 0!==p&&d.length>0,label:{format:"<div>Sample Mean: ".concat(p,"</div>")}}];return(0,r.jsx)("div",{children:(0,r.jsxs)(i.Z,{fluid:!0,children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(s.Z,{variant:"secondary",children:"Uniform"!==m?(0,r.jsxs)("p",{children:["We queried the ",f.oS[m][0]," of ",t.length," ",f.oS[m][1]," and plotted the results on the following chart."]}):(0,r.jsx)("p",{children:"Behavioral economists studying loss aversion design a lottery among 2000 participants where each amount between -10 and +10 is equally likely.  We plotted the winnings and losses below."})})}),(0,r.jsxs)(o.Z,{xs:1,lg:2,children:[(0,r.jsx)(l.Z,{lg:9,children:(0,r.jsx)(a.Z,{series:w,title:"".concat(j," <br /> Population Mean: ").concat(c().round(u,2)),xMin:y,xMax:v,yMax:g,xLabel:S,animation:!1})}),(0,r.jsxs)(l.Z,{lg:3,children:[(0,r.jsx)(h.Z,{data:t,headers:(n={},b(n,f.HB[m].tableCol,"id"),b(n,f.HB[m].xLabel,"x"),n),height:350,setRowColor:function(e){return d.map((function(e){return e.id})).includes(e.id)?"#747EF2":void 0}}),(0,r.jsx)("br",{})]})]})]})})}x.propTypes={popArray:m.WY.isRequired,popMean:p().number.isRequired,sampled:m.WY.isRequired,sampleMean:p().number,popShape:m.GH.isRequired}},76041:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var r=t(85893),a=t(56180),i=t.n(a),o=t(37727),s=t(45697),l=t.n(s),u=t(74645);function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){c(e,n,t[n])}))}return e}function p(e){var n=e.children,t=(0,u.Z)();return(0,r.jsx)("div",{children:(0,r.jsx)(i(),{style:{margin:"auto",width:"100%",textAlign:"center",backgroundColor:"rgba(255,255,255,0.4)",marginBottom:"1em"},isOpened:!0,springConfig:d({},o.um.gentle),children:(0,r.jsx)("div",{style:{height:"100%",padding:t.isMobile?"1em":"4em"},children:n})})})}p.propTypes={children:l().element.isRequired}},70207:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var r=t(85893),a=t(75147),i=t(45697),o=t.n(i),s=t(96486),l=t.n(s),u=t(28899),c=t.n(u);function d(e){var n=e.data,t=e.headers,i=e.height,o=e.setSelected,s=e.setRowColor,u=function(e){return s?s(e):void 0},d=n.map((function(e){return(0,r.jsx)("tr",{style:{backgroundColor:u(e)},onClick:function(){return n=e,void(o&&o(n));var n},children:l().values(t).map((function(n){return(0,r.jsx)("td",{children:isNaN(e[n])?e[n].toUpperCase():l().round(e[n],2)},n)}))},e.id)}));return d.reverse(),(0,r.jsx)("div",{className:c().dataTableContainer,style:{height:"".concat(i||250,"px")},children:(0,r.jsxs)(a.Z,{hover:!!o,striped:!0,className:c().dataTable,style:{cursor:o?"pointer":"default"},children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{children:l().keys(t).map((function(e){return(0,r.jsx)("th",{children:e},e)}))})}),(0,r.jsx)("tbody",{children:d})]})})}d.propTypes={data:o().arrayOf(o().shape({id:o().number.isRequired})).isRequired,headers:o().object.isRequired,height:o().number,setSelected:o().func,setRowColor:o().func}},23905:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var r=t(85893),a=t(67294),i=t(62318),o=t(99301),s=t(35005),l=t(45697),u=t.n(l);function c(e){var n=e.maxSize,t=e.minSize,l=e.handleClick,u=(0,a.useState)(""),c=u[0],d=u[1];return(0,a.useEffect)((function(){d("")}),[n]),(0,r.jsxs)(i.Z,{style:{width:"60%",margin:"auto",marginBottom:20},children:[(0,r.jsx)(o.Z.Control,{align:"right",type:"number",placeholder:"Sample Size:",min:t,value:c,max:n,onChange:function(e){return d(e.target.value)}}),(0,r.jsx)(s.Z,{variant:"secondary",disabled:!c||+c>n||+c<t,onClick:function(){return l(+c,1,!1)},children:"Sample"})]})}c.propTypes={maxSize:u().number.isRequired,minSize:u().number.isRequired,handleClick:u().func.isRequired,classname:u().string}},18448:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var r=t(85893),a=t(35005),i=t(2086),o=t(45697),s=t.n(o),l=t(22852),u=t(78524),c=t.n(u),d=t(74645);function p(e){var n=e.options,t=e.select,o=e.selected,s=(0,d.Z)(),l=n.map((function(e){return(0,r.jsx)(a.Z,{className:o===e?c().selected:c().unselected,variant:o===e?c().selected:c().unselected,onClick:function(){return t(e)},children:e},"".concat(e))}));return(0,r.jsx)("div",{className:c().container,children:(0,r.jsx)(i.Z,{size:s.isMobile?"sm":void 0,children:l})})}p.propTypes={options:s().arrayOf(l.yd).isRequired,select:s().func.isRequired,selected:l.yd}},84805:function(e,n,t){"use strict";t.d(n,{Z:function(){return b}});var r=t(85893),a=t(67294),i=t(78840),o=t.n(i),s=t(75708),l=t.n(s),u=t(67525),c=t(35005),d=t(45697),p=t.n(d),m=t(22852);function f(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function h(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"===typeof e)return f(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return f(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e){var n=e.title,t=e.mathTitle,i=e.popArray,s=e.sampleSeriesName,d=e.popValSeriesName,p=e.yLabel,m=e.sampleFn,f=e.yFn,b=(0,a.useState)([]),x=b[0],v=b[1],y=(0,a.useState)([]),g=y[0],j=y[1],S=(0,a.useState)(!1),w=S[0],Z=S[1],C=(0,a.useState)({chart:{type:"line",animation:!1},plotOptions:{series:{states:{hover:{enabled:!1}}}},title:{text:n||""},xAxis:{title:{text:"Sample Size"},min:0},yAxis:{title:{text:p}},tooltip:{enabled:!1}}),N=C[0],R=C[1],_=(0,a.useRef)();(0,a.useEffect)((function(){v([]),j([]),Z(!1),clearInterval(_.current)}),[t]),(0,a.useEffect)((function(){R({series:[{name:d,data:g,label:{enabled:!1},marker:{enabled:!1},color:"red"},{name:s,data:x,label:{enabled:!1},marker:{enabled:!1},color:"black"}]})}),[x,g,d,s]),(0,a.useEffect)((function(){return function(){return clearInterval(_.current)}}),[]);var T=function(){w?clearInterval(_.current):function(){v([]),j([]);var e=0;_.current=setInterval((function(){for(var n,t=[],r=0;r<((n=e)<200?1:n<500?2:n<1e3?4:8);r++){if((e+=1)>=2e3){clearInterval(_.current),Z(!1);break}var a=m(i,e);t.push({x:e,y:f(a)})}v((function(e){return h(e).concat(h(t))})),j((function(n){return h(n).concat([{x:e,y:f(i)}])}))}),e)}(),Z(!w)};return(0,r.jsxs)(u.Z,{body:!0,children:[t&&t,(0,r.jsx)(l(),{highcharts:o(),options:N}),(0,r.jsxs)(c.Z,{variant:"outline-".concat(w?"danger":"success"),onClick:function(){return T()},children:[w?"Stop":"Start"," Simulation"]})]})}b.propTypes={title:p().string,mathTitle:m.yd,popArray:m.WY.isRequired,sampleSeriesName:p().string.isRequired,popValSeriesName:p().string.isRequired,yLabel:p().string.isRequired,sampleFn:p().func.isRequired,yFn:p().func.isRequired}},74645:function(e,n,t){"use strict";var r=t(67294);n.Z=function(){var e=(0,r.useState)({width:void 0,height:void 0,isMobile:!1}),n=e[0],t=e[1];return(0,r.useEffect)((function(){var e=function(){t({width:window.innerWidth,height:window.innerHeight,isMobile:window.innerWidth<768})};return e(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n}},61643:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return w}});var r=t(85893),a=t(67294),i=t(76041),o=t(34309),s=t(23905),l=t(88375),u=t(95401),c=t(96486),d=t.n(c),p=t(45697),m=t.n(p),f=t(22852),h=t(84805);function b(e){var n=e.popShape,t=e.sampleSize,c=(0,a.useState)([]),p=c[0],m=c[1],f=(0,a.useState)(1),b=f[0],x=f[1],v=(0,a.useState)([]),y=v[0],g=v[1];(0,a.useEffect)((function(){x(1);var e=(0,u.oq)(n,t);g(e),m([])}),[n,t]);var j=(0,u.uR)(y)||0,S=d().round((0,u.uR)(p),2)||0;return(0,r.jsx)(i.Z,{children:(0,r.jsxs)("div",{"data-testid":"lln-sim",children:[(0,r.jsx)(o.Z,{popArray:y,popMean:j,sampled:p,sampleMean:S,popShape:n}),(0,r.jsx)("p",{children:"Try a few different sample sizes and compare sample mean to population mean"}),(0,r.jsx)(s.Z,{maxSize:y.length,minSize:1,handleClick:function(e){var n=d().sampleSize(y,e);m(n),x(2)},classname:"sample-size-input"}),b>=2&&(0,r.jsxs)("div",{children:[(0,r.jsxs)(l.Z,{variant:"success",children:["Sample Mean: ",d().round(S,2)||"",(0,r.jsx)("br",{}),"Difference of Means: ",d().round(j-S,2)]}),(0,r.jsx)(l.Z,{variant:"info",children:"According to the law, the average of the results obtained from a large enough sample should be close to the total average of the population, and will tend to become closer the larger the sample is. Make sure to pick several samples, or see below for a simulation to see the law in action."}),(0,r.jsx)(h.Z,{title:"Population vs Sample Means <br /> (".concat(n,")"),popArray:y,popValue:d().round(j,2),popValSeriesName:"Population Mean (".concat(j.toFixed(2),")"),sampleSeriesName:"Sampled Means",yLabel:"Mean",sampleFn:d().sampleSize,yFn:function(e){return d().round((0,u.uR)(e),2)}})]})]})})}b.propTypes={popShape:f.GH.isRequired,sampleSize:m().number.isRequired};var x=t(2828),v=t(58835),y=t(60456),g=t(18448);function j(){var e=(0,a.useState)(""),n=e[0],t=e[1];return(0,r.jsxs)("div",{className:"module-container",children:[(0,r.jsx)(v.Z,{name:"Law of Large Numbers",text:(0,r.jsxs)(r.Fragment,{children:["The Law of Large Numbers (LLN) is a statement about the relationship between a population and a random sample drawn from that population. Let ",(0,r.jsx)(y.Z,{math:"\\mu"})," denote the true mean of a variable when calculated using the entire population, let ",(0,r.jsx)(y.Z,{math:"\\sigma"})," denote the true standard deviation of that variable when calculated using the entire population, let ",(0,r.jsx)(y.Z,{math:"\\bar{x}"})," denote the mean calculated from a sample drawn from that population, and let ",(0,r.jsx)(y.Z,{math:"s"})," denote the standard deviation calculated from that sample. We would like to use information from the sample to make conclusions about the population. The LLN is helpful in this endeavor, because it states that as the sample size gets larger, the sample mean approaches the true population mean. This simulation\u2019s goal is to demonstrate this handy property."]})}),(0,r.jsx)("br",{}),(0,r.jsx)("p",{children:"Pick a Population Distribution:"}),(0,r.jsx)(g.Z,{options:["Normal","Uniform","Exponential","Chi-Squared"],select:t,selected:n}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),n&&(0,r.jsx)(b,{popShape:n,sampleSize:x.EV})]})}var S=t(58544);function w(){return(0,r.jsx)(S.Z,{children:(0,r.jsx)(j,{})})}},28899:function(e){e.exports={dataTableContainer:"DataTable_dataTableContainer__pVbbY",dataTable:"DataTable_dataTable__OJQDW",dataTableDynamicContainer:"DataTable_dataTableDynamicContainer__SlkFK"}},78524:function(e){e.exports={container:"SelectorButtonGroup_container__xygrc",selected:"SelectorButtonGroup_selected___QDDN",unselected:"SelectorButtonGroup_unselected__VIO8g"}},67525:function(e,n,t){"use strict";t.d(n,{Z:function(){return N}});var r=t(94184),a=t.n(r),i=t(67294),o=t(76792),s=t(66611),l=t(39602),u=t(85893);const c=i.forwardRef((({bsPrefix:e,className:n,variant:t,as:r="img",...i},s)=>{const l=(0,o.vE)(e,"card-img");return(0,u.jsx)(r,{ref:s,className:a()(t?`${l}-${t}`:l,n),...i})}));c.displayName="CardImg";var d=c;const p=i.createContext(null);p.displayName="CardHeaderContext";var m=p;const f=i.forwardRef((({bsPrefix:e,className:n,as:t="div",...r},s)=>{const l=(0,o.vE)(e,"card-header"),c=(0,i.useMemo)((()=>({cardHeaderBsPrefix:l})),[l]);return(0,u.jsx)(m.Provider,{value:c,children:(0,u.jsx)(t,{ref:s,...r,className:a()(n,l)})})}));f.displayName="CardHeader";var h=f;const b=(0,l.Z)("h5"),x=(0,l.Z)("h6"),v=(0,s.Z)("card-body"),y=(0,s.Z)("card-title",{Component:b}),g=(0,s.Z)("card-subtitle",{Component:x}),j=(0,s.Z)("card-link",{Component:"a"}),S=(0,s.Z)("card-text",{Component:"p"}),w=(0,s.Z)("card-footer"),Z=(0,s.Z)("card-img-overlay"),C=i.forwardRef((({bsPrefix:e,className:n,bg:t,text:r,border:i,body:s,children:l,as:c="div",...d},p)=>{const m=(0,o.vE)(e,"card");return(0,u.jsx)(c,{ref:p,...d,className:a()(n,m,t&&`bg-${t}`,r&&`text-${r}`,i&&`border-${i}`),children:s?(0,u.jsx)(v,{children:l}):l})}));C.displayName="Card",C.defaultProps={body:!1};var N=Object.assign(C,{Img:d,Title:y,Subtitle:g,Body:v,Link:j,Text:S,Header:h,Footer:w,ImgOverlay:Z})}},function(e){e.O(0,[3662,1265,3714,6898,9581,5283,9169,8198,7469,1082,1013,2158,4660,9770,2852,2864,9774,2888,179],(function(){return n=17848,e(e.s=n);var n}));var n=e.O();_N_E=n}]);