import { useState, useMemo, useCallback, FormEvent, useEffect } from "react";
import { MovieCardProps } from "common/interfaces";
import { SEARCH_APIs } from "services/apiCalls";
import debounce from "utils/debounce";
import { MovieDetails } from "common/interfaces";
import calculateTotalPages from "utils/calculateTotalPages";

const DEBOUNCE_TIMER = 1000;
const OMDB_PAGE_SIZE = 10;
const START_PAGE = 1;
const INITIAL_ERROR_MSG = "";
const EMPTY_SEARCH_STRING = "";

export const useHome = () => {
  const [searchString, setSearchString] = useState(EMPTY_SEARCH_STRING);
  const [moviesList, setMoviesList] = useState<MovieCardProps["movieData"][]>(
    []
  );
  const [clickedMovie, setClickedMovie] = useState<MovieDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState(INITIAL_ERROR_MSG);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isMovieDetailsLoading, setIsMovieDetailsLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [showMovieDetailsDialog, setShowMovieDetailsDialog] = useState(false);
  const [page, setPage] = useState(START_PAGE);
  const [totalPages, setTotalPages] = useState(START_PAGE);

  useEffect(() => {
    debouncedFetchMoviesBySearch(searchString, page);
  }, [page]);

  const handleSearchBarChange = useCallback((value: string) => {
    setHasApiError(false);
    setSearchString(value);
    setPage(START_PAGE);
    debouncedFetchMoviesBySearch(value, START_PAGE);
  }, []);

  const fetchMoviesBySearch = (searchTerm: string, pageNumber: number) => {
    setHasApiError(false);
    if (searchTerm.trim() === EMPTY_SEARCH_STRING) {
      setMoviesList([]);
      setPage(START_PAGE);
      setIsSearchLoading(false);
      return;
    }
    setIsSearchLoading(true);

    SEARCH_APIs.searchWithTitle(searchTerm, pageNumber)
      .then((response) => {
        const { totalResults, Search, Response, Error } = response.data;
        if (Response === "True") {
          setTotalPages(calculateTotalPages(+totalResults, OMDB_PAGE_SIZE));
          setMoviesList(Search);
        } else {
          setHasApiError(true);
          setErrorMessage(Error);
          setMoviesList([]);
        }
      })
      .catch((error) => {
        setHasApiError(true);
        setMoviesList([]);
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };

  const onSearchClick = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setPage(START_PAGE);
    },
    [searchString]
  );

  const debouncedFetchMoviesBySearch = useCallback(
    debounce(fetchMoviesBySearch, DEBOUNCE_TIMER),
    []
  );

  const onMovieCardClick = (imdbID: string) => {
    setIsMovieDetailsLoading(true);
    setHasApiError(false);
    SEARCH_APIs.searchWithId(imdbID)
      .then((response) => {
        let responseMovie = response.data;
        const keyToShift = "Ratings";
        const valueToShift = responseMovie[keyToShift];
        delete responseMovie[keyToShift];
        responseMovie[keyToShift] = valueToShift;
        setClickedMovie(responseMovie);
        setShowMovieDetailsDialog(true);
      })
      .catch((error) => {
        setHasApiError(true);
      })
      .finally(() => {
        setIsMovieDetailsLoading(false);
      });
  };

  const handleDetailsClose = useCallback(() => {
    setShowMovieDetailsDialog(false);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchString(EMPTY_SEARCH_STRING);
    setMoviesList([]);
  }, []);

  return useMemo(
    () => ({
      handleSearchBarChange,
      searchString,
      onSearchClick,
      moviesList,
      onMovieCardClick,
      clickedMovie,
      isSearchLoading,
      isMovieDetailsLoading,
      hasApiError,
      errorMessage,
      showMovieDetailsDialog,
      handleDetailsClose,
      handleClearSearch,
      page,
      setPage,
      totalPages,
    }),
    [
      handleSearchBarChange,
      searchString,
      onSearchClick,
      moviesList,
      onMovieCardClick,
      clickedMovie,
      isSearchLoading,
      isMovieDetailsLoading,
      hasApiError,
      errorMessage,
      showMovieDetailsDialog,
      handleDetailsClose,
      handleClearSearch,
      page,
      setPage,
      totalPages,
    ]
  );
};
