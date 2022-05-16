import React from 'react';
import { Box } from '@mui/material';

import Contact from '../components/landing-page/sections/Contact';
import Header from '../components/landing-page/sections/Header';
import Pricing from '../components/landing-page/sections/Pricing';
import Services from '../components/landing-page/sections/Services';
import Footer from '../components/landing-page/sections/Footer';
import FadeInSection from '../components/utils/FadeInSection';

const LandingPage = () => (
  <Box>
    <FadeInSection>
      <Header />
    </FadeInSection>
    <FadeInSection>
      <Services />
    </FadeInSection>
    <FadeInSection>
      <Pricing />
    </FadeInSection>
    <FadeInSection>
      <Contact />
    </FadeInSection>
    <Footer />
  </Box>
);

export default LandingPage;
