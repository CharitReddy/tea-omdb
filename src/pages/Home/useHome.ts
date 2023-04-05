import { useState, useMemo, useCallback, FormEvent, useEffect } from "react";
import { MovieCardProps } from "common/interfaces";
import { SEARCH_APIs } from "services/apiCalls";
import debounce from "utils/debounce";
import { MovieDetails } from "common/interfaces";
import calculateTotalPages from "utils/calculateTotalPages";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    debouncedFetchMoviesBySearch(searchString, page);
  }, [page]);

  const handleSearchBarChange = (value: string) => {
    setHasApiError(false);
    setSearchString(value);
    setPage(1);
    debouncedFetchMoviesBySearch(value, 1);
  };

  const fetchMoviesBySearch = (searchTerm: string, pageNumber: number) => {
    setHasApiError(false);
    if (searchTerm.trim() === "") {
      setMoviesList([]);
      setPage(1);
      setIsSearchLoading(false);
      return;
    }
    setIsSearchLoading(true);

    SEARCH_APIs.searchWithTitle(searchTerm, pageNumber)
      .then((response) => {
        console.log(response.data);
        const { totalResults, Search, Response, Error } = response.data;
        if (Response === "True") {
          setTotalPages(calculateTotalPages(+totalResults, 10));
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
      setPage(1);
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
