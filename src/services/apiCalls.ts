import apiClient from "services/apiClient";

const { get } = apiClient;
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;

export const SEARCH_APIs = {
  searchWithTitle(searchString: string, pageNumber: number) {
    return get(`?s=${searchString}&page=${pageNumber}&apikey=${omdbApiKey}`);
  },
  searchWithId(searchId: string) {
    return get(`?i=${searchId}&apikey=${omdbApiKey}`);
  },
};
