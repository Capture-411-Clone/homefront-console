import { Box, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

const RoadStyle = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: theme.palette.grey[700],
  height: 150,
  zIndex: 1,
  width: '100%',
}));

const RoadLineStyle = styled(Stack)(({ theme }) => ({
  background: theme.palette.common.white,
  width: 200,
  height: 16,
  zIndex: 1,

  [theme.breakpoints.up('lg')]: {
    width: 400,
    height: 16,
  },
}));

const CardStyle = styled(Stack)(({ theme }) => ({
  width: 57,
  height: 57,
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    width: 100,
    height: 100,
  },
}));

export default function HomeDriveDown() {
  const smDown = useResponsive('down', 'sm');
  return (
    <Stack
      sx={{
        bgcolor: (theme) => theme.palette.background.neutral,
        py: 10,
        position: 'relative',
      }}
      spacing={{ xs: 5, md: 25 }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: 335,
          top: 70,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Image src="/assets/illustrations/home/drivenDown/Mark.svg" />
      </Box>
      <Stack alignItems="center">
        <Typography variant="h2" color="info.darker" sx={{ zIndex: 2 }}>
          Drive Down
        </Typography>
      </Stack>
      {!smDown ? (
        <Stack sx={{ position: 'relative' }}>
          <RoadStyle alignItems="center" direction="row" justifyContent="space-around">
            <RoadLineStyle />
            <RoadLineStyle />
            <RoadLineStyle />
          </RoadStyle>
          <Container sx={{ zIndex: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack alignItems="center" sx={{ mt: 3 }} spacing={5}>
                <CardStyle>
                  <Image
                    src="/assets/illustrations/home/drivenDown/workload.svg"
                    height={1}
                    width={1}
                  />
                </CardStyle>
                <Typography variant="h4">Workload</Typography>
              </Stack>
              <Stack alignItems="center" sx={{ mt: 3 }} spacing={5}>
                <CardStyle>
                  <Image
                    src="/assets/illustrations/home/drivenDown/cost.svg"
                    height={1}
                    width={1}
                  />
                </CardStyle>
                <Typography variant="h4">Cost</Typography>
              </Stack>
              <Stack sx={{ mt: -6 }}>
                <Image src="/assets/images/home/driveDown/car.png" width={182} height={182} />
              </Stack>
            </Stack>
          </Container>
          <Box
            sx={{
              position: 'absolute',
              right: { xs: 60, md: 250 },
              bottom: 190,
              zIndex: 0,
            }}
          >
            <Image src="/assets/illustrations/home/drivenDown/sign.svg" width={159} />
          </Box>
        </Stack>
      ) : (
        <Stack sx={{ position: 'relative' }} direction="row-reverse">
          <Image
            src="/assets/illustrations/home/drivenDown/Road.svg"
            sx={{ transform: 'rotate(180deg)', zIndex: 1 }}
            width={375}
          />
          <Stack
            alignItems="center"
            sx={{ position: 'absolute', right: '10%', top: '1%', zIndex: 1 }}
            spacing={3}
          >
            <Image src="/assets/illustrations/home/drivenDown/workload.svg" />

            <Typography variant="h4">Workload</Typography>
          </Stack>
          <Stack
            alignItems="center"
            sx={{ position: 'absolute', right: '35%', top: '30%', zIndex: 1 }}
            spacing={3}
          >
            <Image src="/assets/illustrations/home/drivenDown/cost.svg" />
            <Typography variant="h4">Cost</Typography>
          </Stack>
          <Stack
            alignItems="center"
            sx={{
              position: 'absolute',
              right: '25%',
              bottom: '-1.5%',
              zIndex: 1,
            }}
          >
            <Image src="/assets/images/home/driveDown/car.png" width={102} />
          </Stack>
          <Box
            sx={{
              position: 'absolute',
              right: '5%',
              bottom: '13%',
              zIndex: 0,
            }}
          >
            <Image src="/assets/illustrations/home/drivenDown/sign.svg" width={81} />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
