var te=Object.defineProperty;var se=(u,p,g)=>p in u?te(u,p,{enumerable:!0,configurable:!0,writable:!0,value:g}):u[p]=g;var c=(u,p,g)=>se(u,typeof p!="symbol"?p+"":p,g);(function(){"use strict";const u={translate:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>',summarize:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>',explain:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',rewrite:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>',search:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',sendToAI:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7z"/></svg>',codeExplain:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',aiChat:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',summarizePage:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',switchTab:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',history:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>',screenshot:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',bookmark:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',newTab:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',settings:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',download:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',sparkles:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',messageCircle:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',fileText:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',x:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'};let p=null,g=null,T=!1;function M(){return g||H(),g}function H(){p=document.createElement("div"),p.id="thecircle-shadow-host",p.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    z-index: 2147483647;
    pointer-events: none;
  `,document.body.appendChild(p),g=p.attachShadow({mode:"open"});const h=document.createElement("div");h.id="thecircle-container",h.className="fixed top-0 left-0 w-screen h-screen pointer-events-none",g.appendChild(h)}function $(h){if(T||!g)return;const e=document.createElement("style");e.textContent=h,g.insertBefore(e,g.firstChild),T=!0}function b(h){const e=M(),t=e.getElementById("thecircle-container")||e;h.style.pointerEvents="auto",t.appendChild(h)}function m(h){h.parentNode&&h.parentNode.removeChild(h)}const w=new Map;function L(){return`${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function y(){for(const[h,e]of w){try{e.port.disconnect()}catch{}w.delete(h)}}async function B(h,e,t,s){return t.useStreaming&&!!s?q("AI_REQUEST",{action:"custom",text:h,systemPrompt:e,config:t},s):await chrome.runtime.sendMessage({type:"AI_REQUEST",payload:{action:"custom",text:h,systemPrompt:e,config:t}})}async function k(h,e,t,s){return t.useStreaming&&!!s?z(h,e,t,s):await chrome.runtime.sendMessage({type:"AI_VISION_REQUEST",payload:{imageDataUrl:h,prompt:e,config:t}})}async function D(h,e,t){return await chrome.runtime.sendMessage({type:"AI_IMAGE_GEN_REQUEST",payload:{prompt:h,config:e,screenshotConfig:t}})}async function q(h,e,t){return new Promise(s=>{const n=L(),i=chrome.runtime.connect({name:"ai-stream"});w.set(n,{port:i,requestId:n});const o=()=>{w.delete(n);try{i.onMessage.removeListener(r)}catch{}},r=a=>{var l;((l=a.payload)==null?void 0:l.requestId)===n&&(a.type==="AI_STREAM_CHUNK"?t(a.payload.chunk||"",a.payload.fullText||""):a.type==="AI_STREAM_END"?(o(),i.disconnect(),s({success:a.payload.success||!1,result:a.payload.result,error:a.payload.error,requestId:n})):a.type==="AI_STREAM_ERROR"&&(o(),i.disconnect(),s({success:!1,error:a.payload.error||"Unknown error",requestId:n})))};i.onDisconnect.addListener(()=>{o(),s({success:!1,error:"请求已取消",requestId:n})}),i.onMessage.addListener(r),i.postMessage({type:h,payload:{...e,requestId:n}})})}async function z(h,e,t,s){return new Promise(n=>{const i=L(),o=chrome.runtime.connect({name:"ai-stream"});w.set(i,{port:o,requestId:i});const r=()=>{w.delete(i);try{o.onMessage.removeListener(a)}catch{}},a=l=>{var d;((d=l.payload)==null?void 0:d.requestId)===i&&(l.type==="AI_STREAM_CHUNK"?s(l.payload.chunk||"",l.payload.fullText||""):l.type==="AI_STREAM_END"?(r(),o.disconnect(),n({success:l.payload.success||!1,result:l.payload.result,error:l.payload.error,requestId:i})):l.type==="AI_STREAM_ERROR"&&(r(),o.disconnect(),n({success:!1,error:l.payload.error||"Unknown error",requestId:i})))};o.onDisconnect.addListener(()=>{r(),n({success:!1,error:"请求已取消",requestId:i})}),o.onMessage.addListener(a),o.postMessage({type:"AI_VISION_REQUEST",payload:{imageDataUrl:h,prompt:e,config:t,requestId:i}})})}function U(h){return`You are a professional translator. Translate the following text to ${h}. Only output the translation, nothing else.`}function _(){return"You are a summarization expert. Summarize the following text in a concise manner, keeping the key points. Use bullet points if appropriate. Output in the same language as the input."}function O(){return"You are a helpful teacher. Explain the following text in simple terms that anyone can understand. Output in the same language as the input."}function F(){return"You are a professional editor. Rewrite the following text to make it clearer, more engaging, and well-structured. Keep the same meaning. Output in the same language as the input."}function N(){return"You are a senior software engineer. Explain the following code in detail, including what it does, how it works, and any important concepts. Output in the same language as the input text (if any) or in English."}function K(){return"You are a summarization expert. Summarize the following webpage content in a comprehensive but concise manner. Include the main topic, key points, and any important details. Use bullet points for clarity. Output in the same language as the content."}function Y(){return`请详细描述这张图片的内容，包括：
1. 主要元素和对象
2. 场景和环境
3. 颜色和视觉特征
4. 任何文字或标识
5. 整体氛围和主题

请用中文回答。`}function j(h){return`请根据这张图片回答以下问题：

${h}

请用中文回答，尽量详细和准确。`}class X{constructor(){c(this,"container",null);c(this,"overlay",null);c(this,"menuItems",[]);c(this,"selectedIndex",-1);c(this,"centerX",0);c(this,"centerY",0);c(this,"isVisible",!1);c(this,"onSelect",null);c(this,"resultPanel",null);c(this,"selectionRect",null);c(this,"radius",120);c(this,"isLoading",!1);c(this,"onStopCallback",null);c(this,"onClose",null);this.handleMouseMove=this.handleMouseMove.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.handleClick=this.handleClick.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}setSelectionInfo(e){this.selectionRect=e}show(e,t,s,n){this.isVisible&&this.hide(),this.menuItems=s.filter(r=>r.enabled!==!1).sort((r,a)=>(r.order??0)-(a.order??0)),this.onSelect=n,this.centerX=e,this.centerY=t,this.selectedIndex=-1,this.isVisible=!0;const i=Math.min(120,(Math.min(window.innerWidth,window.innerHeight)-100)/2),o=this.menuItems.length;o<=4?this.radius=i*.75:o<=6?this.radius=i*.85:this.radius=i,this.createOverlay(),this.createMenu(),this.attachEventListeners()}hide(){this.isVisible=!1,this.detachEventListeners(),this.overlay&&(this.overlay.classList.add("thecircle-fade-out"),setTimeout(()=>{this.overlay&&(m(this.overlay),this.overlay=null,this.container=null)},200))}showResultOnly(e,t,s){this.centerX=e,this.centerY=t,this.showResult(s,"",!0)}hideResultPanel(){this.isLoading&&(y(),this.isLoading=!1),this.resultPanel&&(this.resultPanel.classList.add("thecircle-fade-out"),setTimeout(()=>{var e;this.resultPanel&&(m(this.resultPanel),this.resultPanel=null,(e=this.onClose)==null||e.call(this))},200))}setOnStop(e){this.onStopCallback=e}setOnClose(e){this.onClose=e}showResult(e,t,s=!1){this.hideResultPanel(),this.isLoading=s,this.resultPanel=document.createElement("div"),this.resultPanel.className="thecircle-result-panel";const n=s?`<div class="thecircle-loading-container">
           <div class="thecircle-loading-row">
             <div class="thecircle-spinner"></div>
             <span class="thecircle-loading-text">正在思考...</span>
           </div>
         </div>`:t;this.resultPanel.innerHTML=`
      <div class="thecircle-result-header">
        <span class="thecircle-result-title">${e}</span>
        <button class="thecircle-result-close">×</button>
      </div>
      <div class="thecircle-result-content-wrapper">
        <div class="thecircle-result-content">
          ${n}
        </div>
      </div>
      <div class="thecircle-result-actions">
        ${s?this.createStopButtonHTML():""}
        ${this.createCopyButtonHTML()}
      </div>
    `,b(this.resultPanel);const i=this.resultPanel.getBoundingClientRect();let o,r;this.selectionRect?(o=this.selectionRect.left+this.selectionRect.width/2-i.width/2,r=this.selectionRect.bottom+15,r+i.height>window.innerHeight-20&&(r=this.selectionRect.top-i.height-15)):(o=(window.innerWidth-i.width)/2,r=(window.innerHeight-i.height)/2),o<20&&(o=20),o+i.width>window.innerWidth-20&&(o=window.innerWidth-i.width-20),r<20&&(r=20),r+i.height>window.innerHeight-20&&(r=window.innerHeight-i.height-20),this.resultPanel.style.left=`${o}px`,this.resultPanel.style.top=`${r}px`;const a=this.resultPanel.querySelector(".thecircle-result-close");if(a==null||a.addEventListener("click",()=>this.hideResultPanel()),s){const l=this.resultPanel.querySelector('[data-action="stop"]');l==null||l.addEventListener("click",()=>{var d;y(),this.isLoading=!1,(d=this.onStopCallback)==null||d.call(this),l.remove(),this.ensureFooterActions(!1,t)})}this.setupCopyButton(t),this.setupScrollIndicators()}createStopButtonHTML(){return`
      <button class="thecircle-stop-btn" data-action="stop">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="6" width="12" height="12" rx="2"></rect>
        </svg>
        终止
      </button>
    `}createCopyButtonHTML(){return`
      <button class="thecircle-copy-btn">
        <span class="thecircle-copy-btn-icon">${this.getCopyIcon()}</span>
        <span class="thecircle-copy-btn-text">复制</span>
      </button>
    `}getCopyIcon(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>`}getCheckIcon(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`}setupCopyButton(e){if(!this.resultPanel)return;const t=this.resultPanel.querySelector(".thecircle-copy-btn");t&&t.addEventListener("click",()=>{navigator.clipboard.writeText(e),this.showCopyFeedback(t)})}showCopyFeedback(e){const t=e.querySelector(".thecircle-copy-btn-icon"),s=e.querySelector(".thecircle-copy-btn-text");t&&s&&(e.classList.add("copied"),t.innerHTML=this.getCheckIcon(),s.textContent="已复制!",setTimeout(()=>{e.classList.remove("copied"),t.innerHTML=this.getCopyIcon(),s.textContent="复制"},1500))}setupScrollIndicators(){if(!this.resultPanel)return;const e=this.resultPanel.querySelector(".thecircle-result-content-wrapper"),t=this.resultPanel.querySelector(".thecircle-result-content");if(e&&t){const s=()=>{const{scrollTop:n,scrollHeight:i,clientHeight:o}=t,r=n>5,a=n<i-o-5;e.classList.toggle("has-scroll-top",r),e.classList.toggle("has-scroll-bottom",a)};t.addEventListener("scroll",s),requestAnimationFrame(s)}}updateResult(e){if(this.isLoading=!1,this.resultPanel){const t=this.resultPanel.querySelector(".thecircle-result-content");t&&(t.innerHTML=this.formatStreamContent(e)),this.ensureFooterActions(!1,e),this.setupScrollIndicators()}}streamUpdate(e,t){if(this.isLoading=!0,this.resultPanel){const s=this.resultPanel.querySelector(".thecircle-result-content");if(s){s.querySelector(".thecircle-loading-container")&&(s.innerHTML=`
            <div class="thecircle-stream-content"></div>
          `,this.ensureFooterActions(!0,t));const n=s.querySelector(".thecircle-stream-content");n?n.innerHTML=this.formatStreamContent(t):s.innerHTML=this.formatStreamContent(t)}}}formatStreamContent(e){return e.replace(/\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`(.*?)`/g,"<code>$1</code>")}ensureFooterActions(e,t){if(!this.resultPanel)return;const s=this.resultPanel.querySelector(".thecircle-result-actions");if(!s)return;let n=s.querySelector('[data-action="stop"]');if(e){if(!n){const o=document.createElement("div");o.innerHTML=this.createStopButtonHTML(),n=o.firstElementChild,n&&(s.insertBefore(n,s.firstChild),n.addEventListener("click",()=>{var r;y(),this.isLoading=!1,(r=this.onStopCallback)==null||r.call(this),n==null||n.remove(),this.ensureFooterActions(!1,t)}))}}else n&&n.remove();const i=s.querySelector(".thecircle-copy-btn");if(i){const o=i.cloneNode(!0);o.addEventListener("click",()=>{navigator.clipboard.writeText(t),this.showCopyFeedback(o)}),i.replaceWith(o)}else{const o=document.createElement("div");o.innerHTML=this.createCopyButtonHTML();const r=o.firstElementChild;r&&(s.appendChild(r),r.addEventListener("click",()=>{navigator.clipboard.writeText(t),this.showCopyFeedback(r)}))}}createOverlay(){this.overlay=document.createElement("div"),this.overlay.className="thecircle-overlay",b(this.overlay)}createMenu(){this.container=document.createElement("div"),this.container.className="thecircle-menu",this.container.style.left=`${this.centerX}px`,this.container.style.top=`${this.centerY}px`;const e=document.createElement("div");e.className="thecircle-center",e.innerHTML=`
      <span class="thecircle-center-icon">${u.circle}</span>
      <span class="thecircle-center-label">选择操作</span>
    `,this.container.appendChild(e);const t=this.menuItems.length;this.menuItems.forEach((s,n)=>{const i=n/t*2*Math.PI-Math.PI/2,o=Math.cos(i)*this.radius,r=Math.sin(i)*this.radius,a=document.createElement("div");a.className="thecircle-item",a.dataset.index=String(n),a.style.setProperty("--x",`${o}px`),a.style.setProperty("--y",`${r}px`),a.style.transform=`translate(${o}px, ${r}px)`;const l=s.customIcon||s.icon,d=s.customLabel||s.label;a.innerHTML=`
        <span class="thecircle-item-icon">${l}</span>
        <span class="thecircle-item-label">${d}</span>
      `,this.container.appendChild(a)}),this.overlay.appendChild(this.container),requestAnimationFrame(()=>{var s;(s=this.container)==null||s.classList.add("thecircle-menu-visible")})}attachEventListeners(){document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("keyup",this.handleKeyUp),document.addEventListener("click",this.handleClick),document.addEventListener("keydown",this.handleKeyDown)}detachEventListeners(){document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("keyup",this.handleKeyUp),document.removeEventListener("click",this.handleClick),document.removeEventListener("keydown",this.handleKeyDown)}handleMouseMove(e){if(!this.isVisible||!this.container)return;const t=e.clientX-this.centerX,s=e.clientY-this.centerY;if(Math.sqrt(t*t+s*s)<40){this.setSelectedIndex(-1);return}let i=Math.atan2(s,t);i=i+Math.PI/2,i<0&&(i+=2*Math.PI);const o=this.menuItems.length,r=2*Math.PI/o,a=Math.floor((i+r/2)%(2*Math.PI)/r);this.setSelectedIndex(a)}setSelectedIndex(e){var s,n,i,o,r,a,l;if(this.selectedIndex===e)return;if(this.selectedIndex>=0){const d=(s=this.container)==null?void 0:s.querySelector(`[data-index="${this.selectedIndex}"]`);d==null||d.classList.remove("thecircle-item-selected")}this.selectedIndex=e;const t=(n=this.container)==null?void 0:n.querySelector(".thecircle-center");if(e>=0&&e<this.menuItems.length){const d=(i=this.container)==null?void 0:i.querySelector(`[data-index="${e}"]`);d==null||d.classList.add("thecircle-item-selected"),t==null||t.classList.add("thecircle-center-visible");const f=(o=this.container)==null?void 0:o.querySelector(".thecircle-center-label"),R=(r=this.container)==null?void 0:r.querySelector(".thecircle-center-icon");if(f&&R){const x=this.menuItems[e];f.textContent=x.customLabel||x.label,R.innerHTML=x.customIcon||x.icon}}else{t==null||t.classList.remove("thecircle-center-visible");const d=(a=this.container)==null?void 0:a.querySelector(".thecircle-center-label"),f=(l=this.container)==null?void 0:l.querySelector(".thecircle-center-icon");d&&f&&(d.textContent="选择操作",f.innerHTML=u.circle)}}handleKeyUp(e){e.key==="Alt"&&this.selectedIndex>=0&&this.executeSelection()}handleKeyDown(e){if(!this.isVisible)return;const t=this.menuItems.length;switch(e.key){case"Escape":e.preventDefault(),this.hide();break;case"ArrowRight":e.preventDefault(),this.setSelectedIndex(this.selectedIndex<0?0:(this.selectedIndex+1)%t);break;case"ArrowLeft":e.preventDefault(),this.setSelectedIndex(this.selectedIndex<0?t-1:(this.selectedIndex-1+t)%t);break;case"ArrowUp":if(e.preventDefault(),this.selectedIndex<0)this.setSelectedIndex(0);else{const n=(this.selectedIndex+Math.floor(t/2))%t;this.setSelectedIndex(n)}break;case"ArrowDown":if(e.preventDefault(),this.selectedIndex<0)this.setSelectedIndex(Math.floor(t/2));else{const n=(this.selectedIndex+Math.floor(t/2))%t;this.setSelectedIndex(n)}break;case"Tab":e.preventDefault(),e.shiftKey?this.setSelectedIndex(this.selectedIndex<0?t-1:(this.selectedIndex-1+t)%t):this.setSelectedIndex(this.selectedIndex<0?0:(this.selectedIndex+1)%t);break;case"Enter":e.preventDefault(),this.selectedIndex>=0&&this.executeSelection();break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":e.preventDefault();const s=parseInt(e.key)-1;s<t&&(this.setSelectedIndex(s),this.executeSelection());break}}handleClick(e){var i,o;if(!this.isVisible)return;const t=e.composedPath();let s=null,n=!1;for(const r of t)r instanceof HTMLElement&&((i=r.classList)!=null&&i.contains("thecircle-item")&&(s=r),(o=r.classList)!=null&&o.contains("thecircle-menu")&&(n=!0));if(s){const r=parseInt(s.getAttribute("data-index")||"-1");r>=0&&(this.selectedIndex=r,this.executeSelection())}else n||this.hide()}executeSelection(){var e;if(this.selectedIndex>=0&&this.selectedIndex<this.menuItems.length){const t=this.menuItems[this.selectedIndex];this.hide(),(e=this.onSelect)==null||e.call(this,t)}}}const v={saveToFile:!0,copyToClipboard:!1,enableAI:!0,defaultAIAction:"none",imageQuality:.92,enableImageGen:!1,imageGenProvider:"openai",imageSize:"1024x1024"},S={shortcut:"Double+Shift",theme:"dark",preferredLanguage:"zh-CN",apiProvider:"groq",useStreaming:!0,screenshot:v,popoverPosition:"above"},C=[{id:"translate",icon:u.translate,label:"翻译",action:"translate",enabled:!0,order:0},{id:"summarize",icon:u.summarize,label:"总结",action:"summarize",enabled:!0,order:1},{id:"explain",icon:u.explain,label:"解释",action:"explain",enabled:!0,order:2},{id:"rewrite",icon:u.rewrite,label:"改写",action:"rewrite",enabled:!0,order:3},{id:"search",icon:u.search,label:"搜索",action:"search",enabled:!0,order:4},{id:"copy",icon:u.copy,label:"复制",action:"copy",enabled:!0,order:5},{id:"sendToAI",icon:u.sendToAI,label:"发送到 AI",action:"sendToAI",enabled:!0,order:6},{id:"codeExplain",icon:u.codeExplain,label:"代码解释",action:"codeExplain",enabled:!0,order:7}],A=[{id:"aiChat",icon:u.aiChat,label:"AI 对话",action:"aiChat",enabled:!0,order:0},{id:"summarizePage",icon:u.summarizePage,label:"总结页面",action:"summarizePage",enabled:!0,order:1},{id:"switchTab",icon:u.switchTab,label:"标签切换",action:"switchTab",enabled:!0,order:2},{id:"history",icon:u.history,label:"历史记录",action:"history",enabled:!0,order:3},{id:"screenshot",icon:u.screenshot,label:"截图",action:"screenshot",enabled:!0,order:4},{id:"bookmark",icon:u.bookmark,label:"书签",action:"bookmark",enabled:!0,order:5},{id:"newTab",icon:u.newTab,label:"新标签",action:"newTab",enabled:!0,order:6},{id:"settings",icon:u.settings,label:"设置",action:"settings",enabled:!0,order:7}],V=`
.thecircle-screenshot-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  background: transparent;
  cursor: crosshair;
  animation: thecircle-ss-fade-in 0.15s ease-out;
}
.thecircle-screenshot-overlay.thecircle-screenshot-selecting {
  background: transparent;
}
.thecircle-screenshot-overlay.thecircle-screenshot-idle {
  background: rgba(0, 0, 0, 0.3);
}
.thecircle-screenshot-overlay.thecircle-screenshot-has-selection {
  cursor: default;
}
.thecircle-screenshot-fade-out {
  animation: thecircle-ss-fade-out 0.2s ease-out forwards;
}
@keyframes thecircle-ss-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes thecircle-ss-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
.thecircle-screenshot-hint {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(30, 30, 30, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s ease;
}
.thecircle-screenshot-hint-divider {
  color: rgba(255, 255, 255, 0.3);
}
.thecircle-screenshot-hint-key {
  background: rgba(255, 255, 255, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
.thecircle-screenshot-selection {
  position: fixed;
  border: 2px solid #3b82f6;
  background: transparent;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  cursor: move;
}
.thecircle-screenshot-selection.thecircle-screenshot-selection-active {
  pointer-events: auto;
  cursor: move;
}
.thecircle-screenshot-selection.thecircle-screenshot-selection-breathe {
  animation: thecircle-ss-breathe 0.4s ease-out;
}
@keyframes thecircle-ss-breathe {
  0% { border-color: #3b82f6; box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5); }
  50% { border-color: #60a5fa; box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.5); }
  100% { border-color: #3b82f6; box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5); }
}
.thecircle-screenshot-size {
  position: fixed;
  transform: translateX(-50%);
  padding: 4px 10px;
  background: rgba(30, 30, 30, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  pointer-events: none;
}
.thecircle-screenshot-toolbar {
  position: fixed;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 8px;
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  animation: thecircle-ss-fade-in 0.15s ease-out;
  z-index: 2147483647;
}
.thecircle-screenshot-toolbar-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}
.thecircle-screenshot-toolbar-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}
.thecircle-screenshot-toolbar-btn-primary {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}
.thecircle-screenshot-toolbar-btn-primary:hover {
  background: #2563eb;
  border-color: #2563eb;
}
`;let E=!1;function G(){if(E)return;const h=document.createElement("style");h.id="thecircle-screenshot-styles",h.textContent=V,document.head.appendChild(h),E=!0}class W{constructor(){c(this,"overlay",null);c(this,"selectionBox",null);c(this,"sizeIndicator",null);c(this,"hintText",null);c(this,"toolbar",null);c(this,"isSelecting",!1);c(this,"isDragging",!1);c(this,"hasSelection",!1);c(this,"startX",0);c(this,"startY",0);c(this,"dragOffsetX",0);c(this,"dragOffsetY",0);c(this,"currentArea",null);c(this,"callbacks",null);G(),this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}show(e){this.callbacks=e,this.createOverlay(),this.attachEventListeners()}hide(){this.detachEventListeners(),this.overlay&&(this.overlay.classList.add("thecircle-screenshot-fade-out"),setTimeout(()=>{var e;(e=this.overlay)==null||e.remove(),this.overlay=null,this.selectionBox=null,this.sizeIndicator=null,this.hintText=null,this.toolbar=null},200))}hideImmediately(){this.detachEventListeners(),this.overlay&&(this.overlay.remove(),this.overlay=null,this.selectionBox=null,this.sizeIndicator=null,this.hintText=null,this.toolbar=null)}createOverlay(){this.overlay=document.createElement("div"),this.overlay.className="thecircle-screenshot-overlay thecircle-screenshot-idle",this.hintText=document.createElement("div"),this.hintText.className="thecircle-screenshot-hint",this.hintText.innerHTML=`
      <span>拖拽选择截图区域</span>
      <span class="thecircle-screenshot-hint-divider">|</span>
      <span class="thecircle-screenshot-hint-key">ESC</span>
      <span>取消</span>
      <span class="thecircle-screenshot-hint-divider">|</span>
      <span>点击截取全屏</span>
    `,this.overlay.appendChild(this.hintText),this.selectionBox=document.createElement("div"),this.selectionBox.className="thecircle-screenshot-selection",this.selectionBox.style.display="none",this.overlay.appendChild(this.selectionBox),this.sizeIndicator=document.createElement("div"),this.sizeIndicator.className="thecircle-screenshot-size",this.sizeIndicator.style.display="none",this.overlay.appendChild(this.sizeIndicator),document.body.appendChild(this.overlay)}createToolbar(){var s;if(!this.overlay||!this.currentArea)return;(s=this.toolbar)==null||s.remove(),this.toolbar=document.createElement("div"),this.toolbar.className="thecircle-screenshot-toolbar";const e=this.currentArea.y+this.currentArea.height+10,t=this.currentArea.x+this.currentArea.width/2;this.toolbar.style.left=`${t}px`,this.toolbar.style.top=`${e}px`,e+50>window.innerHeight&&(this.toolbar.style.top=`${this.currentArea.y-50}px`),this.toolbar.innerHTML=`
      <button class="thecircle-screenshot-toolbar-btn thecircle-screenshot-toolbar-btn-primary" data-action="confirm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        确认
      </button>
      <button class="thecircle-screenshot-toolbar-btn" data-action="reselect">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 4v6h6"></path>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
        </svg>
        重选
      </button>
      <button class="thecircle-screenshot-toolbar-btn" data-action="cancel">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        取消
      </button>
    `,this.toolbar.addEventListener("click",n=>{var a;const o=n.target.closest("button");if(!o)return;const r=o.dataset.action;r==="confirm"?this.confirmSelection():r==="reselect"?this.resetSelection():r==="cancel"&&(this.hide(),(a=this.callbacks)==null||a.onCancel())}),this.overlay.appendChild(this.toolbar)}confirmSelection(){const e=this.currentArea;this.hideImmediately(),requestAnimationFrame(()=>{var t;(t=this.callbacks)==null||t.onSelect(e)})}resetSelection(){var e;this.hasSelection=!1,this.currentArea=null,this.isDragging=!1,(e=this.toolbar)==null||e.remove(),this.toolbar=null,this.overlay&&(this.overlay.classList.add("thecircle-screenshot-idle"),this.overlay.classList.remove("thecircle-screenshot-has-selection")),this.selectionBox&&(this.selectionBox.style.display="none",this.selectionBox.classList.remove("thecircle-screenshot-selection-active"),this.selectionBox.classList.remove("thecircle-screenshot-selection-breathe")),this.sizeIndicator&&(this.sizeIndicator.style.display="none"),this.hintText&&(this.hintText.style.opacity="1")}attachEventListeners(){document.addEventListener("mousedown",this.handleMouseDown),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),document.addEventListener("keydown",this.handleKeyDown)}detachEventListeners(){document.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp),document.removeEventListener("keydown",this.handleKeyDown)}handleMouseDown(e){if(!this.overlay||e.button!==0||this.toolbar&&this.toolbar.contains(e.target))return;const t=e.clientX,s=e.clientY;if(this.hasSelection&&this.currentArea){const{x:n,y:i,width:o,height:r}=this.currentArea;if(t>=n&&t<=n+o&&s>=i&&s<=i+r){this.isDragging=!0,this.dragOffsetX=t-n,this.dragOffsetY=s-i,e.preventDefault();return}else{this.triggerBreatheAnimation(),e.preventDefault();return}}this.isSelecting=!0,this.startX=t,this.startY=s,this.overlay.classList.remove("thecircle-screenshot-idle"),this.selectionBox&&(this.selectionBox.style.display="block",this.selectionBox.style.left=`${this.startX}px`,this.selectionBox.style.top=`${this.startY}px`,this.selectionBox.style.width="0px",this.selectionBox.style.height="0px"),this.sizeIndicator&&(this.sizeIndicator.style.display="block"),this.hintText&&(this.hintText.style.opacity="0"),e.preventDefault()}handleMouseMove(e){if(this.isDragging&&this.currentArea&&this.selectionBox){const a=Math.max(0,Math.min(window.innerWidth-this.currentArea.width,e.clientX-this.dragOffsetX)),l=Math.max(0,Math.min(window.innerHeight-this.currentArea.height,e.clientY-this.dragOffsetY));this.currentArea.x=a,this.currentArea.y=l,this.selectionBox.style.left=`${a}px`,this.selectionBox.style.top=`${l}px`,this.updateToolbarPosition(),this.sizeIndicator&&(this.sizeIndicator.style.left=`${a+this.currentArea.width/2}px`,this.sizeIndicator.style.top=`${l+this.currentArea.height+10}px`);return}if(!this.isSelecting||!this.selectionBox||!this.sizeIndicator)return;const t=e.clientX,s=e.clientY,n=Math.min(this.startX,t),i=Math.min(this.startY,s),o=Math.abs(t-this.startX),r=Math.abs(s-this.startY);this.selectionBox.style.left=`${n}px`,this.selectionBox.style.top=`${i}px`,this.selectionBox.style.width=`${o}px`,this.selectionBox.style.height=`${r}px`,this.sizeIndicator.textContent=`${o} × ${r}`,this.sizeIndicator.style.left=`${n+o/2}px`,this.sizeIndicator.style.top=`${i+r+10}px`}handleMouseUp(e){var a,l;if(this.isDragging){this.isDragging=!1;return}if(!this.isSelecting){this.hasSelection||(this.hideImmediately(),requestAnimationFrame(()=>{var d;(d=this.callbacks)==null||d.onSelect(null)}));return}this.isSelecting=!1;const t=e.clientX,s=e.clientY,n=Math.min(this.startX,t),i=Math.min(this.startY,s),o=Math.abs(t-this.startX),r=Math.abs(s-this.startY);if(o<10||r<10){this.hideImmediately(),requestAnimationFrame(()=>{var d;(d=this.callbacks)==null||d.onSelect(null)});return}this.currentArea={x:n,y:i,width:o,height:r},this.hasSelection=!0,(a=this.overlay)==null||a.classList.add("thecircle-screenshot-has-selection"),(l=this.selectionBox)==null||l.classList.add("thecircle-screenshot-selection-active"),this.createToolbar()}triggerBreatheAnimation(){this.selectionBox&&(this.selectionBox.classList.remove("thecircle-screenshot-selection-breathe"),this.selectionBox.offsetWidth,this.selectionBox.classList.add("thecircle-screenshot-selection-breathe"),setTimeout(()=>{var e;(e=this.selectionBox)==null||e.classList.remove("thecircle-screenshot-selection-breathe")},400))}updateToolbarPosition(){if(!this.toolbar||!this.currentArea)return;const e=this.currentArea.y+this.currentArea.height+10,t=this.currentArea.x+this.currentArea.width/2;this.toolbar.style.left=`${t}px`,e+50>window.innerHeight?this.toolbar.style.top=`${this.currentArea.y-50}px`:this.toolbar.style.top=`${e}px`}handleKeyDown(e){var t;e.key==="Escape"?(e.preventDefault(),this.hide(),(t=this.callbacks)==null||t.onCancel()):e.key==="Enter"&&this.hasSelection&&(e.preventDefault(),this.confirmSelection())}}class Q{constructor(){c(this,"panel",null);c(this,"imageDataUrl","");c(this,"callbacks",null);c(this,"config",v);c(this,"isShowingInput",!1);c(this,"inputMode","ask");c(this,"isLoading",!1)}show(e,t,s){this.imageDataUrl=e,this.callbacks=t,this.config=s||v,this.createPanel()}hide(){this.isLoading&&(y(),this.isLoading=!1),this.panel&&(this.panel.classList.add("thecircle-screenshot-panel-exit"),setTimeout(()=>{this.panel&&(m(this.panel),this.panel=null)},200))}showLoading(e){if(!this.panel)return;this.isLoading=!0;const t=this.panel.querySelector(".thecircle-screenshot-actions");if(t){t.innerHTML=`
        <div class="thecircle-screenshot-loading">
          <div class="thecircle-spinner"></div>
          <span>${e}</span>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 12px;">
          <button class="thecircle-stop-btn" data-action="stop">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="6" y="6" width="12" height="12" rx="2"></rect>
            </svg>
            终止
          </button>
        </div>
      `;const s=t.querySelector('[data-action="stop"]');s==null||s.addEventListener("click",()=>{y(),this.isLoading=!1,this.resetActions()})}}showResult(e,t){if(!this.panel)return;this.isLoading=!1;const s=this.panel.querySelector(".thecircle-screenshot-actions");if(s){s.innerHTML=`
        <div class="thecircle-screenshot-result">
          <div class="thecircle-screenshot-result-header">${e}</div>
          <div class="thecircle-screenshot-result-content">${t}</div>
          <div class="thecircle-screenshot-result-actions">
            <button class="thecircle-screenshot-btn thecircle-screenshot-btn-secondary" data-action="copy-result">
              ${u.copy}
              <span>复制</span>
            </button>
            <button class="thecircle-screenshot-btn thecircle-screenshot-btn-secondary" data-action="back">
              <span>返回</span>
            </button>
          </div>
        </div>
      `;const n=s.querySelector('[data-action="copy-result"]');n==null||n.addEventListener("click",()=>{navigator.clipboard.writeText(t);const o=n.querySelector("span");if(o){const r=o.textContent;o.textContent="已复制!",setTimeout(()=>{o.textContent=r},1500)}});const i=s.querySelector('[data-action="back"]');i==null||i.addEventListener("click",()=>{this.resetActions()})}}showGeneratedImage(e){if(!this.panel)return;this.isLoading=!1;const t=this.panel.querySelector(".thecircle-screenshot-actions");if(t){t.innerHTML=`
        <div class="thecircle-screenshot-generated">
          <img src="${e}" alt="Generated image" class="thecircle-screenshot-generated-img" />
          <div class="thecircle-screenshot-result-actions">
            <button class="thecircle-screenshot-btn thecircle-screenshot-btn-primary" data-action="save-generated">
              ${u.download}
              <span>保存</span>
            </button>
            <button class="thecircle-screenshot-btn thecircle-screenshot-btn-secondary" data-action="back">
              <span>返回</span>
            </button>
          </div>
        </div>
      `;const s=t.querySelector('[data-action="save-generated"]');s==null||s.addEventListener("click",async()=>{const i=document.createElement("a");i.href=e,i.download=`generated-${Date.now()}.png`,i.click()});const n=t.querySelector('[data-action="back"]');n==null||n.addEventListener("click",()=>{this.resetActions()})}}streamUpdate(e,t){if(!this.panel)return;this.isLoading=!0;const s=this.panel.querySelector(".thecircle-screenshot-actions");if(!s)return;if(s.querySelector(".thecircle-screenshot-loading")){s.innerHTML=`
        <div class="thecircle-screenshot-result">
          <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
            <button class="thecircle-stop-btn" data-action="stop">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="6" y="6" width="12" height="12" rx="2"></rect>
              </svg>
              终止
            </button>
          </div>
          <div class="thecircle-screenshot-result-content"></div>
          <div class="thecircle-screenshot-result-actions">
            <button class="thecircle-screenshot-btn thecircle-screenshot-btn-secondary" data-action="copy-result">
              ${u.copy}
              <span>复制</span>
            </button>
            <button class="thecircle-screenshot-btn thecircle-screenshot-btn-secondary" data-action="back">
              <span>返回</span>
            </button>
          </div>
        </div>
      `;const o=s.querySelector('[data-action="stop"]');o==null||o.addEventListener("click",()=>{var l;y(),this.isLoading=!1,(l=o.parentElement)==null||l.remove()});const r=s.querySelector('[data-action="copy-result"]');r==null||r.addEventListener("click",()=>{const l=s.querySelector(".thecircle-screenshot-result-content");if(l){navigator.clipboard.writeText(l.textContent||"");const d=r.querySelector("span");if(d){const f=d.textContent;d.textContent="已复制!",setTimeout(()=>{d.textContent=f},1500)}}});const a=s.querySelector('[data-action="back"]');a==null||a.addEventListener("click",()=>{this.resetActions()})}const i=s.querySelector(".thecircle-screenshot-result-content");i&&(i.innerHTML=this.formatContent(t),i.scrollTop=i.scrollHeight)}formatContent(e){return e.replace(/\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`(.*?)`/g,"<code>$1</code>")}resetActions(){if(!this.panel)return;this.isLoading=!1;const e=this.panel.querySelector(".thecircle-screenshot-actions");e&&(e.innerHTML=this.createActionsHTML(),this.setupActionListeners())}createPanel(){this.panel=document.createElement("div"),this.panel.className="thecircle-screenshot-panel",this.panel.innerHTML=`
      <div class="thecircle-screenshot-header">
        <span class="thecircle-screenshot-title">截图预览</span>
        <button class="thecircle-screenshot-close">${u.x}</button>
      </div>
      <div class="thecircle-screenshot-preview">
        <img src="${this.imageDataUrl}" alt="Screenshot preview" />
      </div>
      <div class="thecircle-screenshot-actions">
        ${this.createActionsHTML()}
      </div>
    `,b(this.panel),this.positionPanel();const e=this.panel.querySelector(".thecircle-screenshot-close");e==null||e.addEventListener("click",()=>{var s;this.hide(),(s=this.callbacks)==null||s.onClose()}),this.setupActionListeners();const t=s=>{var n;s.key==="Escape"&&(this.hide(),(n=this.callbacks)==null||n.onClose(),document.removeEventListener("keydown",t))};document.addEventListener("keydown",t)}createActionsHTML(){const e=[{action:"save",icon:u.download,label:"保存",primary:!0},{action:"copy",icon:u.copy,label:"复制"}];return this.config.enableAI&&e.push({action:"ask",icon:u.messageCircle,label:"问AI"},{action:"describe",icon:u.fileText,label:"描述图片"}),this.config.enableImageGen&&e.push({action:"generate",icon:u.sparkles,label:"AI生图"}),`
      <div class="thecircle-screenshot-btn-group">
        ${e.map(t=>`
          <button class="thecircle-screenshot-btn ${t.primary?"thecircle-screenshot-btn-primary":"thecircle-screenshot-btn-secondary"}" data-action="${t.action}">
            ${t.icon}
            <span>${t.label}</span>
          </button>
        `).join("")}
      </div>
    `}setupActionListeners(){if(!this.panel)return;const e=this.panel.querySelector('[data-action="save"]');e==null||e.addEventListener("click",()=>{var o;return(o=this.callbacks)==null?void 0:o.onSave()});const t=this.panel.querySelector('[data-action="copy"]');t==null||t.addEventListener("click",()=>{var r;(r=this.callbacks)==null||r.onCopy();const o=t.querySelector("span");if(o){const a=o.textContent;o.textContent="已复制!",setTimeout(()=>{o.textContent=a},1500)}});const s=this.panel.querySelector('[data-action="ask"]');s==null||s.addEventListener("click",()=>this.showInputField("ask"));const n=this.panel.querySelector('[data-action="describe"]');n==null||n.addEventListener("click",()=>{var o;return(o=this.callbacks)==null?void 0:o.onDescribe()});const i=this.panel.querySelector('[data-action="generate"]');i==null||i.addEventListener("click",()=>this.showInputField("generate"))}showInputField(e){if(!this.panel)return;this.inputMode=e,this.isShowingInput=!0;const t=this.panel.querySelector(".thecircle-screenshot-actions");if(t){const s=e==="ask"?"输入你想问的问题...":"输入生成提示词...",n=e==="ask"?"发送":"生成";t.innerHTML=`
        <div class="thecircle-screenshot-input-area">
          <input
            type="text"
            class="thecircle-screenshot-input"
            placeholder="${s}"
            autofocus
          />
          <div class="thecircle-screenshot-input-actions">
            <button class="thecircle-screenshot-btn thecircle-screenshot-btn-secondary" data-action="cancel-input">
              取消
            </button>
            <button class="thecircle-screenshot-btn thecircle-screenshot-btn-primary" data-action="submit-input">
              ${n}
            </button>
          </div>
        </div>
      `;const i=t.querySelector(".thecircle-screenshot-input");i==null||i.focus(),i==null||i.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),this.submitInput(i.value))});const o=t.querySelector('[data-action="cancel-input"]');o==null||o.addEventListener("click",()=>this.resetActions());const r=t.querySelector('[data-action="submit-input"]');r==null||r.addEventListener("click",()=>this.submitInput(i.value))}}submitInput(e){var s,n;const t=e.trim();t&&(this.inputMode==="ask"?(s=this.callbacks)==null||s.onAskAI(t):(n=this.callbacks)==null||n.onGenerateImage(t))}positionPanel(){if(!this.panel)return;const e=this.panel.getBoundingClientRect(),t=(window.innerWidth-e.width)/2,s=(window.innerHeight-e.height)/2;this.panel.style.left=`${Math.max(20,t)}px`,this.panel.style.top=`${Math.max(20,s)}px`}}class Z{constructor(e){c(this,"selectedText","");c(this,"config");c(this,"screenshotSelector",null);c(this,"screenshotPanel",null);c(this,"currentScreenshotDataUrl","");c(this,"flowCallbacks",null);this.config=e}setSelectedText(e){this.selectedText=e}setConfig(e){this.config=e}setFlowCallbacks(e){this.flowCallbacks=e}async execute(e,t){switch(e.action){case"translate":return this.handleTranslate(t);case"summarize":return this.handleSummarize(t);case"explain":return this.handleExplain(t);case"rewrite":return this.handleRewrite(t);case"codeExplain":return this.handleCodeExplain(t);case"search":return this.handleSearch();case"copy":return this.handleCopy();case"sendToAI":return this.handleSendToAI();case"aiChat":return this.handleAIChat();case"summarizePage":return this.handleSummarizePage(t);case"switchTab":return this.handleSwitchTab();case"history":return this.handleHistory();case"screenshot":return this.handleScreenshotFlow();case"bookmark":return this.handleBookmark();case"newTab":return this.handleNewTab();case"settings":return this.handleSettings();default:return{type:"error",result:"Unknown action"}}}async handleTranslate(e){return this.selectedText?this.callAIAction("translate",this.selectedText,e):{type:"error",result:"请先选择要翻译的文字"}}async handleSummarize(e){return this.selectedText?this.callAIAction("summarize",this.selectedText,e):{type:"error",result:"请先选择要总结的文字"}}async handleExplain(e){return this.selectedText?this.callAIAction("explain",this.selectedText,e):{type:"error",result:"请先选择要解释的文字"}}async handleRewrite(e){return this.selectedText?this.callAIAction("rewrite",this.selectedText,e):{type:"error",result:"请先选择要改写的文字"}}async handleCodeExplain(e){return this.selectedText?this.callAIAction("codeExplain",this.selectedText,e):{type:"error",result:"请先选择要解释的代码"}}async handleSummarizePage(e){return this.callAIAction("summarizePage",document.body.innerText.slice(0,1e4),e)}async callAIAction(e,t,s){let n;switch(e){case"translate":n=U(this.config.preferredLanguage||"zh-CN");break;case"summarize":n=_();break;case"explain":n=O();break;case"rewrite":n=F();break;case"codeExplain":n=N();break;case"summarizePage":n=K();break;default:return{type:"error",result:"Unknown AI action"}}try{const i=await B(t,n,this.config,s);return i.success?{type:"ai",result:i.result}:{type:"error",result:i.error||"AI 请求失败"}}catch(i){return{type:"error",result:`请求失败: ${i}`}}}handleSearch(){const t=`https://www.google.com/search?q=${encodeURIComponent(this.selectedText||"")}`;return window.open(t,"_blank"),{type:"redirect",url:t}}handleCopy(){return this.selectedText?(navigator.clipboard.writeText(this.selectedText),{type:"success",result:"已复制到剪贴板"}):{type:"error",result:"没有选中的文字"}}handleSendToAI(){const t=`https://chat.openai.com/?q=${encodeURIComponent(this.selectedText||"")}`;return window.open(t,"_blank"),{type:"redirect",url:t}}handleAIChat(){return window.open("https://chat.openai.com/","_blank"),{type:"redirect",url:"https://chat.openai.com/"}}async handleSwitchTab(){try{const e=await chrome.runtime.sendMessage({type:"GET_TABS"});return e!=null&&e.tabs?{type:"info",result:`打开了 ${e.tabs.length} 个标签页`}:{type:"error",result:"获取标签页失败"}}catch{return{type:"error",result:"获取标签页失败"}}}handleHistory(){return chrome.runtime.sendMessage({type:"OPEN_URL",payload:"chrome://history"}),{type:"redirect",url:"chrome://history"}}handleScreenshotFlow(){return this.screenshotSelector=new W,this.screenshotSelector.show({onSelect:async e=>{await this.captureAndShowPanel(e)},onCancel:()=>{var e;(e=this.flowCallbacks)==null||e.onToast("截图已取消","info")}}),{type:"silent",result:""}}async captureAndShowPanel(e){var t,s;try{const n=await chrome.runtime.sendMessage({type:"CAPTURE_VISIBLE_TAB"});if(!(n!=null&&n.success)||!n.dataUrl){(t=this.flowCallbacks)==null||t.onToast("截图失败","error");return}let i=n.dataUrl;e&&(i=await this.cropImage(n.dataUrl,e)),this.currentScreenshotDataUrl=i;const o=this.config.screenshot||v;this.screenshotPanel=new Q,this.screenshotPanel.show(i,{onSave:()=>this.saveScreenshot(),onCopy:()=>this.copyScreenshotToClipboard(),onAskAI:r=>this.askAIAboutImage(r),onDescribe:()=>this.describeImage(),onGenerateImage:r=>this.generateImageFromPrompt(r),onClose:()=>{this.screenshotPanel=null}},o)}catch(n){(s=this.flowCallbacks)==null||s.onToast(`截图失败: ${n}`,"error")}}async cropImage(e,t){return new Promise((s,n)=>{const i=new Image;i.onload=()=>{const o=document.createElement("canvas"),r=o.getContext("2d");if(!r){n(new Error("Failed to get canvas context"));return}const a=window.devicePixelRatio||1;o.width=t.width*a,o.height=t.height*a,r.drawImage(i,t.x*a,t.y*a,t.width*a,t.height*a,0,0,t.width*a,t.height*a);const l=this.config.screenshot||v;s(o.toDataURL("image/png",l.imageQuality))},i.onerror=()=>n(new Error("Failed to load image")),i.src=e})}async saveScreenshot(){var e,t;try{const s=`screenshot-${Date.now()}.png`;await chrome.runtime.sendMessage({type:"DOWNLOAD_IMAGE",payload:{dataUrl:this.currentScreenshotDataUrl,filename:s}}),(e=this.flowCallbacks)==null||e.onToast("截图已保存","success")}catch(s){(t=this.flowCallbacks)==null||t.onToast(`保存失败: ${s}`,"error")}}async copyScreenshotToClipboard(){var e,t;try{const n=await(await fetch(this.currentScreenshotDataUrl)).blob();await navigator.clipboard.write([new ClipboardItem({[n.type]:n})]),(e=this.flowCallbacks)==null||e.onToast("已复制到剪贴板","success")}catch(s){(t=this.flowCallbacks)==null||t.onToast(`复制失败: ${s}`,"error")}}async askAIAboutImage(e){if(!this.screenshotPanel)return;this.screenshotPanel.showLoading("AI 正在分析...");const t=j(e),s=await k(this.currentScreenshotDataUrl,t,this.config,(n,i)=>{var o;(o=this.screenshotPanel)==null||o.streamUpdate(n,i)});s.success&&s.result?this.screenshotPanel.showResult("AI 回答",s.result):this.screenshotPanel.showResult("错误",s.error||"AI 请求失败")}async describeImage(){if(!this.screenshotPanel)return;this.screenshotPanel.showLoading("AI 正在描述图片...");const e=Y(),t=await k(this.currentScreenshotDataUrl,e,this.config,(s,n)=>{var i;(i=this.screenshotPanel)==null||i.streamUpdate(s,n)});t.success&&t.result?this.screenshotPanel.showResult("图片描述",t.result):this.screenshotPanel.showResult("错误",t.error||"AI 请求失败")}async generateImageFromPrompt(e){if(!this.screenshotPanel)return;const t=this.config.screenshot||v;if(!t.enableImageGen){this.screenshotPanel.showResult("错误","请先在设置中启用 AI 生图功能");return}this.screenshotPanel.showLoading("正在生成图片...");const s=await k(this.currentScreenshotDataUrl,"用简洁的英文描述这张图片的主要内容和风格特征，不超过100词。",this.config),n=s.success?s.result:"",i=n?`Based on this context: "${n}". User request: ${e}`:e,o=await D(i,this.config,t);o.success&&o.imageUrl?this.screenshotPanel.showGeneratedImage(o.imageUrl):this.screenshotPanel.showResult("错误",o.error||"图像生成失败")}async handleBookmark(){try{return await chrome.runtime.sendMessage({type:"ADD_BOOKMARK",payload:{title:document.title,url:window.location.href}}),{type:"success",result:"已添加书签"}}catch{return{type:"error",result:"添加书签失败"}}}handleNewTab(){return chrome.runtime.sendMessage({type:"NEW_TAB"}),{type:"success",result:"已打开新标签页"}}handleSettings(){return chrome.runtime.openOptionsPage(),{type:"redirect",result:"已打开设置页面"}}}class J{constructor(){c(this,"popover",null);c(this,"callbacks",null);c(this,"hideTimeout",null);c(this,"currentRange",null);c(this,"preferredPosition","above");c(this,"scrollHandler",null);c(this,"rafId",null)}show(e,t,s="above"){this.hide(),this.callbacks=t,this.preferredPosition=s;const n=window.getSelection();n&&n.rangeCount>0&&(this.currentRange=n.getRangeAt(0).cloneRange()),this.createPopover(e,s),this.setupScrollListener()}hide(){if(this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null),this.removeScrollListener(),this.popover){this.popover.classList.add("thecircle-selection-popover-exit");const e=this.popover;setTimeout(()=>{m(e)},150),this.popover=null}this.currentRange=null}isVisible(){return this.popover!==null}setupScrollListener(){this.scrollHandler=()=>{this.rafId===null&&(this.rafId=requestAnimationFrame(()=>{this.updatePosition(),this.rafId=null}))},window.addEventListener("scroll",this.scrollHandler,!0)}removeScrollListener(){this.scrollHandler&&(window.removeEventListener("scroll",this.scrollHandler,!0),this.scrollHandler=null),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}updatePosition(){if(!this.popover||!this.currentRange)return;const e=this.currentRange.getBoundingClientRect();if(e.bottom<0||e.top>window.innerHeight){this.popover.style.opacity="0",this.popover.style.pointerEvents="none";return}else this.popover.style.opacity="1",this.popover.style.pointerEvents="auto";const{left:t,top:s}=this.calculatePosition(e,this.preferredPosition);this.popover.style.left=`${t}px`,this.popover.style.top=`${s}px`}calculatePosition(e,t){let o=e.left+e.width/2-16,r;return t==="above"?(r=e.top-32-8,r<10&&(r=e.bottom+8)):(r=e.bottom+8,r+32>window.innerHeight-10&&(r=e.top-32-8)),o<10&&(o=10),o+32>window.innerWidth-10&&(o=window.innerWidth-32-10),{left:o,top:r}}createPopover(e,t){this.popover=document.createElement("div"),this.popover.className="thecircle-selection-popover";const{left:s,top:n}=this.calculatePosition(e,t);this.popover.style.left=`${s}px`,this.popover.style.top=`${n}px`,this.popover.innerHTML=`
      <button class="thecircle-selection-popover-btn" data-action="translate" title="翻译">
        ${u.translate}
      </button>
    `,b(this.popover);const i=this.popover.querySelector('[data-action="translate"]');i==null||i.addEventListener("click",o=>{var r;o.stopPropagation(),(r=this.callbacks)==null||r.onTranslate(),this.hide()}),this.popover.addEventListener("mousedown",o=>{o.stopPropagation()})}}const I="thecircle_data";async function ee(){const h=await chrome.storage.local.get(I);return h[I]?h[I]:{config:S,selectionMenuItems:C,globalMenuItems:A}}class P{constructor(){c(this,"radialMenu");c(this,"menuActions");c(this,"selectionPopover");c(this,"selectionMenuItems",C);c(this,"globalMenuItems",A);c(this,"config",S);c(this,"lastKeyTime",0);c(this,"lastKey","");c(this,"DOUBLE_TAP_DELAY",300);c(this,"activeToasts",[]);c(this,"MAX_TOASTS",4);c(this,"currentSelectedText","");this.radialMenu=new X,this.menuActions=new Z(S),this.selectionPopover=new J,this.menuActions.setFlowCallbacks({onToast:(e,t)=>this.showToast(e,t)}),this.radialMenu.setOnClose(()=>{this.selectionPopover.hide()}),this.init()}async init(){M();try{const e=chrome.runtime.getURL("assets/content.css"),s=await(await fetch(e)).text();$(s)}catch(e){console.error("The Circle: Failed to load styles",e)}await this.loadConfig(),this.setupKeyboardShortcut(),this.setupMessageListener(),this.setupStorageListener(),this.setupSelectionListener(),console.log("The Circle: Initialized with Shadow DOM")}async loadConfig(){try{const e=await ee();this.config=e.config,this.menuActions.setConfig(e.config),this.selectionMenuItems=e.selectionMenuItems,this.globalMenuItems=e.globalMenuItems}catch(e){console.error("The Circle: Failed to load config",e)}}setupStorageListener(){chrome.storage.onChanged.addListener(e=>{e.thecircle_config&&(this.config={...this.config,...e.thecircle_config.newValue},this.menuActions.setConfig(this.config))})}setupSelectionListener(){let e=null;document.addEventListener("mouseup",t=>{var n;const s=t.composedPath();for(const i of s)if(i instanceof HTMLElement&&((n=i.classList)!=null&&n.contains("thecircle-selection-popover")))return;e&&clearTimeout(e),e=window.setTimeout(()=>{const i=window.getSelection(),o=(i==null?void 0:i.toString().trim())||"";if(o&&i&&i.rangeCount>0){const a=i.getRangeAt(0).getBoundingClientRect();this.currentSelectedText=o;const l=this.config.popoverPosition||"above";this.selectionPopover.show(a,{onTranslate:()=>this.handleSelectionTranslate()},l)}else this.selectionPopover.hide(),this.currentSelectedText=""},10)}),document.addEventListener("mousedown",t=>{var n,i;const s=t.composedPath();for(const o of s)if(o instanceof HTMLElement&&((n=o.classList)!=null&&n.contains("thecircle-selection-popover")))return;(i=window.getSelection())!=null&&i.toString().trim()||this.selectionPopover.hide()})}async handleSelectionTranslate(){if(!this.currentSelectedText)return;const e=this.selectionMenuItems.find(a=>a.action==="translate");if(!e){this.showToast("翻译功能未配置","error");return}this.selectionPopover.hide(),this.menuActions.setSelectedText(this.currentSelectedText);const t=window.getSelection();let s=null;t&&t.rangeCount>0&&(s=t.getRangeAt(0).getBoundingClientRect());const n=s?s.left+s.width/2:window.innerWidth/2,i=s?s.bottom+20:window.innerHeight/2;this.radialMenu.setSelectionInfo(s),this.radialMenu.showResultOnly(n,i,e.label);const o=this.config.useStreaming?(a,l)=>{this.radialMenu.streamUpdate(a,l)}:void 0,r=await this.menuActions.execute(e,o);r.type==="error"?this.radialMenu.showResult("错误",r.result||"未知错误"):r.type==="ai"&&this.radialMenu.updateResult(r.result||"")}setupKeyboardShortcut(){const e=new Set;document.addEventListener("keydown",t=>{if(e.add(t.key),this.config.shortcut.startsWith("Double+")){const s=this.config.shortcut.slice(7);if(this.matchDoubleTapKey(t.key,s)){const n=Date.now();this.lastKey===t.key&&n-this.lastKeyTime<this.DOUBLE_TAP_DELAY?(t.preventDefault(),this.showMenu(),this.lastKeyTime=0,this.lastKey=""):(this.lastKeyTime=n,this.lastKey=t.key)}}else this.matchShortcut(t,this.config.shortcut)&&(t.preventDefault(),this.showMenu())}),document.addEventListener("keyup",t=>{e.delete(t.key)}),window.addEventListener("blur",()=>{e.clear()})}matchDoubleTapKey(e,t){return({Control:["Control","ControlLeft","ControlRight"],Shift:["Shift","ShiftLeft","ShiftRight"],Alt:["Alt","AltLeft","AltRight"],Meta:["Meta","MetaLeft","MetaRight"],Space:[" ","Space"],Tab:["Tab"]}[t]||[t]).includes(e)||e.toLowerCase()===t.toLowerCase()}matchShortcut(e,t){const s=t.split("+"),n=s[s.length-1],i=s.includes("Ctrl"),o=s.includes("Alt"),r=s.includes("Shift");return(n==="Space"?e.key===" ":e.key.toUpperCase()===n.toUpperCase())&&(e.ctrlKey||e.metaKey)===i&&e.altKey===o&&e.shiftKey===r}setupMessageListener(){chrome.runtime.onMessage.addListener((e,t,s)=>(e.type==="TOGGLE_MENU"&&(this.showMenu(),s({success:!0})),!0))}showMenu(){this.selectionPopover.hide();const e=this.globalMenuItems,t=window.innerWidth/2,s=window.innerHeight/2;this.radialMenu.setSelectionInfo(null),this.radialMenu.show(t,s,e,async n=>{await this.handleMenuAction(n)})}async handleMenuAction(e){if(["translate","summarize","explain","rewrite","codeExplain","summarizePage"].includes(e.action)){this.radialMenu.showResult(e.label,"",!0);const s=this.config.useStreaming?(i,o)=>{this.radialMenu.streamUpdate(i,o)}:void 0,n=await this.menuActions.execute(e,s);n.type==="error"?this.radialMenu.showResult("错误",n.result||"未知错误"):n.type==="ai"&&this.radialMenu.updateResult(n.result||"")}else{const s=await this.menuActions.execute(e);s.type==="error"?this.showToast(s.result||"未知错误","error"):s.type==="success"?this.showToast(s.result||"操作成功","success"):s.type==="info"&&this.showToast(s.result||"","info")}}getToastIcon(e){return{success:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>`,error:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>`,warning:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,info:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>`}[e]}showToast(e,t="info"){const s=document.createElement("div"),n={success:"border-l-[3px] border-l-green-500/80",error:"border-l-[3px] border-l-red-500/80",warning:"border-l-[3px] border-l-yellow-500/80",info:"border-l-[3px] border-l-blue-500/80"}[t];if(s.className=`fixed left-1/2 -translate-x-1/2 z-[2147483647] px-[20px] py-[12px] text-[14px] rounded-full bg-[#1e1e1e]/95 backdrop-blur-[20px] border border-white/15 text-white/95 font-sans shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] animate-[thecircle-toast-in_0.25s_ease-out] flex items-center gap-[10px] thecircle-toast ${n}`,this.activeToasts.length>=this.MAX_TOASTS){const d=this.activeToasts.shift();d&&(clearTimeout(d.timeoutId),m(d.element))}const i=this.activeToasts.length;s.style.bottom=`${24+i*50}px`,s.setAttribute("data-index",String(i));const o=document.createElement("div");o.className="w-[18px] h-[18px] flex items-center justify-center shrink-0 thecircle-toast-icon";const r={success:"text-[#22c55e]",error:"text-[#ef4444]",warning:"text-[#eab308]",info:"text-[#3b82f6]"}[t];o.classList.add(r),o.innerHTML=this.getToastIcon(t);const a=document.createElement("span");a.textContent=e,s.appendChild(o),s.appendChild(a),b(s);const l=window.setTimeout(()=>{s.classList.add("animate-[thecircle-toast-out_0.2s_ease-out_forwards]","thecircle-toast-exit"),setTimeout(()=>{m(s),this.activeToasts=this.activeToasts.filter(d=>d.element!==s)},200)},3e3);this.activeToasts.push({element:s,timeoutId:l})}updateToastPositions(){this.activeToasts.forEach((e,t)=>{e.element.setAttribute("data-index",String(t))})}removeToast(e){const t=this.activeToasts.findIndex(s=>s.element===e);if(t!==-1){const s=this.activeToasts[t];clearTimeout(s.timeoutId),this.activeToasts.splice(t,1),e.classList.add("thecircle-toast-exit"),setTimeout(()=>{m(e),this.updateToastPositions()},200)}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>new P):new P})();
