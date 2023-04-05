import { FC } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { MovieCardProps } from "common/interfaces";

//Card to display basic details of movie along with poster.
//If the title of a movie exceeds 2 lines, ellipsis is displayed for consistency in card heights
const MovieCard: FC<MovieCardProps> = ({ movieData }) => {
  const { Title, Year, Type, Poster } = movieData;
  return (
    <Card
      sx={{
        margin: "0 auto",
        padding: 0,
        maxWidth: "390px",
        height: "260px",
      }}>
      <CardMedia
        sx={{ height: 140 }}
        title={Title}
        image={
          Poster !== "N/A" ? Poster : "/assets/images/image_not_available.png"
        }
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "90px",
          }}>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}>
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
