import { useHome } from "./useHome";
import SearchBar from "components/SearchBar";
import MovieCard from "components/MovieCard";
import { Grid, Paper, Skeleton, CircularProgress } from "@mui/material";

const Home = () => {
  const {
    handleSearchBarChange,
    searchString,
    onSearchClick,
    moviesList,
    onMovieCardClick,
    isSearchLoading,
    isMovieDetailsLoading,
  } = useHome();

  return (
    <>
      <SearchBar
        handleChange={handleSearchBarChange}
        value={searchString}
        onSearchClick={onSearchClick}
      />
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          // backgroundColor: "red",
        }}>
        {isSearchLoading ? (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          <Grid
            container
            spacing={2}
            justifyContent='center'
            sx={{ margin: "auto" }}>
            {moviesList.map((movie) => (
              <Grid
                item
                key={movie.imdbID}
                xs={12}
                sm={12}
                md={3}
                lg={4}
                justifyContent='center'
                alignItems='center'
                component='div'
                onClick={() => onMovieCardClick(movie.imdbID)}>
                <MovieCard movieData={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
      {console.log(isMovieDetailsLoading)}
      {isMovieDetailsLoading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
};

export default Home;
