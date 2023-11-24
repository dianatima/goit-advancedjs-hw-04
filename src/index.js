import axios from 'axios';
import getRefs from './js/get-refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const refs = getRefs();

let page = '1';
let query = '';
let per_page = 40;
let isFirstSearch = false;
let stopFetching = false;
let isScroll = false;

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '32083326-5131f12fe438843c4a27c5327';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function fetchPictures(query, page) {
  if (stopFetching) return;
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: per_page,
  });
  const response = await axios.get(`${BASE_URL}/?${params}`);
  if (response.status !== 200) {
    throw new Error(response.status);
  }
  return response.data;
}

async function getPictures(query, page) {
  try {
    const res = await fetchPictures(query, page);
    const arrayLength = res.hits.length;
    if (arrayLength === 0 || res.total === 0) {
      throw new Error(response.status);
    }

    if (isFirstSearch) {
      iziToast.success({
        title: 'OK',
        message: `Hooray! We found ${res.totalHits} images.`,
        position: 'topRight',
      });
      isFirstSearch = false;
    }

    renderPictures(res.hits);

    const allPictures = (page - 1) * per_page + res.hits.length;
    const totalHits = res.totalHits;

    if (allPictures >= totalHits) {
      iziToast.error({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      stopFetching = true;
      return;
    }
    lightbox.refresh();
  } catch (error) {
    if (!stopFetching) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
    }
    stopFetching = true;
  } finally {
    window.addEventListener('scroll', onScroll);
  }
}

function renderPictures(pictures) {
  const pictureElem = pictures
    .map(
      ({
        largeImageURL,
        previewURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
      <a class="gallery__item" href="${largeImageURL}">
       <img class="gallery__image" src="${previewURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${downloads}
        </p>
      </div>
    </div>
`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', pictureElem);
}

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  stopFetching = false;
  isScroll = false;
  event.preventDefault();
  page = 1;
  isFirstSearch = true;
  refs.gallery.innerHTML = '';

  query = event.target.elements.searchQuery.value.trim();
  if (query === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter your query.',
      position: 'topRight',
    });
    return;
  }

  try {
    refs.searchForm.reset();
    getPictures(query, page);
  } catch (error) {
    console.error(error);
  }
}

async function onScroll() {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (!isScroll) {
    isScroll = true;
    return;
  }
  if (documentRect.bottom < document.documentElement.clientHeight + 150) {
    page += 1;
    await getPictures(query, page);
  }
}
