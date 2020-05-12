import { URL } from '../constants';

function getImageUrl(id) {
  return URL.GET_POKEMON_IMAGE + id + '.png';
}

function getId(url) {
  const startIndex = url.indexOf('/pokemon/') + 9;
  const endIndex = url.lastIndexOf('/');
  const id = url.slice(startIndex, endIndex);
  return id;
}

export { getImageUrl, getId };
