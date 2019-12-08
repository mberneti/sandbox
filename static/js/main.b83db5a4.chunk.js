(this.webpackJsonpsandbox=this.webpackJsonpsandbox||[]).push([[0],{80:function(t,e,n){t.exports=n(91)},91:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(68),i=n(41),c=n(71),l=n(21),s=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"ADD_TODO":return[].concat(Object(l.a)(t),[{id:e.id,text:e.text,completed:!1}]);case"TOGGLE_TODO":return t.map((function(t){return t.id===e.id?Object(c.a)({},t,{completed:!t.completed}):t}));default:return t}},u=Object(i.b)({todos:s}),h=Object(i.c)(u),m=n(8),d=n.n(m);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var p=n(130),f=n(134),y=n(138),g=n(131),E=n(9),v=n(17),b=n(32),x=n(29),k=n(136),O=n(48),w=n(132),A=n(129),C=n(62),j=n(117),S=n(119),H=n(139),N=n(120),R=n(133),M=n(121),L=n(46),T=n.n(L),I=n(47),P=n.n(I),W=Object(C.a)((function(t){return{root:{width:"100%",maxWidth:360,backgroundColor:t.palette.background.paper},nested:{paddingLeft:t.spacing(4)}}}));function B(t){var e=W(),n=r.a.useState(""),a=Object(v.a)(n,2),o=a[0],i=a[1],c=function(t){return function(){o===t&&(t=""),i(t)}},l=function(t,n){return r.a.createElement(j.a,{in:o===t,timeout:"auto",unmountOnExit:!0},r.a.createElement(S.a,null,n.map((function(n){return r.a.createElement(H.a,{key:n.title,button:!0,component:b.b,to:"/"+t+"/"+n.path,className:e.nested},r.a.createElement(N.a,{primary:n.title}))}))))};return r.a.createElement(R.a,{open:t.drawer,onClose:t.onClose},r.a.createElement(S.a,{component:"nav","aria-labelledby":"nested-list-subheader",subheader:r.a.createElement(M.a,{component:"div",id:"nested-list-subheader"},"Topics"),className:e.root},r.a.createElement(H.a,{button:!0,onClick:c("Advanced-Algorithms")},r.a.createElement(N.a,{primary:"Advanced Algorithms"}),o?r.a.createElement(T.a,null):r.a.createElement(P.a,null)),l("Advanced-Algorithms",[{path:"Max-Heap-Insert",title:"Max Heap Insert"},{path:"Max-Heapify",title:"Max Heapify"},{path:"Heap-Sort",title:"Heap Sort"},{path:"Binomial-Heaps",title:"Binomial Heaps"}]),r.a.createElement(H.a,{button:!0,onClick:c("Advanced-OperatingSystem")},r.a.createElement(N.a,{primary:"Advanced Operating System"}),o?r.a.createElement(T.a,null):r.a.createElement(P.a,null)),l("Advanced-OperatingSystem",[{path:"os1",title:"os1"}]),r.a.createElement(H.a,{button:!0,onClick:c("Advanced-Compiler")},r.a.createElement(N.a,{primary:"Advanced Compiler"}),o?r.a.createElement(T.a,null):r.a.createElement(P.a,null)),l("Advanced-Compiler",[{path:"compiler1",title:"compiler1"}])))}var z=n(122),D=n(123),F=n(124),G=n(125),J=n(65),V=n.n(J),Y=Object(C.a)((function(t){return{root:{flexGrow:1},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1}}})),_=function(t){var e=Y();return r.a.createElement(z.a,{position:"static"},r.a.createElement(D.a,null,r.a.createElement(F.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",onClick:t.onClick},r.a.createElement(V.a,null)),r.a.createElement(O.a,{variant:"h6",className:e.title},"Berneti Projects"),r.a.createElement(G.a,{commponent:b.b,target:"_blank",href:"https://github.com/mberneti/sandbox",color:"inherit"},"Open On Github")))},q=n(128),$=n(92);function K(t){this.name=t,this.children=Array(2).fill(null)}function Q(){this.root=null,this.lastNode=null,this.index=0}Q.prototype.getArrayTree=function(t,e){e||0===e||(e=0);var n={name:t[e]+""};return e+1>=t.length?n:(n||(n={name:t[e]+""}),n.children=[this.getArrayTree(t,e+1)],n)},Q.prototype.getArrayHierarchy=function(t){return this.getArrayTree(t)},Q.prototype.getRoot=function(t,e,n){return this.insertLevelOrder(t,e,n)},Q.prototype.insertLevelOrder=function(t,e,n){n<t.length&&((e=new K(t[n])).children[0]=this.insertLevelOrder(t,e.left,2*n+1),e.children[1]=this.insertLevelOrder(t,e.right,2*n+2));return e&&e.children&&(e.children[0]||e.children[1]?e.children[0]?e.children[1]||e.children.splice(1,1):e.children.splice(0,1):delete e.children),e};var U=Q,X=new U;function Z(){this.content=[],this.initContent=[],this.history=[],this.sortedArray=[]}Z.prototype={push:function(t){this.content.push(t),this.initContent.push(t),this.log("insert "+this.content.length)},arr:function(t){return this.content[t]},swap:function(t,e){this.log("swap",[t,e]);var n=[this.content[e],this.content[t]];this.content[t]=n[0],this.content[e]=n[1]},heapSort:function(){for(var t=this.content.length,e=Math.floor(t/2-1),n=t-1;e>=0;)this.log("First MaxHeap "+e),this.maxHeap(e,t),e--;for(;n>=0;){var a=this.content.length;this.swap(0,n),this.log("remove "+n);var r=this.content.splice(n,1);this.sortedArray.push(r),this.log("Second MaxHeap 0"),this.maxHeap(0,a),n--}},log:function(t,e){this.history.push({label:t,root:X.getRoot(this.content,{},0),logNode:e,output:this.sortedArray.length>0&&X.getArrayHierarchy(this.sortedArray)})},maxHeap:function(t,e){this.log("MaxHeap (".concat(t,")"));var n=t,a=2*t+1,r=a+1,o=a<e,i=r<e;o&&this.log("compare",[a,n]),o&&this.arr(a)>this.arr(n)&&(n=a),i&&this.log("compare",[r,n]),i&&this.arr(r)>this.arr(n)&&(n=r),n!==t&&(this.swap(t,n),this.maxHeap(n,e))},getTree:function(){return this.heapSort(),{root:X.getRoot(this.content,{},0),initRoot:X.getRoot(this.initContent,{},0),history:this.history}}};var tt=Z,et=n(126),nt=n(137),at=n(135),rt=n(127),ot=n(70),it="#03c0dc",ct="#26deb0",lt="#ffffff",st="#4a4e4d",ut="#fe8a71",ht="#f6cd61";function mt(t){var e=t.node,n=t.isSwapNode,a=t.isCompareNode,o=0===e.depth,i=!!e.children,c=null;return!0===n?c=ut:!0===a&&(c=ht),o?r.a.createElement(dt,{statusColor:c,node:e}):i?r.a.createElement(pt,{statusColor:c,node:e}):r.a.createElement(et.a,{top:e.y,left:e.x},r.a.createElement("circle",{r:30,fill:st,stroke:c||ct,strokeWidth:1,strokeDasharray:"2,2",strokeOpacity:.6,rx:10,onClick:function(){alert("clicked: ".concat(JSON.stringify(e.data.name)))}}),r.a.createElement("text",{dy:".33em",fontSize:24,fontFamily:"Open Sans",textAnchor:"middle",fill:ct,style:{pointerEvents:"none"}},e.data.name))}function dt(t){var e=t.node,n=t.statusColor;return r.a.createElement(et.a,{top:e.y,left:e.x,onClick:function(){alert("clicked: ".concat(JSON.stringify(e.data.name)))}},r.a.createElement("circle",{r:30,fill:st,stroke:n||lt}),r.a.createElement("text",{dy:".33em",fontSize:24,fontWeight:500,fontFamily:"Open Sans",textAnchor:"middle",style:{pointerEvents:"none"},fill:lt},e.data.name))}function pt(t){var e=t.node,n=t.statusColor;return r.a.createElement(et.a,{top:e.y,left:e.x},r.a.createElement("circle",{r:30,fill:st,stroke:n||it,strokeWidth:1,onClick:function(){alert("clicked: ".concat(JSON.stringify(e.data.name)))}}),r.a.createElement("text",{dy:".33em",fontSize:24,fontFamily:"Open Sans",textAnchor:"middle",style:{pointerEvents:"none"},fill:lt},e.data.name))}var ft=function(t){var e=t.width||600,n=t.width||500,a={top:t.mt||40,left:t.ml||16,right:t.mr||16,bottom:t.mb||40},o=n-a.top-a.bottom,i=e-a.left-a.right,c=t.root||[],l=Object(ot.b)(c),s=t.logLabel,u=t.logNodes,h=function(t,e){return s===t&&u.includes(e)};return r.a.createElement("svg",{width:e,height:n},r.a.createElement(rt.a,{id:"lg",from:"#fd9b93",to:"#fe6e9e"}),r.a.createElement("rect",{width:e,height:n,rx:14,fill:st}),r.a.createElement(et.a,{top:30,left:30},r.a.createElement("text",{dy:".33em",fontSize:18,fontFamily:"Open Sans",textAnchor:"left",style:{pointerEvents:"none"},fill:lt},s)),r.a.createElement(nt.a,{root:l,size:[i,o]},(function(t){return r.a.createElement(et.a,{top:a.top,left:a.left},t.links().map((function(t,e){return r.a.createElement(at.a,{key:"link-".concat(e),data:t,stroke:"#3da4ab",strokeWidth:"1",fill:"none"})})),t.descendants().filter((function(t){return t.data.name||0===t.data.name})).map((function(t,e){return r.a.createElement(mt,{key:"node-".concat(e),node:t,isSwapNode:h("swap",e),isCompareNode:h("compare",e)})})))})))},yt=function(t){return Math.floor(Math.random()*Math.floor(t))},gt=function(t,e){for(var n=[],a=0;a<t;a++)n.push(yt(e));return n.sort((function(){return Math.random()-.5}))},Et=function(){var t=r.a.useState(),e=Object(v.a)(t,2),n=e[0],o=e[1],i=r.a.useState(0),c=Object(v.a)(i,2),s=c[0],u=c[1];Object(a.useEffect)((function(){document.addEventListener("keydown",h(n))}),[n]),Object(a.useEffect)((function(){!function(){var t=new tt,e=gt(10,100);e.forEach((function(e){t.push(e)}));var n=t.getTree();o({nodes:e,root:n.root,initRoot:n.initRoot,history:[{label:"init",root:n.initRoot}].concat(Object(l.a)(n.history))})}()}),[]);var h=function(t){return function(e){t&&(39===e.keyCode?u((function(e){return e+1>=t.history.length?e:e+1})):37===e.keyCode&&u((function(t){return t-1<0?t:t-1})))}};return r.a.createElement(q.a,{container:!0,alignItems:"center",justify:"space-around"},r.a.createElement(q.a,{item:!0,xs:6},r.a.createElement(O.a,{variant:"h3",display:"inline"},s)),r.a.createElement(q.a,{item:!0,xs:6},r.a.createElement($.a,null,r.a.createElement(w.a,{padding:1},"You can use your keyboard's (\u2190 or \u2192) right and left arrow key to go forward or backward."))),r.a.createElement(q.a,{item:!0,xs:6},n&&n.history.filter((function(t,e){return e===s})).map((function(t){return r.a.createElement(ft,{logLabel:t.label,logNodes:t.logNode,root:t.root})}))),r.a.createElement(q.a,{item:!0,xs:6},n&&n.history.filter((function(t,e){return e===s})).map((function(t){return r.a.createElement(ft,{logLabel:"Output",root:t.output})}))),r.a.createElement(q.a,{item:!0,xs:12},r.a.createElement(w.a,{textAlign:"center"},r.a.createElement(O.a,{variant:"h5",display:"inline"},"["),n&&n.nodes.map((function(t){return r.a.createElement(w.a,{display:"inline",p:1},r.a.createElement(O.a,{variant:"h5",display:"inline"},t))})),r.a.createElement(O.a,{variant:"h5",display:"inline"},"]"))))},vt=function(){return r.a.createElement(Et,null)},bt=new U;function xt(){this.content=[],this.initContent=[],this.history=[],this.sortedArray=[]}xt.prototype={push:function(t){this.log("insert "+this.content.length),this.maxHeapInsert(t),this.initContent.push(t)},arr:function(t){return this.content[t]},swap:function(t,e){this.log("swap",[t,e]);var n=[this.content[e],this.content[t]];this.content[t]=n[0],this.content[e]=n[1]},log:function(t,e){this.history.push({label:t,root:bt.getRoot(this.content,{},0),logNode:e,output:this.sortedArray.length>0&&bt.getArrayHierarchy(this.sortedArray)})},getParentValue:function(t){var e=this.getParentIndex(t);return this.content[e]},getParentIndex:function(t){return Math.ceil(t/2)-1},maxHeapInsert:function(t){var e=this;this.content.push("N"+t),this.log("Added Empty Node");for(var n,a=this.content.length-1;a>0&&(n=a,e.log("compare",[n,e.getParentIndex(n)]),t>e.getParentValue(n));)this.log("swap",[a,this.getParentIndex(a)]),this.content[a]=this.getParentValue(a),a=this.getParentIndex(a),this.content[a]="N"+t;this.content[a]=t},getTree:function(){var t=bt.getRoot(this.content,{},0),e=bt.getRoot(this.initContent,{},0);return this.log("done"),{root:t,initRoot:e,history:this.history}}};var kt=xt,Ot=function(){var t=r.a.useState(),e=Object(v.a)(t,2),n=e[0],o=e[1],i=r.a.useState(0),c=Object(v.a)(i,2),s=c[0],u=c[1];Object(a.useEffect)((function(){document.addEventListener("keydown",h(n))}),[n]),Object(a.useEffect)((function(){!function(){var t=new kt,e=gt(10,100);e.forEach((function(e){t.push(e)}));var n=t.getTree();o({nodes:e,root:n.root,initRoot:n.initRoot,history:[{label:"init",root:n.initRoot}].concat(Object(l.a)(n.history))})}()}),[]);var h=function(t){return function(e){t&&(39===e.keyCode?u((function(e){return e+1>=t.history.length?e:e+1})):37===e.keyCode&&u((function(t){return t-1<0?t:t-1})))}};return r.a.createElement(q.a,{container:!0,alignItems:"center",justify:"space-around"},r.a.createElement(q.a,{item:!0,xs:2,justify:"center"},r.a.createElement(O.a,{variant:"h3",display:"inline"},s)),r.a.createElement(q.a,{item:!0,xs:6},r.a.createElement($.a,null,r.a.createElement(w.a,{padding:1},"You can use your keyboard's (\u2190 or \u2192) right and left arrow key to go forward or backward."))),r.a.createElement(q.a,{item:!0,xs:6},n&&n.history.filter((function(t,e){return e===s})).map((function(t){return r.a.createElement(ft,{logLabel:t.label,logNodes:t.logNode,root:t.root})}))),r.a.createElement(q.a,{item:!0,xs:12},r.a.createElement(w.a,{textAlign:"center"},r.a.createElement(O.a,{variant:"h5",display:"inline"},"["),n&&n.nodes.map((function(t){return r.a.createElement(w.a,{display:"inline",p:1},r.a.createElement(O.a,{variant:"h5",display:"inline"},t))})),r.a.createElement(O.a,{variant:"h5",display:"inline"},"]"))))},wt=new U;function At(){this.content=[],this.initContent=[],this.history=[],this.sortedArray=[]}At.prototype={push:function(t){this.content.push(t),this.initContent.push(t),this.log("insert "+this.content.length)},arr:function(t){return this.content[t]},swap:function(t,e){this.log("swap",[t,e]);var n=[this.content[e],this.content[t]];this.content[t]=n[0],this.content[e]=n[1]},heapSort:function(){for(var t=this.content.length,e=Math.floor(t/2-1);e>=0;)this.maxHeapify(e,t),e--},log:function(t,e){this.history.push({label:t,root:wt.getRoot(this.content,{},0),logNode:e,output:this.sortedArray.length>0&&wt.getArrayHierarchy(this.sortedArray)})},maxHeapify:function(t,e){this.log("MaxHeap (".concat(t,")"));var n=t,a=2*t+1,r=a+1,o=a<e,i=r<e;o&&this.log("compare",[a,n]),o&&this.arr(a)>this.arr(n)&&(n=a),i&&this.log("compare",[r,n]),i&&this.arr(r)>this.arr(n)&&(n=r),n!==t&&(this.swap(t,n),this.maxHeapify(n,e))},getTree:function(){this.heapSort();var t=wt.getRoot(this.content,{},0),e=wt.getRoot(this.initContent,{},0);return this.log("done"),{root:t,initRoot:e,history:this.history}}};var Ct=At,jt=function(){var t=r.a.useState(),e=Object(v.a)(t,2),n=e[0],o=e[1],i=r.a.useState(0),c=Object(v.a)(i,2),s=c[0],u=c[1];Object(a.useEffect)((function(){document.addEventListener("keydown",h(n))}),[n]),Object(a.useEffect)((function(){!function(){var t=new Ct,e=gt(10,100);e.forEach((function(e){t.push(e)}));var n=t.getTree();o({nodes:e,root:n.root,initRoot:n.initRoot,history:[{label:"init",root:n.initRoot}].concat(Object(l.a)(n.history))})}()}),[]);var h=function(t){return function(e){t&&(39===e.keyCode?u((function(e){return e+1>=t.history.length?e:e+1})):37===e.keyCode&&u((function(t){return t-1<0?t:t-1})))}};return r.a.createElement(q.a,{container:!0,alignItems:"center",justify:"space-around"},r.a.createElement(q.a,{item:!0,xs:2,justify:"center"},r.a.createElement(O.a,{variant:"h3",display:"inline"},s)),r.a.createElement(q.a,{item:!0,xs:6},r.a.createElement($.a,null,r.a.createElement(w.a,{padding:1},"You can use your keyboard's (\u2190 or \u2192) right and left arrow key to go forward or backward."))),r.a.createElement(q.a,{item:!0,xs:6},n&&n.history.filter((function(t,e){return e===s})).map((function(t){return r.a.createElement(ft,{logLabel:t.label,logNodes:t.logNode,root:t.root})}))),r.a.createElement(q.a,{item:!0,xs:12},r.a.createElement(w.a,{textAlign:"center"},r.a.createElement(O.a,{variant:"h5",display:"inline"},"["),n&&n.nodes.map((function(t){return r.a.createElement(w.a,{display:"inline",p:1},r.a.createElement(O.a,{variant:"h5",display:"inline"},t))})),r.a.createElement(O.a,{variant:"h5",display:"inline"},"]"))))};function St(){var t=r.a.useState(!1),e=Object(v.a)(t,2),n=e[0],a=e[1],o=function(t){return function(e){("keydown"!==e.type||"Tab"!==e.key&&"Shift"!==e.key)&&a(t)}};return r.a.createElement(b.a,{basename:"/"},r.a.createElement(B,{drawer:n,onClose:o(!1)}),r.a.createElement(_,{onClick:o(!0)}),r.a.createElement(w.a,{pt:2,pl:2},r.a.createElement(x.a,{path:"*",component:function(t){var e=t.match.url.substring(1).replace(/-/g," ").split("/");return r.a.createElement(k.a,{"aria-label":"breadcrumb"},e.map((function(t){return r.a.createElement(O.a,{key:t,variant:6},t)})))}})),r.a.createElement(A.a,null,r.a.createElement(w.a,{pt:1},r.a.createElement(x.c,null,r.a.createElement(x.a,{path:"/Advanced-Algorithms/Max-Heap-Insert"},r.a.createElement(Ot,null)),r.a.createElement(x.a,{path:"/Advanced-Algorithms/Max-Heapify"},r.a.createElement(jt,null)),r.a.createElement(x.a,{path:"/Advanced-Algorithms/Heap-Sort"},r.a.createElement(Et,null)),r.a.createElement(x.a,{path:"/"},r.a.createElement(vt,null))))))}var Ht=n(69),Nt=Object(Ht.a)({palette:{type:"dark"}}),Rt=Object(E.b)({plugins:Object(l.a)(Object(f.a)().plugins)}),Mt=function(t){return r.a.createElement(p.a,{theme:Nt},r.a.createElement(y.b,{jss:Rt},r.a.createElement(g.a,null),r.a.createElement(St,null)))};d.a.render(r.a.createElement(o.a,{store:h},r.a.createElement(Mt,null)),document.querySelector("#root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[80,1,2]]]);
//# sourceMappingURL=main.b83db5a4.chunk.js.map