import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images, imageList) {
  const markup = images.hits
    .map(
      image => `
     <li>
        <a class="gallery-link" href=${image.largeImageURL}>
          <img src="${image.webformatURL}" alt="${image.tags}">
          <div>
            <p><span>Likes</span>${image.likes}</p>
            <p><span>Views</span>${image.views}</p>    
            <p><span>Comments</span>${image.comments}</p>
            <p><span>Downloads</span>${image.downloads}</p>
          </div>
        </a>
      </li>`
    )
    .join('');

  imageList.insertAdjacentHTML('beforeend', markup);

  let galleryLightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: '250',
  });
  galleryLightbox.refresh();
}

class ButtonCondition {
  constructor(btnElement, hiddenClass) {
    this.btnElement = btnElement;
    this.hiddenClass = hiddenClass;
  }
  hide() {
    this.btnElement.classList.add(this.hiddenClass);
  }
  show() {
    this.btnElement.classList.remove(this.hiddenClass);
  }
}

class LoaderCondition {
  constructor(loaderEl, hideClass) {
    this.loaderEl = loaderEl;
    this.hideClass = hideClass;
  }
  hide() {
    this.loaderEl.classList.add(this.hideClass);
  }
  show() {
    this.loaderEl.classList.remove(this.hideClass);
  }
}

export { ButtonCondition, LoaderCondition };
