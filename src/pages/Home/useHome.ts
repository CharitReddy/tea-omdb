import { useState, useMemo, useCallback, FormEvent, useEffect } from "react";
import { MovieCardProps } from "common/interfaces";
import { SEARCH_APIs } from "services/apiCalls";
import debounce from "utils/debounce";
import { MovieDetails } from "common/interfaces";
import calculateTotalPages from "utils/calculateTotalPages";

//Constant values being used.
const DEBOUNCE_TIMER = 1000;
const OMDB_PAGE_SIZE = 10;
const START_PAGE = 1;
const INITIAL_ERROR_MSG = "";
const EMPTY_SEARCH_STRING = "";

export const useHome = () => {
  //States for tracking search term, page numbers, API load and error states, and maintaining list of movies and data of individual movies, and controlling components to be viewed/hidden.
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

  //To trigger Search API call when new page is clicked
  useEffect(() => {
    debouncedFetchMoviesBySearch(searchString, page);
  }, [page]);

  //Debounced function to trigger Search API call when input is entered with a delay of 1s.
  const handleSearchBarChange = useCallback((value: string) => {
    setHasApiError(false);
    setSearchString(value);
    setPage(START_PAGE);
    debouncedFetchMoviesBySearch(value, START_PAGE);
  }, []);

  //API call for searching and fetching list of 10 movies based on search term and page number.
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
        //If the search term is valid and provides results.
        if (Response === "True") {
          setTotalPages(calculateTotalPages(+totalResults, OMDB_PAGE_SIZE));
          setMoviesList(Search);
        } else {
          //If API call succeeds but search term does not provide any results
          setHasApiError(true);
          setErrorMessage(Error);
          setMoviesList([]);
        }
      })
      //API Call failure
      .catch((error) => {
        setHasApiError(true);
        setMoviesList([]);
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };

  //Triggering API call when enter/search button is clicked.
  const onSearchClick = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setPage(START_PAGE);
    },
    [searchString]
  );

  //Debounced version of the Search API function.
  const debouncedFetchMoviesBySearch = useCallback(
    debounce(fetchMoviesBySearch, DEBOUNCE_TIMER),
    []
  );

  //API Call by ID when a movie card is clicked.
  const onMovieCardClick = (imdbID: string) => {
    setIsMovieDetailsLoading(true);
    setHasApiError(false);
    SEARCH_APIs.searchWithId(imdbID)
      .then((response) => {
        //Deleting the Response attribute since it is not part of movie details.
        let responseMovie = response.data;
        delete responseMovie["Response"];
        //Shifting the Ratings attribute to end to display ratings at the bottom in the Dialog/Modal.
        const keyToShift = "Ratings";
        const valueToShift = responseMovie[keyToShift];
        delete responseMovie[keyToShift];
        responseMovie[keyToShift] = valueToShift;

        setClickedMovie(responseMovie);
        setShowMovieDetailsDialog(true);
      })
      //API Call failure
      .catch((error) => {
        setHasApiError(true);
      })
      .finally(() => {
        setIsMovieDetailsLoading(false);
      });
  };

  //Closing the Dialog/Modal on clicking the close button or outside the dialog/modal.
  const handleDetailsClose = useCallback(() => {
    setShowMovieDetailsDialog(false);
  }, []);

  //On clicking clear search field button.
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
