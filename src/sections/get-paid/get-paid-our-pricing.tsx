import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import React from 'react';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import { paths } from 'src/routes/paths';
import PricingCard from 'src/components/get-paid/pricing-card';

const PrimaryText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const SecondaryText = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function GetPaidOurPricing() {
  const mdDown = useResponsive('down', 'md');
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
            top: { sm: 540, md: 570 },
            left: 265,
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <Image src="/assets/illustrations/get-paid/Mark.svg" />
        </Stack>
        {/* <Typography variant="overline" color="text.disabled">
          Our Pricing
        </Typography> */}
        <Typography variant="h2" color="info.darker">
          Be a Contributor
        </Typography>
        <Typography sx={{ maxWidth: 430 }} variant={mdDown ? 'h5' : 'h3'} color="text.secondary">
          Do you have access to task orders on vehicles?
        </Typography>
        <Typography sx={{ maxWidth: 430 }} variant="body1" color="text.secondary">
          Sign up and contribute solicitation packages you don’t need using your contract vehicles
        </Typography>
        <Typography sx={{ maxWidth: 430 }} variant="body1" color="text.secondary">
          Read our request board and contribute solicitation documents other users need for a quick
          sale
        </Typography>
        <Typography sx={{ maxWidth: 430 }} variant="body1" color="text.secondary">
          You will recieve a 40% revenue share EVERY time someone buys your information
        </Typography>
        <Typography sx={{ maxWidth: 430 }} variant="body1" color="text.secondary">
          There is no limit to how many people can buy each solicitation document package
        </Typography>
        <Typography sx={{ maxWidth: 430 }} variant="body1" color="text.secondary">
          If you contribute 1 solicitation document package with a contract value of $20,000,000 and
          four people buy it:
        </Typography>
        <Typography sx={{ maxWidth: 430 }} variant="body1" color="text.secondary">
          <PrimaryText>Your Profit </PrimaryText>- $1,000 x .4 ={mdDown && <br />} $400 x 4 =
          <SecondaryText> $1,600</SecondaryText>
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
              sx={{ width: { xs: 280, sm: 274 } }}
            />
          </Box>
          <Box sx={{ pl: { xs: 0, sm: 8.25 } }}>
            <PricingCard
              title="$100,000,001 - $500,000,000"
              cost="$2,000"
              sx={{ width: { xs: 303, sm: 284 } }}
            />
          </Box>
          <Box sx={{ pl: { xs: 0, sm: 11 } }}>
            <PricingCard
              title="$500,000,001 & Above"
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
