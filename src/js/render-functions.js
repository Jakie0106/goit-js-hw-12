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
