import{u as L}from"./list-f86f33d9.js";import{u as W}from"./settings-a188cca4.js";import{g as B,o as D,a as E,n as F,u as _,b as U,r as C,w as q,c as k,s as A,d as z,e as H,f as T,V as R,h as g,i as I,j as P,t as V,k as O}from"./index-bf6d4762.js";import{V as $}from"./VRow-cf3883fe.js";function x(e){return B()?(D(e),!0):!1}function b(){const e=new Set,t=o=>{e.delete(o)};return{on:o=>{e.add(o);const i=()=>t(o);return x(i),{off:i}},off:t,trigger:(...o)=>Promise.all(Array.from(e).map(i=>i(...o)))}}function G(e){return typeof e=="function"?e():_(e)}const J=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const K=Object.prototype.toString,Q=e=>K.call(e)==="[object Object]",X=()=>{};function Y(e){return e||U()}function Z(e,t=!0,n){const s=Y(n);s?E(e,s):t?e():F(e)}function ee(e){var t;const n=G(e);return(t=n==null?void 0:n.$el)!=null?t:n}const M=J?window:void 0;function te(...e){let t,n,s,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,s,o]=e,t=M):[t,n,s,o]=e,!t)return X;Array.isArray(n)||(n=[n]),Array.isArray(s)||(s=[s]);const i=[],a=()=>{i.forEach(u=>u()),i.length=0},v=(u,r,l,c)=>(u.addEventListener(r,l,c),()=>u.removeEventListener(r,l,c)),h=q(()=>[ee(t),G(o)],([u,r])=>{if(a(),!u)return;const l=Q(r)?{...r}:r;i.push(...n.flatMap(c=>s.map(m=>v(u,c,m,l))))},{immediate:!0,flush:"post"}),p=()=>{h(),a()};return x(p),p}function ne(){const e=C(!1);return U()&&E(()=>{e.value=!0}),e}function oe(e){const t=ne();return k(()=>(t.value,!!e()))}function se(e={}){const{window:t=M,requestPermissions:n=!0}=e,s=e,o=oe(()=>!!t&&"Notification"in t),i=C(o.value&&"permission"in Notification&&Notification.permission==="granted"),a=C(null),v=async()=>{if(o.value)return!i.value&&Notification.permission!=="denied"&&await Notification.requestPermission()==="granted"&&(i.value=!0),i.value},{on:h,trigger:p}=b(),{on:u,trigger:r}=b(),{on:l,trigger:c}=b(),{on:m,trigger:N}=b(),y=async d=>{if(!o.value||!i.value)return;const f=Object.assign({},s,d);return a.value=new Notification(f.title||"",f),a.value.onclick=p,a.value.onshow=r,a.value.onerror=c,a.value.onclose=N,a.value},S=()=>{a.value&&a.value.close(),a.value=null};if(n&&Z(v),x(S),o.value&&t){const d=t.document;te(d,"visibilitychange",f=>{f.preventDefault(),d.visibilityState==="visible"&&S()})}return{isSupported:o,notification:a,ensurePermissions:v,permissionGranted:i,show:y,close:S,onClick:h,onShow:u,onError:l,onClose:m}}const ue={__name:"HomeView",setup(e){const t=L(),{currentItem:n,items:s,timeleft:o}=A(t),{setCurrentItem:i,countdown:a,setFinishedItem:v}=t,h=W(),{selectedAlarmFile:p,notify:u}=A(h),r={STOP:0,COUNTING:1,PAUSE:2},l=C(r.STOP);let c=0;const m=()=>{l.value===r.STOP&&s.value.length>0&&i(),l.value=r.COUNTING,c=setInterval(()=>{a(),o.value===0&&y()},1e3)},N=()=>{l.value=r.PAUSE,clearInterval(c)},y=()=>{clearInterval(c),l.value=r.STOP;const f=new Audio;if(f.src=p.value,f.play(),u.value){const{show:w,isSupported:j}=se({title:"事項完成",body:n.value,icon:new URL("@/assets/tomato.png",self.location).href});j.value&&w()}v(),s.value.length>0&&m()},S=k(()=>n.value.length>0?n.value:s.value.length>0?"點擊開始":"沒有事項"),d=k(()=>{const f=Math.floor(o.value/60).toString().padStart(2,"0"),w=(o.value%60).toString().padStart(2,"0");return f+":"+w});return(f,w)=>(z(),H(R,null,{default:T(()=>[g($,null,{default:T(()=>[g(I,{class:"text-center text",cols:"12"},{default:T(()=>[P("h1",null,V(S.value),1),P("h1",null,V(d.value),1)]),_:1}),g(I,{class:"text-center text",cols:"12"},{default:T(()=>[g(O,{size:"",variant:"text",icon:"mdi-play",disabled:l.value===r.COUNTING||_(n).length===0&&_(s).length===0,onClick:m},null,8,["disabled"]),g(O,{size:"",variant:"text",icon:"mdi-pause",disabled:l.value!==r.COUNTING,onClick:N},null,8,["disabled"]),g(O,{size:"",variant:"text",icon:"mdi-skip-next",disabled:_(n).length===0,onClick:y},null,8,["disabled"])]),_:1})]),_:1})]),_:1}))}};export{ue as default};
