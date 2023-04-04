import { FC } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
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
  const { Title, Year, Type, Poster } = movieData;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        title={Title}
        image={
          Poster !== "N/A" ? Poster : "/assets/images/image_not_available.png"
        }
      />
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
