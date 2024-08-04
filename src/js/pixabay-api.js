import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  try {
    const res = await axios.get('', {
      params: {
        key: '45125391-2052bf46b2b6e76b78c60a950',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
