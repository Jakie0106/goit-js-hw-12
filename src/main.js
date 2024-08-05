import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import { ButtonCondition, LoaderCondition } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ============refs=========

const form = document.querySelector('.form');
const inputField = document.querySelector('.input');
const imageList = document.querySelector('.gallery');
const spinLoader = document.querySelector('.spin-loader');
const loadBtn = document.querySelector('.load-btn');
const loadMoreBtn = new ButtonCondition(loadBtn, 'is-hidden');
const loader = new LoaderCondition(spinLoader, 'is-hidden');

let inputValue = '';
let maxElements = 15;
let totalPages = 0;
let page = 1;

// =======logic code=======

loadMoreBtn.hide();

function handleSubmit(event) {
  event.preventDefault();
  page = 1;
  imageList.innerHTML = '';

  loader.show();

  inputValue = inputField.value.trim();
  if (inputValue === '') {
    iziToast.warning({
      message: 'Not value for search',
      maxWidth: '320px',
      position: 'topRight',
      messageColor: 'white',
      backgroundColor: 'orange',
    });
    loader.hide();
    return;
  }

  fetchImages(inputValue, page)
    .then(images => {
      totalPages = Math.ceil(images.totalHits / maxElements);
      loader.hide();
      console.log(images);

      if (images.hits.length === 0) {
        iziToast.error({
          maxWidth: '320px',
          position: 'topRight',
          messageColor: 'white',
          backgroundColor: 'orange',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        loader.hide();
        renderImages(images, imageList);
      }

      if (page < totalPages) {
        loadMoreBtn.show();
      }

      if (images.hits.length < maxElements) {
        loadMoreBtn.hide();
      }

      if (inputValue === '') {
        loader.hide();
        return;
      }
    })

    .catch(error => {
      console.log(error);
      iziToast.error({
        maxWidth: '320px',
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'orange',
        message: 'Error of submit button',
      });
    });
  form.reset();
}

async function handleLoadMore() {
  page += 1;

  try {
    const nextPage = await fetchImages(inputValue, page);
    renderImages(nextPage, imageList);

    const galleryCard = document.querySelector('.gallery li');
    const cardHeight = galleryCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page >= totalPages) {
      loadMoreBtn.hide();
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        maxWidth: '320px',
        backgroundColor: 'orange',
      });
    }
  } catch (err) {
    console.log(err);
    iziToast.error({
      maxWidth: '320px',
      position: 'topRight',
      messageColor: 'white',
      backgroundColor: 'orange',
      message: 'Error of load more button',
    });
  }
}

form.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', async () => {
  loader.show();
  await handleLoadMore();
  loader.hide();
});
