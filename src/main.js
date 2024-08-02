import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputField = document.querySelector('.input');
const imageList = document.querySelector('.gallery');
const spinLoader = document.querySelector('.spin-loader');

function handleSubmit(event) {
  event.preventDefault();

  imageList.innerHTML = '';
  spinLoader.classList.remove('visually-hidden');

  const inputValue = inputField.value.trim();
  if (inputValue === '') {
    spinLoader.classList.add('visually-hidden');
    return;
  }

  fetchImages(inputValue)
    .then(images => {
      spinLoader.classList.add('visually-hidden');
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
        spinLoader.classList.add('visually-hidden');
        renderImages(images, imageList);
      }
    })
    .catch(error => {
      console.error(error);
    });
  form.reset();
}

form.addEventListener('submit', handleSubmit);
