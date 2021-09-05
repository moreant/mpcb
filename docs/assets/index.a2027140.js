var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,r=(t,n,l)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[n]=l,o=(e,t)=>{for(var n in t||(t={}))s.call(t,n)&&r(e,n,t[n]);if(l)for(var n of l(t))a.call(t,n)&&r(e,n,t[n]);return e},i=(e,l)=>t(e,n(l));import{o as d,c as u,a as c,b as m,d as g,e as p,t as f,r as v,f as w,g as h,h as b,i as y,j as k,u as x,w as j,k as I,n as L,l as N,v as C,D,m as E,p as H,T as M,q as B,s as O,x as P,y as A,F as _,z as S,A as T,M as F,B as V}from"./vendor.85d489de.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const z={},q={xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-45",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},R=[c("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"},null,-1)];z.render=function(e,t){return d(),u("svg",q,R)};const U={class:"\n      flex flex-col\n      justify-end\n      h-72\n      bg-primary\n      p-12\n      rounded-box\n      shadow\n      text-white\n    "},$=c("div",{class:"text-6xl pb-4 font-bold"},"Hi, 欢迎使用 MPCB！",-1),K={class:"flex flex-row w-full justify-between"},G=c("div",{class:"text-3xl"},"简洁高效的批量下载魅族云相册中的图片。",-1),J={href:"https://github.com/moreant/mpcb",target:"_blank",class:"btn-link text-3xl text-white"},Q=g("使用文档 "),W={setup:e=>(e,t)=>(d(),u("div",U,[$,c("div",K,[G,c("a",J,[Q,m(z,{class:"h-6 inline"})])])]))};let X=p.create({baseURL:"http://rap2api.taobao.org/app/mock/290088",timeout:1e4});X.interceptors.response.use((e=>{const t=e.data;return 200!==t.code?Promise.reject(new Error(t.message||"错误")):t}),(e=>(console.log("err"+e),Promise.reject(e))));const Y=(e,t,n,l)=>X.get("/down_img.json",{params:{token:e,dir:t,url:n,fileName:l}}),Z={class:"mt-12"},ee={class:"card shadow w-full flex-row"},te={class:"card-body w-1/2"},ne={class:"card-title"},le=c("div",{class:"divider divider-vertical opacity-10 p-8"},null,-1),se={class:"card-body w-1/2"},ae={props:{step:String,title:String},setup:e=>(t,n)=>(d(),u("div",Z,[c("div",ee,[c("div",te,[c("h2",ne,"第 "+f(e.step)+" 步",1),c("p",null,f(e.title),1),v(t.$slots,"left")]),le,c("div",se,[v(t.$slots,"right")])])]))},re={class:"flex space-x-2"},oe={href:"http://topurl.cn/809",target:"_blank",class:"btn btn-link p-0"},ie=g("获取 Token ? "),de={class:"card-title"},ue=g(" 运行结果 "),ce={emits:["change"],setup(e,{emit:t}){const n=w(h.get("token")),l=b({time:"",msg:"",flag:0}),s=async()=>{try{await(e=>X.get("/token.json",{params:{token:e}}))(n.value),t("change",n.value),l.msg="校验 Token 成功.",h.set("token",n.value),l.flag=1}catch(e){let n=e.message;"用户信息验证失败"===n&&(n+=", 请重新获取 Token."),t("change",""),l.msg=n,l.flag=-1}l.time=I().format("HH:mm:ss")};return n.value&&s(),(e,t)=>(d(),y(ae,{step:"1",title:"输入 Token 获取用户信息。",flag:x(l).flag},k({left:j((()=>[c("div",re,[N(c("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>n.value=e),type:"text",placeholder:"token",class:"w-full input input-primary input-bordered"},null,512),[[C,n.value]]),c("button",{onClick:s,class:"btn btn-primary"},"提交")]),c("div",null,[c("a",oe,[ie,m(z)])])])),_:2},[0!==x(l).flag?{name:"right",fn:j((()=>[c("h2",de,[ue,c("div",{class:L(["badge badge-lg",{"badge-success":1===x(l).flag,"badge-error":-1===x(l).flag}])},f(1===x(l).flag?"成功":"失败"),3)]),c("p",null,f(x(l).time),1),c("p",null,f(x(l).msg),1)]))}:void 0]),1032,["flag"]))}};class me extends D{constructor(){super("database"),this.version(1).stores({imgs:"id,dirId,[dirId+download],fileName,[dirId+url]",errorLog:"key++,dirId,time,msg"}),this.imgs=this.table("imgs"),this.errorLog=this.table("errorLog")}bulkImg(e){return this.imgs.bulkAdd(e)}updateDownload(e,t){return this.imgs.update(e,{download:t})}getImgsDownNum(e,t){return this.imgs.where({dirId:e,download:t}).count()}getImgs(e){return this.imgs.where(e).toArray()}addErrorlog(e){return this.errorLog.add(e)}getAllErrorLog(){return this.errorLog.reverse().sortBy("keys")}deleteAllErrorLog(){return this.errorLog.clear()}}const ge={class:"\n            flex\n            items-end\n            justify-center\n            min-h-screen\n            pt-4\n            px-4\n            pb-20\n            text-center\n            sm:block\n            sm:p-0\n          "},pe=c("span",{class:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​",-1),fe={class:"\n                inline-block\n                align-bottom\n                bg-white\n                rounded-lg\n                text-left\n                overflow-hidden\n                shadow-xl\n                transform\n                transition-all\n                sm:my-8\n                sm:align-middle\n                sm:max-w-lg\n                sm:w-full\n              "},ve={class:"bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"},we={class:"sm:flex sm:items-start"},he=c("div",{class:"\n                      mx-auto\n                      flex-shrink-0 flex\n                      items-center\n                      justify-center\n                      h-12\n                      w-12\n                      rounded-full\n                      bg-red-100\n                      sm:mx-0\n                      sm:h-10\n                      sm:w-10\n                    "},null,-1),be={class:"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"},ye=g(" 删除\b下载记录 "),ke=c("div",{class:"mt-2"},[c("p",{class:"text-sm text-gray-500"}," 将删除该相册的所有下载记录，本操作不会删除文件。 ")],-1),xe={class:"bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"},je={props:{open:{type:Boolean,default:!0}},emits:["close","ok"],setup(e,{emit:t}){const n=e;E((()=>{n.open&&(open.value=n.open)}));const l=()=>{t("close")},s=()=>{t("ok")};return(e,t)=>(d(),u("div",null,[m(x(A),{as:"template",show:n.open},{default:j((()=>[m(x(H),{as:"div",class:"fixed z-10 inset-0 overflow-y-auto",onClose:l},{default:j((()=>[c("div",ge,[m(x(M),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0","enter-to":"opacity-100",leave:"ease-in duration-200","leave-from":"opacity-100","leave-to":"opacity-0"},{default:j((()=>[m(x(B),{class:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})])),_:1}),O(" This element is to trick the browser into centering the modal contents. "),pe,m(x(M),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to":"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200","leave-from":"opacity-100 translate-y-0 sm:scale-100","leave-to":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:j((()=>[c("div",fe,[c("div",ve,[c("div",we,[he,c("div",be,[m(x(P),{as:"h3",class:"text-lg leading-6 text-gray-900"},{default:j((()=>[ye])),_:1}),ke])])]),c("div",xe,[c("button",{type:"button",class:"\n                    w-full\n                    inline-flex\n                    justify-center\n                    rounded-md\n                    border border-transparent\n                    shadow-sm\n                    px-4\n                    py-2\n                    bg-red-600\n                    text-base\n                    font-medium\n                    text-white\n                    hover:bg-red-700\n                    focus:outline-none\n                    focus:ring-2 focus:ring-offset-2 focus:ring-red-500\n                    sm:ml-3\n                    sm:w-auto\n                    sm:text-sm\n                  ",onClick:s}," 确定 "),c("button",{type:"button",class:"\n                    mt-3\n                    w-full\n                    inline-flex\n                    justify-center\n                    rounded-md\n                    border border-gray-300\n                    shadow-sm\n                    px-4\n                    py-2\n                    bg-white\n                    text-base\n                    font-medium\n                    text-gray-700\n                    hover:bg-gray-50\n                    focus:outline-none\n                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500\n                    sm:mt-0\n                    sm:ml-3\n                    sm:w-auto\n                    sm:text-sm\n                  ",onClick:l,ref:cancelButtonRef}," 取消 ",512)])])])),_:1})])])),_:1})])),_:1},8,["show"])]))}};const Ie={id:"selectList",class:"menu my-3 bg-base-100 rounded-box border border-gray-300"},Le=["onClick"],Ne={class:"w-full flex justify-between"},Ce={class:"flex"},De={class:"avatar"},Ee={class:"rounded-btn w-20 h-20"},He=["src"],Me={class:"flex flex-col ml-4"},Be={class:"text-sm mt-1.5 text-gray-400"},Oe=["value","max"],Pe=c("h2",{class:"card-title",id:"downloadList"},"下载列表",-1),Ae=c("div",null,"性能原因，下载列表至多显示500条（有空再弄虚拟列表）。",-1),_e=["disabled"],Se={xmlns:"http://www.w3.org/2000/svg",class:"inline-block w-6 h-6 mr-2 stroke-current",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},Te=[c("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"},null,-1)],Fe=g(" 下载 "),Ve=[c("svg",{xmlns:"http://www.w3.org/2000/svg",class:"inline-block w-6 h-6 mr-2 stroke-current",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[c("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1),g(" 删除记录 ")],ze={class:"overflow-auto"},qe={class:"table w-full"},Re=c("thead",null,[c("tr",null,[c("th",null,"id"),c("th",null,"下载状态"),c("th",null,"图片名称")])],-1),Ue={props:{token:String},emits:["error"],setup(e,{emit:t}){const n=e,l=w(!1),s=w(!1),a=w([]),r=w(""),p=w([]),v=new me,h=e=>p.value.find((t=>t.id===e));E((async()=>{if(n.token){const t=await(e=n.token,X.get("/dir.json",{params:{token:e}}));let{dir:l=[]}=t.value;const s=l.map((e=>v.getImgsDownNum(e.id,"1"))),a=await Promise.all(s);l=l.map(((e,t)=>i(o({},e),{downNum:a[t]}))),p.value=l,l.map((e=>e.icon)).join(","),b(l)}var e}));const b=async(e,t)=>{p.value=e.map(((e,t)=>i(o({},e),{iconSrc:e.icon})))},C=async()=>{const e=r.value,t=await v.getImgs({dirId:e});await Promise.all(t.map((e=>v.updateDownload(e.id,"0")))),D(e),h(e).downNum=0,s.value=!1},D=async e=>{r.value=e;let t=await v.getImgs({dirId:e});if(0===t.length){const{value:{file:l}}=await((e,t)=>X.get("/list.json",{params:{token:e,dirId:t}}))(n.token,e);{const t=h(e);l.length=t.fileNum}t=l.map((t=>({id:t.id,fileName:t.fileName,url:t.url,download:"0",dirId:e}))),await v.bulkImg(t)}t.length>500&&(t.length=500),a.value=t,document.getElementById("downloadList").parentNode.style.maxHeight=document.getElementById("selectList").parentNode.offsetHeight+"px"};return(e,o)=>(d(),u(_,null,[m(je,{open:s.value,onClose:o[0]||(o[0]=e=>s.value=!1),onOk:C},null,8,["open"]),p.value.length>0?(d(),y(ae,{key:0,step:"2",title:"选择要下载的相册。"},k({left:j((()=>[c("ul",Ie,[(d(!0),u(_,null,T(p.value,((e,t)=>(d(),u("li",{class:L(["",{bordered:e.id===r.value,"bg-base-content":e.id===r.value,"bg-opacity-10":e.id===r.value}])},[c("a",{onClick:t=>D(e.id)},[c("div",Ne,[c("div",Ce,[c("div",De,[c("div",Ee,[N(c("img",{src:e.iconSrc},null,8,He),[[S,e.iconSrc]])])]),c("div",Me,[g(f(e.dirName)+" ",1),c("div",Be,f(e.fileNum)+" 张 ",1)])]),c("div",null,[c("progress",{class:"w-24 progress progress-primary",value:e.downNum,max:e.fileNum},null,8,Oe)])])],8,Le)],2)))),256))])])),_:2},[r.value?{name:"right",fn:j((()=>[Pe,c("div",null,"相册ID: "+f(r.value),1),Ae,c("div",null,[c("button",{class:L(["btn btn-primary",{loading:l.value}]),disabled:l.value,onClick:o[1]||(o[1]=e=>(async e=>{let s=await v.getImgs({dirId:e,download:"0"});l.value=!0;for(let l=0;l<s.length;l++){const o=s[l];try{await Y(n.token,e,o.url,o.fileName),await v.updateDownload(o.id,"1");try{a.value.find((e=>e.id===o.id)).download="1"}catch(r){console.log(r)}const t=h(e);t.downNum=++t.downNum}catch(r){v.addErrorlog({dirId:e,time:I().format("M-D HH:mm:ss"),msg:r.message}),t("error")}}l.value=!1})(r.value))},[N((d(),u("svg",Se,Te,512)),[[S,!l.value]]),Fe],10,_e),c("button",{class:"btn btn-error ml-4",onClick:o[2]||(o[2]=e=>s.value=!0)},Ve)]),c("div",ze,[c("table",qe,[Re,c("tbody",null,[(d(!0),u(_,null,T(a.value,(e=>(d(),u("tr",{key:e.id},[c("td",null,f(e.id),1),c("td",null,[c("div",{class:L(["transition-all duration-500 ease-in-out badge",{"badge-success":e.download===x("1"),"badge-info":e.download===x("0")}])},f(e.download===x("1")?"已下载":"待下载"),3)]),c("td",null,f(e.fileName),1)])))),128))])])])]))}:void 0]),1024)):O("v-if",!0)],64))}},$e={class:"mt-12"},Ke={class:"card shadow w-full flex-row"},Ge={class:"card-body w-1/2"},Je=g(" 错误日志 "),Qe=[c("svg",{xmlns:"http://www.w3.org/2000/svg",class:"inline-block w-3 h-3 mr-2 stroke-current",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[c("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})],-1),g(" 删除所有日志 ")],We={class:"overflow-x-auto"},Xe={class:"table w-full"},Ye=c("thead",null,[c("tr",null,[c("th",null,"#"),c("th",null,"DirId"),c("th",null,"发生时间"),c("th",null,"错误信息")])],-1),Ze={props:{changeFleg:Number},setup(e){const t=e,n=new me,l=w([]);E((async()=>{t.changeFleg&&(l.value=await n.getAllErrorLog());{const e=F.mock({"errList|3-8":[{key:"@natural(1, 100)",dirId:"@natural(1, 100)",time:'@time("M-d HH:mm:ss")',msg:'错误信息 @cword("零一二三四五六七八九十", 5, 7)'}]});l.value=e.errList}}));const s=()=>{n.deleteAllErrorLog(),l.value=[]};return(e,t)=>(d(),u("div",$e,[c("div",Ke,[c("div",Ge,[c("h2",{class:"card-title"},[Je,c("button",{class:"btn btn-error btn-xs ml-4",onClick:s},Qe)]),c("div",We,[c("table",Xe,[Ye,c("tbody",null,[(d(!0),u(_,null,T(l.value,(e=>(d(),u("tr",{key:e.key},[c("th",null,f(e.key),1),c("td",null,f(e.dirId),1),c("td",null,f(e.time),1),c("td",null,f(e.msg),1)])))),128))])])])])])]))}},et={class:"flex justify-center"},tt={class:"container p-4 lg:py-24 lg:pt-12"};V({setup(e){const t=w(""),n=w(Date.now());return(e,l)=>(d(),u("div",et,[c("div",tt,[m(W),m(ce,{onChange:l[0]||(l[0]=e=>{t.value=e})}),m(Ue,{token:t.value,onError:l[1]||(l[1]=e=>n.value=Date.now())},null,8,["token"]),m(Ze,{changeFleg:n.value},null,8,["changeFleg"])])]))}}).mount("#app");