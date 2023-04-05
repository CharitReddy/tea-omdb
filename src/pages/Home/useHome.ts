import { useState, useMemo, useCallback, FormEvent, MouseEvent } from "react";
import { MovieCardProps } from "common/interfaces";
import { SEARCH_APIs } from "services/apiCalls";
import debounce from "utils/debounce";
import { MovieDetails } from "common/interfaces";

const DEBOUNCE_TIMER = 1000;

export const useHome = () => {
  const [searchString, setSearchString] = useState("");
  const [moviesList, setMoviesList] = useState<MovieCardProps["movieData"][]>(
    []
  );
  const [clickedMovie, setClickedMovie] = useState<MovieDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isMovieDetailsLoading, setIsMovieDetailsLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [showMovieDetailsDialog, setShowMovieDetailsDialog] = useState(false);

  const handleSearchBarChange = useCallback(
    (value: string) => {
      setHasApiError(false);
      setSearchString(value);
      debouncedFetchMoviesBySearch(value);
    },
    [searchString]
  );

  const fetchMoviesBySearch = (searchTerm: string) => {
    setIsSearchLoading(true);
    setHasApiError(false);
    SEARCH_APIs.searchWithTitle(searchTerm)
      .then((response) => {
        console.log(response.data);
        const { Search, Response, Error } = response.data;
        if (Response === "True") {
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
        console.log(error);
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };

  const onSearchClick = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      fetchMoviesBySearch(searchString);
    },
    [searchString]
  );

  const debouncedFetchMoviesBySearch = debounce(
    fetchMoviesBySearch,
    DEBOUNCE_TIMER
  );

  const onMovieCardClick = (imdbID: string) => {
    setIsMovieDetailsLoading(true);
    setHasApiError(false);
    SEARCH_APIs.searchWithId(imdbID)
      .then((response) => {
        console.log(response.data);
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
    setSearchString("");
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
    ]
  );
};
