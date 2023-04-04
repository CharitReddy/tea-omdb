import { FC } from "react";
import { createPortal } from "react-dom";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Typography } from "@mui/material";
import { MovieDetails } from "pages/Home/useHome";
import { grey } from "@mui/material/colors";

interface DetailsDialogProps {
  open: boolean;
  handleClose: () => void;
  clickedMovie: MovieDetails | null;
}

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
          sx={{ minWidth: "300px" }}>
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
                  style={{ width: "100%", height: 350 }}
                />
              </Grid>
              {Object.entries(clickedMovie as MovieDetails).map(
                ([key, value]) => {
                  if (key === "Ratings") return "";
                  if (key === "Poster") return "";

                  return (
                    <>
                      <Grid item xs={6}>
                        <Typography sx={{ fontWeight: 600, color: grey[500] }}>
                          {key}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
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
