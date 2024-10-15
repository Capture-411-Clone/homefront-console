'use client';

import { Grid, Stack } from '@mui/material';
// @mui
import Container from '@mui/material/Container';
// components
import { useAuthContext } from 'src/auth/hooks';
import ContactSignUp from 'src/components/early-access/contact-sign-up';
import ContactAddress from '../contact-address';
import ContactForm from '../contact-form';

// ----------------------------------------------------------------------

export default function ContactView() {
  const { authenticated } = useAuthContext();
  return (
    <>
      <Container sx={{ pt: 10, pb: 5 }}>
        <Grid container direction="row-reverse" spacing={2}>
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactAddress />
          </Grid>
        </Grid>
      </Container>
      {!authenticated && (
        <Stack sx={{ mt: 5, bgcolor: 'background.neutral', height: 250 }} justifyContent="center">
          <Container>
            <ContactSignUp />
          </Container>
        </Stack>
      )}
    </>
  );
}
