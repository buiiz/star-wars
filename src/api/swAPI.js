const baseUrl = 'https://swapi.dev/api/';

const fetchData = async (path = '') => {
  const response = await fetch(baseUrl + path);
  const data = await response.json();
  return data;
};

export const fetchFilms = async () => {
  const data = await fetchData('films');
  return data.results;
};
