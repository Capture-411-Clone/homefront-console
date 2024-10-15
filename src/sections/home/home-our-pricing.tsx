import { Box, Button, Container, Stack, SxProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import React from 'react';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';

const SecondaryText = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));
export default function HomeOurPricing() {
  const router = useRouter();

  const handleGetPaid = () => {
    router.push(paths.dashboard.opportunity.root);
  };
  return (
    <Container sx={{ my: 10 }}>
      <Stack spacing={3} sx={{ mb: 5, position: 'relative' }}>
        <Stack
          sx={{
            position: 'absolute',
            top: 140,
            left: 390,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Image src="/assets/illustrations/home/Mark.svg" />
        </Stack>
        {/* <Typography
          variant="overline"
          color="text.disabled"
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          Our Pricing
        </Typography> */}
        <Box>
          <Typography
            variant="h2"
            color="info.darker"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            We Pay You
          </Typography>
          <Typography
            variant="h2"
            color="info.darker"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            When Your Information<SecondaryText> Sells</SecondaryText>
          </Typography>
        </Box>
        <Typography
          sx={{ maxWidth: 480, textAlign: { xs: 'center', md: 'left' } }}
          variant="body1"
          color="text.secondary"
        >
          You will recieve a 40% revenue share EVERY time someone buys your information
          <br /> If you contribute 1 solicitation document package with a contract value of
          $20,000,000 and four people buy it:
          <br /> <br /> Your profit $1,000 x .4 = $400 x 4 = $1,600
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="h6" sx={{ py: 3, display: { xs: 'none', md: 'block' } }}>
          Pricing
        </Typography>
        <Stack spacing={3} sx={{ alignItems: { xs: 'center', md: 'start' } }}>
          <PricingCard
            sx={{ width: { xs: 207, sm: 264 } }}
            title="$1,000,000 & under"
            cost="$250"
          />
          <Box sx={{ pl: { xs: 0, sm: 2.75 } }}>
            <PricingCard
              title="$1,000,001 - $25,000,000"
              cost="$1,000"
              sx={{ width: { xs: 255, sm: 264 } }}
            />
          </Box>
          <Box sx={{ pl: { xs: 0, sm: 5.5 } }}>
            <PricingCard
              title="$25,000,001 - $100,000,000"
              cost="$1,500"
              sx={{ width: { xs: 279, sm: 274 } }}
            />
          </Box>
          <Box sx={{ pl: { xs: 0, sm: 8.25 } }}>
            <PricingCard
              title="$100,000,001 - $500,000,000"
              cost="$2,000"
              sx={{ width: { xs: 303, sm: 280 } }}
            />
          </Box>
          <Box sx={{ pl: { xs: 0, sm: 11 } }}>
            <PricingCard
              title="500,000,001 & Above"
              cost="$2,500"
              sx={{ width: { xs: 320, sm: 280 } }}
            />
          </Box>
          <Box sx={{ pl: { xs: 0, sm: 36.75, md: 13.75 }, width: 1 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ width: { xs: 1, sm: 284 }, py: 2 }}
              onClick={handleGetPaid}
            >
              Get Paid
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

interface PricingCardProps {
  title: string;
  cost: string;
  sx?: SxProps;
}
function PricingCard({ title, cost, sx }: PricingCardProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        ...sx,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: (theme) => theme.palette.background.neutral,
        borderRadius: 1,
        p: 2,
        maxWidth: { xs: 1, sm: 280 },
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="subtitle2">{cost}</Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Stack>
  );
}
