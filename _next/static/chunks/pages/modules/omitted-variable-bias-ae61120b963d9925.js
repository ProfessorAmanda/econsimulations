(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2145],{75708:function(e,t,n){var r;"undefined"!=typeof self&&self,e.exports=(r=n(67294),function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(){return r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r.apply(this,arguments)}function o(e){return s(e)||u(e)||a(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}function u(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function s(e){if(Array.isArray(e))return c(e)}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0});var f=n(1),d=n.n(f),p="undefined"!=typeof window?f.useLayoutEffect:f.useEffect,m=Object(f.forwardRef)((function(e,t){var n=Object(f.useRef)(),i=Object(f.useRef)();return p((function(){function t(){var t=e.highcharts||"object"===("undefined"==typeof window?"undefined":l(window))&&window.Highcharts,r=e.constructorType||"chart";t?t[r]?e.options?i.current=t[r](n.current,e.options,e.callback?e.callback:void 0):console.warn('The "options" property was not passed.'):console.warn('The "constructorType" property is incorrect or some required module is not imported.'):console.warn('The "highcharts" property was not passed.')}if(i.current){if(!1!==e.allowChartUpdate)if(!e.immutable&&i.current){var r;(r=i.current).update.apply(r,[e.options].concat(o(e.updateArgs||[!0,!0])))}else t()}else t()})),p((function(){return function(){i.current&&(i.current.destroy(),i.current=null)}}),[]),Object(f.useImperativeHandle)(t,(function(){return{get chart(){return i.current},container:n}}),[]),d.a.createElement("div",r({},e.containerProps,{ref:n}))}));t.default=Object(f.memo)(m)},function(e,t){e.exports=r}]))},86199:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/modules/omitted-variable-bias",function(){return n(2846)}])},78618:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(85893),o=n(62318),i=n(99301),a=n(45697),u=n.n(a),s=n(22852);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){c(e,t,n[t])}))}return e}function f(e){var t=e.value,n=e.min,a=e.max,u=e.step,s=e.onChange,c=e.customStyle;return(0,r.jsxs)(o.Z,{className:"input-slider-group",style:l({height:30,width:400,margin:"auto",alignItems:"center"},c),children:[(0,r.jsx)(i.Z.Control,{type:"range",className:"form-range",value:t,style:{width:"60%",borderWidth:0},min:n,max:a,step:u,onChange:function(e){return s(e.target.value)}}),(0,r.jsx)(i.Z.Control,{type:"number",className:"input-group-append",value:t,min:n,max:a,step:u,onChange:function(e){return s(e.target.value)}})]})}f.propTypes={value:s.lR.isRequired,min:u().number.isRequired,max:u().number.isRequired,step:u().number.isRequired,onChange:u().func.isRequired}},58544:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(85893),o=n(41664),i=n.n(o),a=n(35005),u=n(9008),s=n.n(u);function c(e){var t=e.children;return(0,r.jsxs)("div",{className:"wrapper",children:[(0,r.jsxs)(s(),{children:[(0,r.jsx)("title",{children:"Econ Simulations"}),(0,r.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"})]}),(0,r.jsxs)("div",{"data-testid":"sim-container",style:{paddingBottom:25},children:[(0,r.jsx)(i(),{href:"/menu",passHref:!0,children:(0,r.jsx)(a.Z,{className:"home-button",variant:"outline-danger",id:"Menu",style:{margin:15},children:"MENU"})}),(0,r.jsx)("div",{className:"mini-logo"}),t]})]})}},58835:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(85893),o=n(88375),i=n(45697),a=n.n(i),u=n(22852);function s(e){var t=e.name,n=e.text;return(0,r.jsxs)(o.Z,{className:"sim-description",variant:"primary","data-testid":"".concat(t,"-into"),children:[(0,r.jsx)(o.Z.Heading,{children:t}),(0,r.jsx)("hr",{}),n]})}s.propTypes={name:a().string.isRequired,text:u.yd.isRequired}},95401:function(e,t,n){"use strict";n.d(t,{Mc:function(){return N},N1:function(){return T},PW:function(){return C},bd:function(){return E},d5:function(){return _},dn:function(){return R},gT:function(){return x},oq:function(){return Z},uR:function(){return O},uZ:function(){return b},xh:function(){return A}});var r=n(88320),o=n(37126),i=n.n(o),a=n(96486),u=n.n(a),s=n(2162),c=n(68856),l=n(22254),f=n.n(l);function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){p(e,t,n[t])}))}return e}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(s){u=!0,o=s}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(e,t)||v(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||v(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){if(e){if("string"===typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}var x=function(e){var t=[];return u().entries(u().countBy(e)).forEach((function(e){for(var n=h(e,2),r=n[0],o=n[1],i=1;i<=o;i++)t.push({x:+r,y:i})})),t},b=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;return i().rnorm(e,t,n).map((function(e){return u().round(e,r)}))},j=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;return i().runif(e,t,n).map((function(e){return u().round(e,r)}))},g=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;return i().rexp(e,t).map((function(e){return u().round(e,n)}))},w=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;return i().rchisq(e,t).map((function(e){return u().round(e,n)}))},S=function(e,t,n,r,o){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:5,s=i().rnorm(e,t,r).map((function(e){return u().round(e,a)})),c=i().rnorm(e,n,o).map((function(e){return u().round(e,a)}));return u().sampleSize(y(s).concat(y(c)),2e3)},Z=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.mean,o=void 0===r?64:r,i=n.standardDev,a=void 0===i?3:i,s=n.low,c=void 0===s?-10:s,l=n.hi,f=void 0===l?10:l,d=n.lambda,p=void 0===d?1/64:d,h=n.degreesOfFreedom,y=void 0===h?8:h,v=n.mysteryMean1,Z=void 0===v?58:v,O=n.mysteryMean2,_=void 0===O?70:O,C=n.mysterySD1,R=void 0===C?1:C,N=n.mysterySD2,A=void 0===N?3:N,E=n.precision,T=void 0===E?1:E,P={Normal:function(){return b(t,o,a,T)},Uniform:function(){return j(t,c,f,T)},Exponential:function(){return g(t,p,T)},"Chi-Squared":function(){return w(t,y,T)},Mystery:function(){return S(t,Z,_,R,A,T)}},q=P[e]();return u().shuffle(x(q)).map((function(e,t){return m({},e,{id:t+1})}))},O=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x";return e.length>0?(0,r.J69)(e.map((function(e){return e[t]}))):void 0},_=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x";return e.length>0?(0,r.qoR)(e.map((function(e){return e[t]}))):void 0},C=function(e,t,n,o,i){return"Z"===e?s.jStat.zscore(t,n,o/(0,r._b3)(i)):s.jStat.tscore(t,n,o,i)},R=function(e,t,n,o,i,a){return(e-t)/(0,r._b3)(Math.pow(n,2)/i+Math.pow(o,2)/a)},N=function(e,t,n,r,o){var i="Z"===e?s.jStat.ztest(t,o):s.jStat.ttest(t,r-1,o);return">"===n&&t<0||"<"===n&&t>=0?1-i:i},A=function(e,t,n,r,o,a){var s=[[r*r,a*r*o],[a*r*o,o*o]],l=(0,c.Z)([t,n],s);return i().rnorm(e,0,5).map((function(e){var t=h(l.sample(),2),n=t[0],r=40+3*n+2.5*t[1]+e;return{x:u().clamp(u().round(n,2),0,15),y:u().clamp(u().round(r,2),0,100)}}))},E=function(e,t,n,r){return e.map((function(e){return m({},e,p({},r,(e[r]-t)/(n||1)))}))},T=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(e.every((function(e){return u().isArray(e)})))t=e;else{if(!e.every((function(e){return u().isObject(e)})))throw new Error;t=e.map((function(e){return[e.x,e.y]}))}var r=f().linear(t,{precision:n}).equation;return{slope:r[0],intercept:r[1]}}},32707:function(e,t,n){"use strict";n.d(t,{Z:function(){return L}});var r=n(85893),o=n(21608),i=n(67294),a=n(31555),u=n(88375),s=n(94184),c=n.n(s),l=n(76792);const f=i.forwardRef((({bsPrefix:e,bg:t,pill:n,text:o,className:i,as:a="span",...u},s)=>{const f=(0,l.vE)(e,"badge");return(0,r.jsx)(a,{ref:s,...u,className:c()(i,f,n&&"rounded-pill",o&&`text-${o}`,t&&`bg-${t}`)})}));f.displayName="Badge",f.defaultProps={bg:"primary",pill:!1};var d=f,p=n(35005),m=n(62318),h=n(99301),y=n(45697),v=n.n(y),x=n(60456),b=n(22852);function j(e){var t=e.beta,n=e.setBeta,o=e.delta,i=e.setDelta;return(0,r.jsxs)("div",{children:[(0,r.jsxs)(m.Z,{children:[(0,r.jsxs)(m.Z.Text,{children:[(0,r.jsx)(x.Z,{math:"\\beta_1"}),", the Coefficient on Study Hours:"]}),(0,r.jsx)(h.Z.Control,{type:"number",step:.1,value:t,min:-4,max:4,onChange:function(e){return n(parseFloat(e.target.value))}})]}),(0,r.jsx)("br",{}),(0,r.jsxs)(m.Z,{children:[(0,r.jsxs)(m.Z.Text,{children:[(0,r.jsx)(x.Z,{math:"\\delta_1"}),", the Coefficient on Sleep Hours:"]}),(0,r.jsx)(h.Z.Control,{type:"number",step:.1,value:o,min:-4,max:4,onChange:function(e){i(parseFloat(e.target.value))}})]})]})}j.propTypes={beta:b.lR.isRequired,setBeta:v().func.isRequired,delta:b.lR.isRequired,setDelta:v().func.isRequired};var g=n(68856),w=n(88320),S=n(78840),Z=n.n(S),O=n(75708),_=n.n(O);function C(e){var t=e.dataPoints,n=e.naiveLine,o=e.correctedLine,a=(0,i.useState)({}),u=a[0],s=a[1];return(0,i.useEffect)((function(){s({chart:{type:"scatter",zoomtype:"xy"},title:{text:"Study Hours vs. Test Score"},xAxis:{min:0,max:10,title:{text:"Study Hours"}},yAxis:{min:20,max:100,title:{text:"Test Score"}},series:[{type:"scatter",data:t,name:"Test Score",color:"#33A5FF"},{type:"line",data:n,name:"Naive Regression",color:"#E30404",label:{enabled:!1}},{type:"line",data:o,name:"Corrected Regression",color:"#2AC208",label:{enabled:!1}}]})}),[t,n,o]),(0,r.jsx)(_(),{highcharts:Z(),options:u})}C.propTypes={dataPoints:b.WY.isRequired,naiveLine:v().arrayOf(v().number),correctedLine:v().arrayOf(v().number)};var R=n(37126),N=n.n(R),A=n(96486),E=n.n(A),T=n(78618),P=n(95401);function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(s){u=!0,o=s}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return q(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(){var e=(0,i.useState)(3),t=e[0],n=e[1],s=(0,i.useState)(3),c=s[0],l=s[1],f=(0,i.useState)(0),m=f[0],h=f[1],y=(0,i.useState)(1),v=y[0],b=y[1],S=(0,i.useState)([]),Z=S[0],O=S[1],_=(0,i.useState)(!1),R=_[0],A=_[1],q=(0,i.useState)({points:[],naiveLine:[],correctedLine:[]}),I=q[0],M=q[1],L=(0,i.useState)([0,0]),F=L[0],k=L[1],B=(0,i.useState)([0,0,0]),$=B[0],V=B[1],D=1e3;(0,i.useEffect)((function(){if(Z.length>0){for(var e=N().rnorm(D,0,5),n=[],r=[],o=[],i=[],a=0;a<D;a++){var u=40+t*Z[a][0]+c*Z[a][1]+e[a];i.push((0,w.NMM)(100*u)/100),n.push(1),r.push(Z[a][0]),o.push(Z[a][1])}for(var s=[],l=0;l<D;l++)s.push([Z[l][0],i[l]]);var f=(0,P.N1)(s),d=f.slope,p=f.intercept,m=(0,w.p4s)((0,w.pIu)([n,r,o])),h=(0,w.p4s)((0,w.pIu)([i])),y=(0,w.JBn)((0,w.JpY)((0,w.p4s)(m),m)),v=(0,w.JpY)((0,w.JpY)(y,(0,w.p4s)(m)),h),x=function(e,t){return E().range(0,11).map((function(n){return E().round(t+n*e,2)}))};k([p,d]),V([parseFloat(v.get([0,0])),t,c]),M({points:s.map((function(e){var t=H(e,2);return{x:t[0],y:t[1]}})),naiveLine:x(d,p),correctedLine:x(parseFloat(v.get([1,0])),parseFloat(v.get([0,0])))}),A(!1)}}),[Z]),(0,i.useEffect)((function(){I.points.length>0&&I.naiveLine.length>0&&b(2)}),[I]);return(0,r.jsxs)("div",{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)("p",{children:"Choose Population Parameters:"})}),(0,r.jsx)("br",{}),(0,r.jsxs)(o.Z,{lg:2,sm:1,children:[(0,r.jsx)(a.Z,{style:{margin:"auto",padding:10},children:(0,r.jsx)(j,{beta:t,setBeta:n,delta:c,setDelta:l})}),(0,r.jsxs)(a.Z,{children:[(0,r.jsx)("div",{style:{padding:10},children:"Set the Correlation between Study Hours and Sleep Hours:"}),(0,r.jsx)(T.Z,{value:m,min:-.99,max:.99,step:.01,onChange:function(e){return h(e)}}),(0,r.jsx)("br",{}),(0,r.jsxs)(u.Z,{variant:"secondary",style:{width:"fit-content",margin:"auto"},children:["Covariance between Study Hours and Sleep Hours: "," ",(0,r.jsx)(d,{className:"badge bg-primary pill","aria-label":"covariance",children:(3*m*6).toFixed(2)})]})]})]}),(0,r.jsx)("br",{}),(0,r.jsx)(o.Z,{children:(0,r.jsxs)(a.Z,{children:[(0,r.jsx)("p",{children:"Estimate Regression Using Test Score and Study Hours Data "}),(0,r.jsx)(p.Z,{variant:"primary",onClick:function(){return function(){for(var e=[[9,3*m*6],[3*m*6,36]],t=(0,g.Z)([5,2],e),n=[],r=0;r<D;r++){var o=H(t.sample(),2),i=o[0],a=o[1];n.push([E().round(i,2),E().round(a,2)])}O(n)}()},children:"Generate!"})]})}),(0,r.jsx)("br",{}),v>=2&&(0,r.jsxs)("div",{children:[(0,r.jsx)(o.Z,{children:(0,r.jsx)(a.Z,{lg:{span:12,offset:0},xl:{span:8,offset:2},children:(0,r.jsx)(C,{dataPoints:I.points,naiveLine:I.naiveLine,correctedLine:R?I.correctedLine:[]})})}),(0,r.jsx)(o.Z,{children:(0,r.jsxs)(a.Z,{children:[(0,r.jsx)("p",{variant:"primary",children:"Add Omitted Variable, Density, to Regression"}),(0,r.jsx)(p.Z,{variant:"outline-primary",onClick:function(){return A(!R)},active:R,children:"Show Corrected Regression Line"})]})}),(0,r.jsx)(o.Z,{lg:{span:12,offset:0},xl:{span:4,offset:1},children:(0,r.jsxs)("div",{style:{marginTop:30,marginBottom:30},children:[(0,r.jsx)(x.Z,{children:"\\text{Naive Regression: }TestScore = ".concat(F[0].toFixed(1)," + ").concat(F[1].toFixed(1)," * StudyHours + u_i")}),(0,r.jsx)("br",{}),(0,r.jsx)(x.Z,{children:R?"\\text{Corrected Regression: }TestScore = ".concat($[0].toFixed(1)," + ").concat($[1]," * StudyHours + ").concat($[2].toFixed(1)," * SleepHours + u_i"):""})]})})]})]})}var M=n(58835);function L(){return(0,r.jsxs)("div",{className:"module-container",children:[(0,r.jsx)(M.Z,{name:"Omitted Variable Bias",text:(0,r.jsxs)(r.Fragment,{children:["Omitted Variable Bias (OVB) is the bias in a regression estimator that arises when there is a variable (",(0,r.jsx)(x.Z,{math:"V"}),") which is not included in the regression that is correlated with the regressor (",(0,r.jsx)(x.Z,{math:"X"}),") and is a determinant of the outcome (",(0,r.jsx)(x.Z,{math:"Y"}),"). In the regression model ",(0,r.jsx)(x.Z,{math:"Y_i = \\beta_0 + \\beta_1 X_i + \\delta V_i + \\epsilon_i"})," where ",(0,r.jsx)(x.Z,{math:"V"})," is omitted from the regression estimation, the OVB is described as the final term in the following expression: ",(0,r.jsx)(x.Z,{math:"\\hat{\\beta}_1 \\xrightarrow{p} \\beta_1 + \\frac{\\delta Cov(X,V)}{Var(X)}"})]})}),(0,r.jsx)("br",{}),(0,r.jsxs)(o.Z,{children:[(0,r.jsx)("p",{children:"We are studying the relationship between test score and study hours:"}),(0,r.jsx)(x.Z,{math:"Test\\ Score = \\beta_0 + \\beta_1 Study\\ Hours_i + \\delta Sleep\\ Hours_i + u_i"})]}),(0,r.jsx)("br",{}),(0,r.jsx)(I,{}),(0,r.jsx)("br",{})]})}},2846:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var r=n(85893),o=n(32707),i=n(58544);function a(){return(0,r.jsx)(i.Z,{children:(0,r.jsx)(o.Z,{})})}},9008:function(e,t,n){e.exports=n(83121)},62318:function(e,t,n){"use strict";var r=n(94184),o=n.n(r),i=n(67294),a=n(66611),u=n(76792),s=n(6558),c=n(23045),l=n(85893);const f=(0,a.Z)("input-group-text",{Component:"span"}),d=i.forwardRef((({bsPrefix:e,size:t,hasValidation:n,className:r,as:a="div",...s},f)=>{e=(0,u.vE)(e,"input-group");const d=(0,i.useMemo)((()=>({})),[]);return(0,l.jsx)(c.Z.Provider,{value:d,children:(0,l.jsx)(a,{ref:f,...s,className:o()(r,e,t&&`${e}-${t}`,n&&"has-validation")})})}));d.displayName="InputGroup",t.Z=Object.assign(d,{Text:f,Radio:e=>(0,l.jsx)(f,{children:(0,l.jsx)(s.Z,{type:"radio",...e})}),Checkbox:e=>(0,l.jsx)(f,{children:(0,l.jsx)(s.Z,{type:"checkbox",...e})})})},23045:function(e,t,n){"use strict";const r=n(67294).createContext(null);r.displayName="InputGroupContext",t.Z=r},21608:function(e,t,n){"use strict";var r=n(94184),o=n.n(r),i=n(67294),a=n(76792),u=n(85893);const s=i.forwardRef((({bsPrefix:e,className:t,as:n="div",...r},i)=>{const s=(0,a.vE)(e,"row"),c=(0,a.pi)(),l=`${s}-cols`,f=[];return c.forEach((e=>{const t=r[e];let n;delete r[e],null!=t&&"object"===typeof t?({cols:n}=t):n=t;const o="xs"!==e?`-${e}`:"";null!=n&&f.push(`${l}${o}-${n}`)})),(0,u.jsx)(n,{ref:i,...r,className:o()(t,s,...f)})}));s.displayName="Row",t.Z=s},75042:function(){}},function(e){e.O(0,[3662,3714,1265,6898,9581,5283,6817,9169,202,7469,1887,8564,1013,2852,9774,2888,179],(function(){return t=86199,e(e.s=t);var t}));var t=e.O();_N_E=t}]);