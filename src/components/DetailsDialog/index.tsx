import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Typography } from "@mui/material";
import { MovieDetails } from "common/interfaces";
import { grey } from "@mui/material/colors";
import t from "translations";

interface DetailsDialogProps {
  open: boolean;
  handleClose: () => void;
  clickedMovie: MovieDetails | null;
}

const headerText = (
  headerText: string,
  secondaryColor: boolean = false
): ReactNode => (
  <Typography
    sx={{ fontWeight: 600, color: secondaryColor ? undefined : grey[500] }}>
    {headerText}
  </Typography>
);

const DetailsDialog: FC<DetailsDialogProps> = ({
  open,
  handleClose,
  clickedMovie,
}) => {
  return (
    <>
      {createPortal(
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby='scroll-dialog-title'
          aria-describedby='scroll-dialog-description'
          sx={{ minWidth: "300px" }}
          key={`${clickedMovie?.imdbID}dialog`}>
          <DialogTitle id='scroll-dialog-title'>
            {clickedMovie?.Title}
          </DialogTitle>
          <DialogContent dividers={true}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} alignItems='center' justifyContent='center'>
                <img
                  src={
                    clickedMovie?.Poster !== "N/A"
                      ? clickedMovie?.Poster
                      : "/assets/images/image_not_available.png"
                  }
                  style={{ width: "100%", height: 350, objectFit: "cover" }}
                />
              </Grid>
              {Object.entries(clickedMovie as MovieDetails).map(
                ([key, value]) => {
                  if (key === "Ratings")
                    return (
                      <>
                        <Grid item xs={6}>
                          <hr />
                          {headerText(t("ratingsHeader"), true)}
                        </Grid>
                        <Grid item xs={6}></Grid>
                        {clickedMovie?.[key].map((rating) => {
                          return (
                            <>
                              <Grid item xs={6}>
                                {headerText(rating.Source)}
                              </Grid>
                              <Grid item xs={6}>
                                {rating.Value}
                              </Grid>
                            </>
                          );
                        })}
                      </>
                    );
                  if (key === "Poster") return;

                  return (
                    <>
                      <Grid item xs={6} key={clickedMovie?.imdbID}>
                        {headerText(key)}
                      </Grid>
                      <Grid item xs={6} key={`${clickedMovie?.imdbID}value`}>
                        {value}
                      </Grid>
                    </>
                  );
                }
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>,
        document.body
      )}
    </>
  );
};

export default DetailsDialog;
