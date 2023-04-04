import { useState, useMemo, useCallback } from "react";
import { MovieCardProps } from "components/MovieCard";
import { SEARCH_APIs } from "services/apiCalls";

export const useHome = () => {
  const [searchString, setSearchString] = useState("");
  const [moviesList, setMoviesList] = useState<MovieCardProps["movieData"][]>(
    []
  );
  const [error, setError] = useState("");
  const onSearchClick = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      SEARCH_APIs.searchWithTitle(searchString)
        .then((response) => {
          console.log(response.data);
          const { Search, Response, Error } = response.data;
          if (Response === "True") {
            setMoviesList(Search);
          } else {
            setError(Error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [searchString]
  );

  const handleSearchBarChange = useCallback((value: string) => {
    setSearchString(value);
  }, []);
  return useMemo(
    () => ({
      handleSearchBarChange,
      searchString,
      onSearchClick,
      moviesList,
    }),
    [handleSearchBarChange, searchString, onSearchClick, moviesList]
  );
};
