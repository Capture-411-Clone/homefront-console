'use client';

import { useScroll } from 'framer-motion';
// layouts
import MainLayout from 'src/layouts/main';
import { Box, Container, Stack } from '@mui/material';
// components
import ScrollProgress from 'src/components/scroll-progress';
import ContactSignUp from 'src/components/early-access/contact-sign-up';
import { useAuthContext } from 'src/auth/hooks';
import HomeHero from '../home-hero';
import HomeDriveDown from '../home-drive-down';
import HomeValue from '../home-value';
import HomeOurPricing from '../home-our-pricing';
import HomeOurService from '../home-our-service';
// import HomeTestimonials from '../home-testimonials';
import HomeFaq from '../home-faq';
//

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  const { authenticated } = useAuthContext();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />

      <Box sx={{ mt: { xs: 0, md: 112 } }}>
        <HomeDriveDown />
        <HomeValue />
        <HomeOurPricing />
        <HomeOurService />
        {/* <HomeTestimonials /> */}
        <HomeFaq />
      </Box>
      {!authenticated && (
        <Stack sx={{ bgcolor: 'background.neutral', height: 250 }} justifyContent="center">
          <Container>
            <ContactSignUp />
          </Container>
        </Stack>
      )}
    </MainLayout>
  );
}
