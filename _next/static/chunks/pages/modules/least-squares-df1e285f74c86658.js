(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3700],{87487:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/modules/least-squares",function(){return t(34124)}])},78618:function(n,e,t){"use strict";t.d(e,{Z:function(){return f}});var r=t(85893),i=t(62318),o=t(99301),a=t(45697),u=t.n(a),s=t(22852);function c(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function l(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){c(n,e,t[e])}))}return n}function f(n){var e=n.value,t=n.min,a=n.max,u=n.step,s=n.onChange,c=n.customStyle;return(0,r.jsxs)(i.Z,{className:"input-slider-group",style:l({height:30,width:400,margin:"auto",alignItems:"center"},c),children:[(0,r.jsx)(o.Z.Control,{type:"range",className:"form-range",value:e,style:{width:"60%",borderWidth:0},min:t,max:a,step:u,onChange:function(n){return s(n.target.value)}}),(0,r.jsx)(o.Z.Control,{type:"number",className:"input-group-append",value:e,min:t,max:a,step:u,onChange:function(n){return s(n.target.value)}})]})}f.propTypes={value:s.lR.isRequired,min:u().number.isRequired,max:u().number.isRequired,step:u().number.isRequired,onChange:u().func.isRequired}},58544:function(n,e,t){"use strict";t.d(e,{Z:function(){return c}});var r=t(85893),i=t(41664),o=t.n(i),a=t(35005),u=t(9008),s=t.n(u);function c(n){var e=n.children;return(0,r.jsxs)("div",{className:"wrapper",children:[(0,r.jsxs)(s(),{children:[(0,r.jsx)("title",{children:"Econ Simulations"}),(0,r.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"})]}),(0,r.jsxs)("div",{"data-testid":"sim-container",style:{paddingBottom:25},children:[(0,r.jsx)(o(),{href:"/menu",passHref:!0,children:(0,r.jsx)(a.Z,{className:"home-button",variant:"outline-danger",id:"Menu",style:{margin:15},children:"MENU"})}),(0,r.jsx)("div",{className:"mini-logo"}),e]})]})}},58835:function(n,e,t){"use strict";t.d(e,{Z:function(){return s}});var r=t(85893),i=t(88375),o=t(45697),a=t.n(o),u=t(22852);function s(n){var e=n.name,t=n.text;return(0,r.jsxs)(i.Z,{className:"sim-description",variant:"primary","data-testid":"".concat(e,"-into"),children:[(0,r.jsx)(i.Z.Heading,{children:e}),(0,r.jsx)("hr",{}),t]})}s.propTypes={name:a().string.isRequired,text:u.yd.isRequired}},95401:function(n,e,t){"use strict";t.d(e,{Mc:function(){return P},N1:function(){return R},PW:function(){return O},bd:function(){return E},d5:function(){return Z},dn:function(){return C},gT:function(){return x},oq:function(){return A},uR:function(){return q},uZ:function(){return g},xh:function(){return N}});var r=t(88320),i=t(37126),o=t.n(i),a=t(96486),u=t.n(a),s=t(2162),c=t(68856),l=t(22254),f=t.n(l);function d(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function p(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function m(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){p(n,e,t[e])}))}return n}function h(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,i,o=[],a=!0,u=!1;try{for(t=t.call(n);!(a=(r=t.next()).done)&&(o.push(r.value),!e||o.length!==e);a=!0);}catch(s){u=!0,i=s}finally{try{a||null==t.return||t.return()}finally{if(u)throw i}}return o}}(n,e)||v(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(n){return function(n){if(Array.isArray(n))return d(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||v(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(n,e){if(n){if("string"===typeof n)return d(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?d(n,e):void 0}}var x=function(n){var e=[];return u().entries(u().countBy(n)).forEach((function(n){for(var t=h(n,2),r=t[0],i=t[1],o=1;o<=i;o++)e.push({x:+r,y:o})})),e},g=function(n,e,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;return o().rnorm(n,e,t).map((function(n){return u().round(n,r)}))},b=function(n,e,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;return o().runif(n,e,t).map((function(n){return u().round(n,r)}))},j=function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;return o().rexp(n,e).map((function(n){return u().round(n,t)}))},S=function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;return o().rchisq(n,e).map((function(n){return u().round(n,t)}))},w=function(n,e,t,r,i){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:5,s=o().rnorm(n,e,r).map((function(n){return u().round(n,a)})),c=o().rnorm(n,t,i).map((function(n){return u().round(n,a)}));return u().sampleSize(y(s).concat(y(c)),2e3)},A=function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t.mean,i=void 0===r?64:r,o=t.standardDev,a=void 0===o?3:o,s=t.low,c=void 0===s?-10:s,l=t.hi,f=void 0===l?10:l,d=t.lambda,p=void 0===d?1/64:d,h=t.degreesOfFreedom,y=void 0===h?8:h,v=t.mysteryMean1,A=void 0===v?58:v,q=t.mysteryMean2,Z=void 0===q?70:q,O=t.mysterySD1,C=void 0===O?1:O,P=t.mysterySD2,N=void 0===P?3:P,E=t.precision,R=void 0===E?1:E,k={Normal:function(){return g(e,i,a,R)},Uniform:function(){return b(e,c,f,R)},Exponential:function(){return j(e,p,R)},"Chi-Squared":function(){return S(e,y,R)},Mystery:function(){return w(e,A,Z,C,N,R)}},I=k[n]();return u().shuffle(x(I)).map((function(n,e){return m({},n,{id:e+1})}))},q=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x";return n.length>0?(0,r.J69)(n.map((function(n){return n[e]}))):void 0},Z=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x";return n.length>0?(0,r.qoR)(n.map((function(n){return n[e]}))):void 0},O=function(n,e,t,i,o){return"Z"===n?s.jStat.zscore(e,t,i/(0,r._b3)(o)):s.jStat.tscore(e,t,i,o)},C=function(n,e,t,i,o,a){return(n-e)/(0,r._b3)(Math.pow(t,2)/o+Math.pow(i,2)/a)},P=function(n,e,t,r,i){var o="Z"===n?s.jStat.ztest(e,i):s.jStat.ttest(e,r-1,i);return">"===t&&e<0||"<"===t&&e>=0?1-o:o},N=function(n,e,t,r,i,a){var s=[[r*r,a*r*i],[a*r*i,i*i]],l=(0,c.Z)([e,t],s);return o().rnorm(n,0,5).map((function(n){var e=h(l.sample(),2),t=e[0],r=40+3*t+2.5*e[1]+n;return{x:u().clamp(u().round(t,2),0,15),y:u().clamp(u().round(r,2),0,100)}}))},E=function(n,e,t,r){return n.map((function(n){return m({},n,p({},r,(n[r]-e)/(t||1)))}))},R=function(n){var e,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(n.every((function(n){return u().isArray(n)})))e=n;else{if(!n.every((function(n){return u().isObject(n)})))throw new Error;e=n.map((function(n){return[n.x,n.y]}))}var r=f().linear(e,{precision:t}).equation;return{slope:r[0],intercept:r[1]}}},34124:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return E}});var r=t(85893),i=t(67294),o=t(21608),a=t(31555),u=t(62318),s=t(99301),c=t(35005),l=t(45697),f=t.n(l);function d(n){var e=n.generatePoints,t=(0,i.useState)(5),o=t[0],a=t[1];return(0,r.jsxs)(u.Z,{className:"input-slider-group",style:{height:30,width:400,margin:"auto",alignItems:"center"},children:[(0,r.jsx)(s.Z.Control,{type:"range",custom:!0,className:"form-range","data-testid":"new-points-slider",style:{width:"50%",borderWidth:0},min:0,max:10,value:o,onChange:function(n){return a(n.target.value)}}),(0,r.jsx)(u.Z.Text,{children:o}),(0,r.jsx)(c.Z,{variant:"outline-primary",onClick:function(){return e(o)},children:"New Points"})]})}d.propTypes={generatePoints:f().func.isRequired};var p=t(78840),m=t.n(p),h=t(75708),y=t.n(h),v=t(88320),x=t(22852),g=t(75111),b=t.n(g);function j(n){var e=n.points,t=n.addPoint,o=n.linePoints,a=n.setSquareAreas,u=(0,i.useState)(!1),c=u[0],l=u[1],f=(0,i.useState)({tooltip:{headerFormat:"",pointFormat:"x: {point.x:.2f}<br/>y: {point.y:.2f}"},title:{text:""},xAxis:{title:{enabled:!1},min:0,max:20,tickInterval:2},yAxis:{title:{enabled:!1},min:0,max:20,tickInterval:2},legend:{enabled:!1}}),d=f[0],p=f[1];return(0,i.useEffect)((function(){var n=[];o.forEach((function(t){e.forEach((function(e){t.x===e.x&&n.push({p1:t,p2:e})}))}));var r=n.map((function(n){var e=n.p1,t=n.p2;return Math.pow((0,v.WnP)(e.y-t.y),2)}));a(r);var i=function(n,e){var t=(0,v.WnP)(n.y-e.y),r=n.y<e.y?n:e;return[{x:r.x,y:r.y,xAxis:0,yAxis:0},{x:r.x+t,y:r.y,xAxis:0,yAxis:0},{x:r.x+t,y:r.y+t,xAxis:0,yAxis:0},{x:r.x,y:r.y+t,xAxis:0,yAxis:0},{x:r.x,y:r.y,xAxis:0,yAxis:0}]},u=n.map((function(n){var e=n.p1,t=n.p2;return{dashStyle:"solid",fill:"rgba(255, 255, 255, 0)",points:i(e,t),type:"path"}}));p({chart:{animation:!1,type:"line",plotBorderColor:"#000000",plotBorderWidth:1,margin:[100,100,100,100],width:600,height:600,events:{click:function(n){if(c){var e=n.xAxis[0].value,r=n.yAxis[0].value;t({x:e,y:r})}}}},caption:{align:"center",y:0,style:{fontSize:15},text:c?"Click on the chart to add a data point. <br/> Notice how it affects the slope and intercept of the estimated line.":"",verticalAlign:"bottom"},series:[{type:"scatter",marker:{radius:5},data:e},{type:"line",data:o,marker:{enabled:!0,fillColor:"orange"},label:{enabled:!1}}],annotations:[{draggable:"",shapes:u}]})}),[e,t,o,a,c]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(y(),{highcharts:m(),options:d}),(0,r.jsx)(s.Z.Check,{checked:c,inline:!0,className:"form-switch",label:"Enable Click for New Points",onChange:function(){return l(!c)}})]})}function S(n){var e=n.stage,t=n.setStage,i=n.squareAreas,o=n.generateBestLine;return 2===e?(0,r.jsx)(c.Z,{variant:"outline-primary",onClick:function(){return t(3)},children:"Plot Your Guess"}):(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{children:["Sum Squares: ",i.reduce((function(n,e){return n+e}),0).toFixed(2)]}),(0,r.jsx)(c.Z,{variant:"outline-info",onClick:function(){return o()},children:"Reveal the Least Squares Line"})]})}"object"===typeof m()&&b()(m()),j.propTypes={points:x.WY.isRequired,addPoint:f().func.isRequired,linePoints:x.WY.isRequired,setSquareAreas:f().func.isRequired},S.propTypes={stage:f().number.isRequired,setStage:f().func.isRequired,squareAreas:f().arrayOf(f().number).isRequired,generateBestLine:f().func.isRequired};var w=t(78618),A=t(95401);function q(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function Z(n){return function(n){if(Array.isArray(n))return q(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,e){if(!n)return;if("string"===typeof n)return q(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return q(n,e)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(){var n=(0,i.useState)([]),e=n[0],t=n[1],u=(0,i.useState)([]),s=u[0],c=u[1],l=(0,i.useState)(1),f=l[0],p=l[1],m=(0,i.useState)([]),h=m[0],y=m[1],x=(0,i.useState)(1),g=x[0],b=x[1],q=(0,i.useState)(1),O=q[0],C=q[1],P=(0,i.useCallback)((function(n){t(Z(e).concat([n]))}),[e]);(0,i.useEffect)((function(){2===f&&(c([]),y([]),b(1),C(1))}),[f]),(0,i.useEffect)((function(){if(3===f){y([]);var n=[{x:0,y:0}].concat(Z(e)).map((function(n){return{x:n.x,y:n.x*+g+ +O}}));n.sort((function(n,e){return n.x-e.x})),c(n)}}),[f,g,O,e]);return(0,r.jsxs)(o.Z,{className:"least-squares-container",children:[(0,r.jsx)(a.Z,{xs:"auto",children:(0,r.jsx)(j,{points:e,addPoint:P,linePoints:s,setSquareAreas:y})}),(0,r.jsxs)(a.Z,{xs:{span:3,offset:3},md:{span:3,offset:0},style:{paddingTop:"100px"},children:[(0,r.jsx)(d,{generatePoints:function(n){for(var e=[],r=0;r<n;r++){var i=(0,v.MXc)(2,17),o=(0,v.MXc)(2,17);e.push({x:+i,y:+o})}t(e),p(2)}}),(0,r.jsx)("br",{}),e.length>0&&(0,r.jsxs)(r.Fragment,{children:[2===f&&(0,r.jsx)("p",{children:"Guess a Slope and Y-Intercept to fit the points"}),3===f&&(0,r.jsx)("p",{children:"Want to try again? Guess a different slope and y-intercept to reduce the Sum of Squares!"}),f>=2&&(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{children:"Intercept"}),(0,r.jsx)(w.Z,{value:O,min:-20,max:20,step:.1,onChange:function(n){return C(n)}}),(0,r.jsx)("br",{}),(0,r.jsx)("h4",{children:"Slope"}),(0,r.jsx)(w.Z,{value:g,min:-10,max:10,step:.1,onChange:function(n){return b(n)}}),(0,r.jsx)("br",{}),(0,r.jsx)(S,{stage:f,setStage:p,squareAreas:h,generateBestLine:function(){var n=(0,A.N1)(e,1),t=n.slope,r=n.intercept;b(t),C(r)}})]})]})]})]})}var C=t(58835);function P(){return(0,r.jsxs)("div",{className:"module-container",children:[(0,r.jsx)(C.Z,{name:"Least Squares",text:"The Ordinary Least Squares method estimates the intercept and slope of a line that \u201cbest fits\u201d the observed data by minimizing the sum of the squared distances between the points and the line."}),(0,r.jsx)("br",{}),(0,r.jsx)(O,{})]})}var N=t(58544);function E(){return(0,r.jsx)(N.Z,{children:(0,r.jsx)(P,{})})}},75042:function(){}},function(n){n.O(0,[3662,1265,3714,6898,9581,7170,5283,7469,8198,1887,8564,1013,1408,2852,9774,2888,179],(function(){return e=87487,n(n.s=e);var e}));var e=n.O();_N_E=e}]);