import apiClient from "./apiClient";

const { get } = apiClient;
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;

export const SEARCH_APIs = {
  searchTitle(searchString: string) {
    return get(`?s=${searchString}&apikey=${omdbApiKey}`);
  },
};
