import{A as b,S as w,i as l,a as L}from"./assets/vendor-f5c5dfab.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function S(){return{searchForm:document.querySelector("#search-form"),gallery:document.querySelector(".gallery")}}b.init();const u=S();let f="1",c="",d=40,m=!1,a=!1,p=!1;const E="https://pixabay.com/api",v="32083326-5131f12fe438843c4a27c5327";let P=new w(".gallery a",{captionsData:"alt",captionDelay:250});async function $(s,o){if(a)return;const r=new URLSearchParams({key:v,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:d}),i=await L.get(`${E}/?${r}`);if(i.status!==200)throw new Error(i.status);return i.data}async function g(s,o){try{const r=await $(s,o);if(r.hits.length===0||r.total===0)throw new Error(response.status);m&&(l.success({title:"OK",message:`Hooray! We found ${r.totalHits} images.`,position:"topRight"}),m=!1),R(r.hits);const e=(o-1)*d+r.hits.length,t=r.totalHits;if(e>=t){l.error({title:"Error",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a=!0;return}P.refresh()}catch{a||l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),a=!0}finally{window.addEventListener("scroll",q)}}function R(s){const o=s.map(({largeImageURL:r,previewURL:i,tags:e,likes:t,views:n,comments:h,downloads:y})=>`<div class="photo-card">
      <a class="gallery__item" href="${r}">
       <img class="gallery__image" src="${i}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${t}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${n}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${h}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${y}
        </p>
      </div>
    </div>
`).join("");u.gallery.insertAdjacentHTML("beforeend",o)}u.searchForm.addEventListener("submit",_);function _(s){if(a=!1,p=!1,s.preventDefault(),f=1,m=!0,u.gallery.innerHTML="",c=s.target.elements.searchQuery.value.trim(),c===""){l.warning({title:"Caution",message:"Please enter your query.",position:"topRight"});return}try{u.searchForm.reset(),g(c,f)}catch(o){console.error(o)}}async function q(){const s=document.documentElement.getBoundingClientRect();if(!p){p=!0;return}s.bottom<document.documentElement.clientHeight+150&&(f+=1,await g(c,f))}
//# sourceMappingURL=commonHelpers.js.map
