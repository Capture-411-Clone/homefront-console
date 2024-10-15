import { Box, Button, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useRouter } from 'src/routes/hooks';
import React from 'react';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';

export default function HowItWorksFomo() {
  const { authenticated } = useAuthContext();

  const router = useRouter();

  const handleGetAccess = () => {
    router.push(paths.dashboard.root);
  };

  return (
    <Container maxWidth="xl">
      <Stack
        sx={{ py: 15, px: { md: 22 } }}
        direction="row"
        spacing={5}
        justifyContent="center"
        alignItems="center"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
      >
        <Stack>
          <Typography variant="h2" color="info.darker">
            No More
          </Typography>
          <Typography variant="h2" color="error.main">
            FOMO
          </Typography>
        </Stack>
        <Stack alignItems="start">
          <Typography variant="subtitle1">
            Why download the legacy solicitation documents?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <ul>
              <Stack spacing={3}>
                <li>Understand the current requirements</li>
                <li>Generate intelligent questions before meeting with the government</li>
                <li>Understand and get ahead of the key personnel requirements</li>
                <li>Find teaming partners that fill your “gaps”</li>
                <li>Impress your peers and senior leaders during gate reviews</li>
                <li>Build a primetime pipeline based on real intelligence</li>
              </Stack>
            </ul>
          </Typography>
          <Box sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleGetAccess}>
              {authenticated ? 'Go to Dashboard' : 'Get Access'}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
