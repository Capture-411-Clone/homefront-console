import { Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

const InfoText = styled('span')(({ theme }) => ({
  color: theme.palette.info.darker,
}));

export default function HowItWorkSample() {
  const mdDown = useResponsive('down', 'md');

  return (
    <Container sx={{ py: 15 }}>
      <Stack spacing={10} sx={{ position: 'relative' }}>
        {!mdDown && (
          <Image
            src="/assets/illustrations/home/howItWorks/ic_up_arrow.svg"
            sx={{ position: 'absolute', top: 170, left: 130 }}
          />
        )}
        {!mdDown && (
          <Image
            src="/assets/illustrations/home/howItWorks/ic_down_arrow.svg"
            sx={{ position: 'absolute', top: 290, left: 130 }}
          />
        )}
        <Typography
          variant="h2"
          color="error.main"
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          Simple<InfoText>.</InfoText>
        </Typography>
        {!mdDown ? (
          <Stack direction="row" spacing={9} alignItems="center">
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ minWidth: { md: 150, lg: 213 } }}
            >
              Create an account to get access to the database
            </Typography>
            <Stack spacing={7.5}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ width: { md: 180, lg: 233 } }}
                >
                  Contribute your old solicitation documents you don’t need
                </Typography>
                <Image
                  src="/assets/illustrations/home/howItWorks/ic_straight_arrow.svg"
                  width={44}
                />
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ width: { md: 180, lg: 251 } }}
                >
                  Track how many people have bought your solicitation documents
                </Typography>
                <Image
                  src="/assets/illustrations/home/howItWorks/ic_straight_arrow.svg"
                  width={44}
                />

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ width: { md: 180, lg: 251 } }}
                >
                  Receive quarterly payments from your sales
                </Typography>
              </Stack>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ width: { md: 180, lg: 233 } }}
                >
                  Search for old solicitation documents others contributed
                </Typography>
                <Image
                  src="/assets/illustrations/home/howItWorks/ic_straight_arrow.svg"
                  width={44}
                />
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ width: { md: 180, lg: 251 } }}
                >
                  Buy only the solicitations you need, no subscription needed
                </Typography>
                <Image
                  src="/assets/illustrations/home/howItWorks/ic_straight_arrow.svg"
                  width={44}
                />

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ width: { md: 180, lg: 251 } }}
                >
                  Download your documents or house them in your Capture 411 pipeline list
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Stack alignItems="center" spacing={{ xs: 1, md: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Create an account to get access to the database
            </Typography>
            <Stack direction="row" spacing={{ xs: 15, sm: 30 }}>
              <Image src="/assets/illustrations/home/howItWorks/ic_horizontal_arrow.svg" />
              <Image src="/assets/illustrations/home/howItWorks/ic_horizontal_arrow.svg" />
            </Stack>
            <Stack direction="row" spacing={{ xs: 2, sm: 10, md: 15 }} justifyContent="center">
              <Stack spacing={2} alignItems="center">
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    width: { xs: 120, sm: 180 },
                    textAlign: 'center',
                  }}
                >
                  Contribute your old solicitation documents you don’t need
                </Typography>
                <Image
                  src="/assets/illustrations/home/howItWorks/ic_horizontal_arrow.svg"
                  width={10}
                />
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    width: { xs: 120, sm: 180 },
                    textAlign: 'center',
                  }}
                >
                  Track how many people have bought your solicitation documents
                </Typography>
                <Image
                  src="/assets/illustrations/home/howItWorks/ic_horizontal_arrow.svg"
                  width={10}
                />

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    width: { xs: 120, sm: 180 },
                    textAlign: 'center',
                  }}
                >
                  Receive quarterly payments from your sales
                </Typography>
              </Stack>
              <Stack spacing={2} alignItems="center">
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    width: { xs: 120, sm: 180 },
                    textAlign: 'center',
                  }}
                >
                  Contribute your old solicitation documents you don’t need
                </Typography>
                <Image
                  src="/assets/illustrations/home/howItWorks/ic_horizontal_arrow.svg"
                  width={10}
                />
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    width: { xs: 120, sm: 180 },
                    textAlign: 'center',
                  }}
                >
                  Track how many people have bought your solicitation documents
                </Typography>
                <Image
                  src="/assets/illustrations/home/howItWorks/ic_horizontal_arrow.svg"
                  width={10}
                />

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    width: { xs: 120, sm: 180 },
                    textAlign: 'center',
                  }}
                >
                  Receive quarterly payments from your sales
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
        <Stack alignItems="center" spacing={5} sx={{ px: { xs: 5, md: 0 } }}>
          <Typography variant="h3" color="info.darker">
            Other Features
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" alignItems="start" spacing={1}>
                <Iconify icon="eva:search-fill" color="primary.main" minHeight={32} minWidth={32} />
                <Typography variant="subtitle1" color="text.secondary">
                  Request a solicitation you need if you don’t find it in the database
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" alignItems="start" spacing={1}>
                <Iconify
                  icon="iconoir:three-stars"
                  color="error.main"
                  minHeight={32}
                  minWidth={32}
                />
                <Typography variant="subtitle1" color="text.secondary">
                  Keep track of your interests and create a wishlist
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" alignItems="start" spacing={1}>
                <Iconify icon="ooui:robot" color="info.light" minHeight={32} minWidth={32} />
                <Typography variant="subtitle1" color="text.secondary">
                  AI helps contributors find the metadata needed for the database
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" alignItems="start" spacing={1}>
                <Iconify icon="mi:user" color="error.main" minHeight={32} minWidth={32} />
                <Typography variant="subtitle1" color="text.secondary">
                  Create a personal account or a business account
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
}
