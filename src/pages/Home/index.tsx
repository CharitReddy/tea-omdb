import { useHome } from "./useHome";
import SearchBar from "components/SearchBar";
import MovieCard from "components/MovieCard";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

const Home = () => {
  const { handleSearchBarChange, searchString, onSearchClick, moviesList } =
    useHome();

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
          // width: "100%",
          padding: 2,
          backgroundColor: "red",
        }}>
        <Grid container spacing={2}>
          {moviesList.map((movie) => (
            <Grid
              item
              key={movie.imdbID}
              xs={12}
              sm={12}
              md={3}
              lg={4}
              justifyContent='center'
              alignItems='center'>
              <MovieCard movieData={movie} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default Home;
