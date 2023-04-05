import { useHome } from "./useHome";
import SearchBar from "components/SearchBar";
import MovieCard from "components/MovieCard";
import {
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import CustomPagination from "components/CustomPagination";
import DetailsDialog from "components/DetailsDialog";
import t from "translations";

const Home = () => {
  const {
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
  } = useHome();

  return (
    <>
      <SearchBar
        handleChange={handleSearchBarChange}
        value={searchString}
        onSearchClick={onSearchClick}
        handleClearSearch={handleClearSearch}
      />
      {hasApiError && (
        <Alert severity='error'>
          {errorMessage || t("genericErrorMessage")}
        </Alert>
      )}
      {!searchString && (
        <Typography variant='h3' gutterBottom>
          {t("homeScreenStaticMessage")}
        </Typography>
      )}
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          minHeight: "calc(100vh - 180px)",
          flexDirection: "column",
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
          <Grid container rowSpacing={4}>
            {moviesList.map((movie) => (
              <Grid
                item
                key={movie.imdbID}
                xs={12}
                sm={10}
                md={5}
                lg={4}
                onClick={() => onMovieCardClick(movie.imdbID)}>
                <MovieCard movieData={movie} />
              </Grid>
            ))}
          </Grid>
        )}
        {!!moviesList?.length && (
          <CustomPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
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
      {clickedMovie && (
        <DetailsDialog
          open={showMovieDetailsDialog}
          handleClose={handleDetailsClose}
          clickedMovie={clickedMovie}
        />
      )}
    </>
  );
};

export default Home;
