import { Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import React from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import { paths } from 'src/routes/paths';

const RootStyle = styled('span')(({ theme }) => ({
  background: theme.palette.background.neutral,
  padding: theme.spacing(5, 3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const InfoText = styled('span')(({ theme }) => ({
  color: theme.palette.info.darker,
}));

const BoldText = styled('span')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.info.darker,
}));

export default function GetPaidEasy() {
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();

  const handleGetPaid = () => {
    router.push(paths.dashboard.opportunity.root);
  };
  return (
    <RootStyle>
      <Container>
        <Stack spacing={5}>
          <Typography
            variant="h2"
            color="error.main"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            Easy<InfoText>.</InfoText>
          </Typography>
          <Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              By leveraging the latest A.I. technology we’ve simplified
              {mdUp && <br />} the process to contribute. Easy process, easy money.
            </Typography>
          </Box>
        </Stack>
        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={12} md={5}>
            <Stack spacing={3} sx={{ alignItems: { xs: 'center', md: 'start' } }}>
              <Typography variant="h2" color="info.darker">
                A.I. Powered
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: { xs: 'center', md: 'left' } }}
              >
                The Capture 411 A.I. was engineered to help you cut your time contributing to the
                legacy solicitation database. All you need are the documents, our A.I. pulls out the
                metadata needed to help users search the marketplace and buy your contributions.
              </Typography>
              <Box
                sx={{
                  width: 1,
                  mt: 3,
                  mb: {
                    xs: 3,
                    md: 0,
                  },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Button variant="contained" color="primary" onClick={handleGetPaid}>
                  Get Paid
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={6}>
            <Stack spacing={5}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                <Typography
                  variant="h2"
                  color="info.darker"
                  sx={{
                    textAlign: 'center',
                    minWidth: { xs: 50, md: 100 },
                  }}
                >
                  0.5
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary">
                  <BoldText>Time:</BoldText> approximate minutes it takes to upload one solicitation
                  package using A.I.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                <Typography
                  variant="h2"
                  color="info.darker"
                  sx={{
                    textAlign: 'center',
                    minWidth: { xs: 50, md: 100 },
                  }}
                >
                  120
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary">
                  <BoldText>Data:</BoldText> approximate number of solicitation document packages
                  you can upload in one hour
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
                <Typography
                  variant="h2"
                  color="info.darker"
                  sx={{
                    textAlign: 'center',
                    minWidth: { xs: 50, md: 100 },
                  }}
                >
                  26K
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary">
                  <BoldText>Pay out:</BoldText> potential profit for each hour contributing
                  solicitation documents
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
