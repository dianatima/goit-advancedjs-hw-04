import{A as y,S as b,i as l,a as L}from"./assets/vendor-f5c5dfab.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function w(){return{searchForm:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),input:document.querySelector(".form-input"),submitBtn:document.querySelector(".form-btn")}}y.init();const a=w();let f="1",u="",d=40,m=!1,c=!1;const S="https://pixabay.com/api",E="32083326-5131f12fe438843c4a27c5327";let v=new b(".gallery a",{captionsData:"alt",captionDelay:250});async function P(s,o){if(c)return;const r=new URLSearchParams({key:E,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:d}),n=await L.get(`${S}/?${r}`);if(n.status!==200)throw new Error(n.status);return n.data}function p(s,o){P(s,o).then(r=>{if(r.hits.length===0||r.total===0)throw new Error(response.status);m&&(l.success({title:"OK",message:`Hooray! We found ${r.totalHits} images.`}),m=!1),$(r.hits);const e=(o-1)*d+r.hits.length,t=r.totalHits;if(e>=t){l.error({title:"Error",message:"We're sorry, but you've reached the end of search results."}),c=!0;return}v.refresh()}).catch(r=>{c||l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again."}),c=!0})}function $(s){const o=s.map(({largeImageURL:r,previewURL:n,tags:e,likes:t,views:i,comments:g,downloads:h})=>`<div class="photo-card">
      <a class="gallery__item" href="${r}">
       <img class="gallery__image" src="${n}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${t}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${i}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${g}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${h}
        </p>
      </div>
    </div>
`).join("");a.gallery.innerHTML+=o}a.searchForm.addEventListener("submit",q);function q(s){if(c=!1,s.preventDefault(),f=1,m=!0,a.gallery.innerHTML="",u=s.target.elements.searchQuery.value.trim(),u===""){l.warning({title:"Caution",message:"Please enter your query."});return}try{a.input.setAttribute("disabled","disabled"),a.submitBtn.setAttribute("disabled","disabled"),p(u,f)}catch(o){console.error(o)}}window.addEventListener("scroll",async()=>{document.documentElement.getBoundingClientRect().bottom<document.documentElement.clientHeight+150&&(f+=1,p(u,f))});
//# sourceMappingURL=commonHelpers.js.map
