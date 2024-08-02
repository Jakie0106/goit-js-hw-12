const API_KEY = '45125391-2052bf46b2b6e76b78c60a950';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  const paramsToSearch = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${paramsToSearch}`).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}
