import { useState, useMemo, useCallback, FormEvent, MouseEvent } from "react";
import { MovieCardProps } from "components/MovieCard";
import { SEARCH_APIs } from "services/apiCalls";

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

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

  const handleSearchBarChange = useCallback((value: string) => {
    setHasApiError(false);
    setSearchString(value);
  }, []);

  const fetchMoviesBySearch = () => {
    setIsSearchLoading(true);
    setHasApiError(false);
    SEARCH_APIs.searchWithTitle(searchString)
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
      fetchMoviesBySearch();
    },
    [searchString]
  );

  const onMovieCardClick = (imdbID: string) => {
    setIsMovieDetailsLoading(true);
    setHasApiError(false);
    SEARCH_APIs.searchWithId(imdbID)
      .then((response) => {
        console.log(response.data);
        setClickedMovie(response.data);
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
