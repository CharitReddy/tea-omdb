import { useHome } from "pages/Home/useHome";
import {
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import SearchBar from "components/SearchBar";
import MovieCard from "components/MovieCard";
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

  //Displays a search bar on the top, a card grid of 10 movies when searched.
  //Opens a dialog with all details of movie when clicked.
  //Pagination on the bottom to view all results.

  /*Search is triggered when:
   * Input is provided - Debounced function, 1s gap between 2 key strokes.
   * Search button click/enter key press.
   * Empty search term is ignored.
   */

  //Displays loaders when any API call is being made.
  //Shows error message on top in case of API error or invalid request.
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
