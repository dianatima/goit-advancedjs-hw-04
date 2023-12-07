import{A as y,S as b,i as l,a as L}from"./assets/vendor-f5c5dfab.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function w(){return{searchForm:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")}}y.init();const v={root:null,rootMargin:"0px"},S=new IntersectionObserver(E,v);function E(s){s.forEach(async r=>{r.isIntersecting&&(f+=1,await h(u,f))})}const c=w();let f="1",u="",g=40,p=!1,n=!1;const P="https://pixabay.com/api",$="32083326-5131f12fe438843c4a27c5327";let _=new b(".gallery a",{captionsData:"alt",captionDelay:250});async function q(s,r){if(n)return;const o=new URLSearchParams({key:$,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:g}),i=await L.get(`${P}/?${o}`);if(i.status!==200)throw new Error(i.status);return i.data}async function h(s,r){try{const o=await q(s,r);if(o.hits.length===0||o.total===0)throw new Error(response.status);p&&(l.success({title:"OK",message:`Hooray! We found ${o.totalHits} images.`,position:"topRight"}),p=!1),O(o.hits);const e=(r-1)*g+o.hits.length,t=o.totalHits;if(e>=t){l.error({title:"Error",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),n=!0;return}_.refresh(),S.observe(c.guard)}catch{n||l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),n=!0}}function O(s){const r=s.map(({largeImageURL:o,previewURL:i,tags:e,likes:t,views:a,comments:m,downloads:d})=>`<div class="photo-card">
      <a class="gallery__item" href="${o}">
       <img class="gallery__image" src="${i}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${t}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${a}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${m}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${d}
        </p>
      </div>
    </div>
`).join("");c.gallery.insertAdjacentHTML("beforeend",r)}c.searchForm.addEventListener("submit",R);function R(s){if(n=!1,s.preventDefault(),f=1,p=!0,c.gallery.innerHTML="",u=s.target.elements.searchQuery.value.trim(),u===""){l.warning({title:"Caution",message:"Please enter your query.",position:"topRight"});return}try{c.searchForm.reset(),h(u,f)}catch(r){console.error(r)}}
//# sourceMappingURL=commonHelpers.js.map
