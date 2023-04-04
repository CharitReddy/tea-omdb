import { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export interface MovieCardProps {
  movieData: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  };
}

const MovieCard: FC<MovieCardProps> = ({ movieData }) => {
  const { Title, Year, imdbID, Type, Poster } = movieData;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} title={Title} image={Poster} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {Title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant='body2'>{Type}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {Year}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
