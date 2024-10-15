import { Avatar, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Carousel, { CarouselDots, CarouselArrows, useCarousel } from 'src/components/carousel';

export default function HomeTestimonials() {
  const carousel = useCarousel({
    autoplay: true,
    infinite: true,
    speed: 2000,
    ...CarouselDots({
      rounded: true,
      sx: { mt: 3 },
    }),
  });
  return (
    <Stack sx={{ bgcolor: (theme) => theme.palette.background.neutral, py: 15 }}>
      <Container>
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="overline" color="text.disabled">
            Testimonials
          </Typography>
          <Typography variant="h2" color="info.darker" sx={{ textAlign: 'center' }}>
            Who Love Our Work
          </Typography>
        </Stack>

        <Stack
          sx={{
            position: 'relative',
            mt: 10,
            '& .slick-list': {
              width: { xs: 200, sm: 650, md: 742 },
              mx: 'auto',
              height: { xs: 1, sm: 170 },
            },
          }}
        >
          <CarouselArrows shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
            <Carousel {...carousel.carouselSettings} ref={carousel.carouselRef}>
              <CarouselItem />
              <CarouselItem />
              <CarouselItem />
              <CarouselItem />
            </Carousel>
          </CarouselArrows>
        </Stack>
      </Container>
    </Stack>
  );
}

function CarouselItem() {
  return (
    <Stack
      justifyContent="center"
      alignItems="start"
      direction="row"
      spacing={{ xs: 2, sm: 10 }}
      sx={{ width: 1, height: { xs: 1, sm: 170 } }}
      flexWrap={{ xs: 'wrap', md: 'nowrap' }}
    >
      <Typography sx={{ maxWidth: 450 }}>
        Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I
        appreciate there attitude and approach.
      </Typography>
      <Stack justifyContent="center" alignItems="center">
        <Avatar
          src="/assets/images/home/mock/Testimonials-img.png"
          sx={{ width: { xs: 50, sm: 96 }, height: { xs: 50, sm: 96 }, mb: 2 }}
        />
        <Typography variant="h6">Robert Lee</Typography>
        <Typography variant="body2" color="text.secondary">
          Designer
        </Typography>
      </Stack>
    </Stack>
  );
}
