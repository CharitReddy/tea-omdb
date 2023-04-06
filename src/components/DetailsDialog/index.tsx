import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Button,
  Grid,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { MovieDetails } from "common/interfaces";
import transformCases from "utils/transformCases";
import t from "translations";

interface DetailsDialogProps {
  open: boolean;
  handleClose: () => void;
  clickedMovie: MovieDetails | null;
}

const headerText = (
  headerText: string,
  key: string,
  secondaryColor: boolean = false
): ReactNode => (
  <Typography
    sx={{ fontWeight: 600, color: secondaryColor ? undefined : grey[500] }}
    key={key}>
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
      {/*Portal for Dialog/Modal*/}
      {createPortal(
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby={t("scrollDialogTitle")}
          aria-describedby={t("scrollDialogDescription")}
          sx={{ minWidth: "300px" }}
          key={`${clickedMovie?.imdbID}-dialog`}>
          <DialogTitle
            id='scroll-dialog-title'
            key={`${clickedMovie?.imdbID}-title`}>
            {clickedMovie?.Title}
          </DialogTitle>
          <DialogContent dividers={true}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              key={`${clickedMovie?.imdbID}-container`}>
              {/*Movie Poster Image*/}
              <Grid
                item
                xs={12}
                alignItems='center'
                justifyContent='center'
                key={`${clickedMovie?.imdbID}-grid-item`}>
                <img
                  src={
                    clickedMovie?.Poster !== "N/A"
                      ? clickedMovie?.Poster
                      : "/assets/images/image_not_available.png"
                  }
                  style={{ width: "100%", height: 350, objectFit: "contain" }}
                  key={`${clickedMovie?.imdbID}-image`}
                  alt={t("movieDetailsDialogPosterAltText")}
                />
              </Grid>
              {Object.entries(clickedMovie as MovieDetails).map(
                ([key, value]) => {
                  {
                    /*Ratings is an array of ratings, so returning a different JSX to display ratings and common for others*/
                  }
                  if (key === "Ratings")
                    return (
                      <React.Fragment key={`${key}-ratings-${value}`}>
                        {/*Just a header Ratings */}

                        <Grid
                          item
                          xs={6}
                          key={`${clickedMovie?.imdbID}-rating-${value}`}>
                          <hr key={`${clickedMovie?.imdbID}-division`} />
                          {headerText(
                            clickedMovie?.[key]?.length ?? 0 > 0
                              ? t("ratingsHeader")
                              : t("noRatingsHeader"),
                            `${clickedMovie?.imdbID}-header`,
                            true
                          )}
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          key={`${clickedMovie?.imdbID}rating-${value}${key}-emptySpace`}></Grid>
                        {clickedMovie?.[key].map((rating, index) => {
                          {
                            /*Actual ratings containing both source and rating*/
                          }
                          return (
                            <React.Fragment
                              key={`${key}-rating-fragment-${index}`}>
                              <Grid
                                item
                                xs={6}
                                key={`${clickedMovie?.imdbID}-${value}-rating-source`}>
                                {headerText(
                                  rating.Source,
                                  `${clickedMovie?.imdbID}-${value}-header`
                                )}
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                key={`${clickedMovie?.imdbID}-${value}-rating-value`}>
                                {rating.Value}
                              </Grid>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );

                  {
                    /*Poster has already been rendered, so ignoring it */
                  }
                  if (key === "Poster") return;
                  {
                    /*Finally, returning a common JSX of header and information for all other keys */
                  }
                  return (
                    <React.Fragment key={`${key}-${value}-fragment-wrapper`}>
                      <Grid
                        item
                        xs={6}
                        key={`${clickedMovie?.imdbID}-${value}-header-list`}>
                        {headerText(
                          transformCases(key),
                          `${clickedMovie?.imdbID}${value}-header-typography`
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        key={`${clickedMovie?.imdbID}-${value}-value-list`}>
                        {value}
                      </Grid>
                    </React.Fragment>
                  );
                }
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              {t("movieDetailsDialogCloseButton")}
            </Button>
          </DialogActions>
        </Dialog>,
        document.body
      )}
    </>
  );
};

export default DetailsDialog;
