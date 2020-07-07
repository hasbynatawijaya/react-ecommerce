import React from "react";

import { HomePageContainer } from "./homepage.styles";

import Video from "../../assets/puding/WhatsApp Video 2020-07-06 at 07.46.24.mp4";

import HomeBanner from "../../components/home-banner/home-banner.component";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const HomePage = () => (
  <HomePageContainer>
    {/* <Directory /> */}
    <HomeBanner />
    <Box mt={4} mb={4}>
      <Typography variant="h3">Cara membuat pudding</Typography>
    </Box>
    <Box mb={6}>
      <video src={Video} controls="controls" />
    </Box>
  </HomePageContainer>
);

export default HomePage;
