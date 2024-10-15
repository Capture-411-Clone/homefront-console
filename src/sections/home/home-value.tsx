import { Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

const SecondaryText = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function HomeValue() {
  const mdDown = useResponsive('down', 'md');

  return (
    <Container sx={{ my: { xs: 5, md: 10 } }}>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
      >
        <Stack direction="row" justifyContent="center">
          <Typography
            variant="h2"
            color="info.darker"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            Bring<SecondaryText> Value</SecondaryText>,{mdDown && <br />} Buy
            <SecondaryText> Value</SecondaryText>
          </Typography>
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 480, textAlign: 'center', mt: 3, mb: 10 }}
        >
          Create a free account and get paid for your old solicitation documents. Buy the
          information contributors provide when you need it, no subscription fees.
        </Typography>
      </Stack>
      <Grid container sx={{ px: { xs: 5, md: 0 } }}>
        <Grid item xs={12} md={4} sx={{ mb: { xs: 4, md: 8 } }}>
          <HomeValueCard title="RFPs/RFQs" icon="/assets/illustrations/home/buyValue/ic_rfp.svg" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mb: { xs: 4, md: 8 } }}>
          <HomeValueCard
            title="Instructions"
            icon="/assets/illustrations/home/buyValue/ic_instructions.svg"
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mb: { xs: 4, md: 8 } }}>
          <HomeValueCard title="SOWs/PWS" icon="/assets/illustrations/home/buyValue/ic_sows.svg" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mb: { xs: 4, md: 8 } }}>
          <HomeValueCard
            title="Pricing Sheets"
            icon="/assets/illustrations/home/buyValue/ic_pricing_sheets.svg"
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mb: { xs: 4, md: 8 } }}>
          <HomeValueCard
            title="Amendments"
            icon="/assets/illustrations/home/buyValue/ic_amendments.svg"
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mb: { xs: 4, md: 8 } }}>
          <HomeValueCard title="Q & A" icon="/assets/illustrations/home/buyValue/ic_q&a.svg" />
        </Grid>
      </Grid>
    </Container>
  );
}

function HomeValueCard({ title, icon }: { title: string; icon: string }) {
  return (
    <Stack
      sx={{
        width: { xs: 1, md: 330 },
        height: 204,
        bgcolor: 'background.contrast',
        borderRadius: 2,
        boxShadow: (theme) => theme.customShadows.card,
      }}
      alignItems="center"
      justifyContent="center"
      spacing={3}
    >
      <Image src={icon} />
      <Typography variant="h5">{title}</Typography>
    </Stack>
  );
}
