import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import Image from 'src/components/image';

export default function HomeOurService() {
  return (
    <Container sx={{ my: 10, height: { xs: 1, md: 550 } }}>
      <Stack spacing={3} sx={{ mb: 5, position: 'relative' }}>
        {/* <Typography
          variant="overline"
          color="text.disabled"
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          Our Services
        </Typography> */}
        <Box>
          <Typography
            variant="h2"
            color="info.darker"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            What You Get
          </Typography>
        </Box>
        <Typography
          sx={{ maxWidth: 480, textAlign: { xs: 'center', md: 'left' } }}
          variant="body1"
          color="text.secondary"
        >
          Leverage a unique opportunity to find and use historical solicitation documents to give
          you the upper hand while capturing your pipeline in the federal government space.
        </Typography>
      </Stack>
      <Grid container>
        <Grid item xs={12} md={3}>
          <ServiceCard
            title="Bid Intelligence Database"
            subtitle="Buy legacy RFPs to fill in your information gaps "
            icon="/assets/illustrations/home/service/ic_bid_intelligence_database.svg"
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ServiceCard
            title="Collaborative Contribution"
            subtitle="Contribute solicitation
            documents, buy solicitation
            documents, make money"
            icon="/assets/illustrations/home/service/ic_collaborative_contribution.svg"
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ServiceCard
            title="Strategic Insight"
            subtitle="Reduce costs, enhance efficiency and effectiveness"
            icon="/assets/illustrations/home/service/ic_strategic_insight.svg"
            color="error.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ServiceCard
            title="Market Edge"
            subtitle="Achieve wins and build vital partnerships"
            icon="/assets/illustrations/home/service/ic_market_edge.svg"
            color="error.light"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

interface ServiceCardProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

function ServiceCard({ title, subtitle, icon, color }: ServiceCardProps) {
  return (
    <Stack
      sx={{
        width: { xs: 1, md: 264 },
        height: 328,
        borderRadius: 2,
        background: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.customShadows.z8,
        p: 5,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        mb: { xs: 5, md: 0 },
        '&:hover': {
          height: { xs: 328, md: 476 },
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Image src={icon} width={88} height={88} />
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
}
