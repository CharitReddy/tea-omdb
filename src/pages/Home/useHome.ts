import { useState, useMemo, useCallback, FormEvent, MouseEvent } from "react";
import { MovieCardProps } from "components/MovieCard";
import { SEARCH_APIs } from "services/apiCalls";

interface MovieDetails {
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

  const handleSearchBarChange = useCallback((value: string) => {
    setHasApiError(false);
    setSearchString(value);
  }, []);

  const onSearchClick = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      setIsSearchLoading(true);
      event.preventDefault();
      SEARCH_APIs.searchWithTitle(searchString)
        .then((response) => {
          console.log(response.data);
          const { Search, Response, Error } = response.data;
          if (Response === "True") {
            setMoviesList(Search);
          } else {
            setErrorMessage(Error);
          }
        })
        .catch((error) => {
          setHasApiError(true);
          console.log(error);
        })
        .finally(() => {
          setIsSearchLoading(false);
        });
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
      })
      .catch((error) => {
        setHasApiError(true);
      })
      .finally(() => {
        setIsMovieDetailsLoading(false);
      });
  };

  return useMemo(
    () => ({
      handleSearchBarChange,
      searchString,
      onSearchClick,
      moviesList,
      onMovieCardClick,
      isSearchLoading,
      isMovieDetailsLoading,
      hasApiError,
      errorMessage,
    }),
    [
      handleSearchBarChange,
      searchString,
      onSearchClick,
      moviesList,
      onMovieCardClick,
      isSearchLoading,
      isMovieDetailsLoading,
      hasApiError,
      errorMessage,
    ]
  );
};
