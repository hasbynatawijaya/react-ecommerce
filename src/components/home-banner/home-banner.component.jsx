import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { withRouter } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import PuddingOne from "../../assets/puding/1.png";
import PuddingTwo from "../../assets/puding/2.png";
import PuddingThree from "../../assets/puding/3.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    button: {
      backgroundColor: "#f74902",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "20px",
      border: "none",
      borderRadius: "16px",
      padding: "12px 48px",

      "&:hover": {
        backgroundColor: "#f77b48",
      },
    },
  })
);

const HomeBanner = ({ history }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item md={6}>
        <Box mb={2}>
          <Typography variant="h1">Dapatkan</Typography>
          <Typography variant="h1">Sekarang</Typography>
          <Typography variant="h1">Juga</Typography>
        </Box>
        <Box>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={() => history.push("/shop")}
          >
            Beli sekarang
          </Button>
        </Box>
      </Grid>
      <Grid item md={6}>
        <img width={"100%"} src={PuddingOne} />
      </Grid>
    </Grid>
  );
};

export default withRouter(HomeBanner);
