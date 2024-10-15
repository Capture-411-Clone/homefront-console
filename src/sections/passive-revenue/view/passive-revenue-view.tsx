'use client';

// @mui
import Container from '@mui/material/Container';
// components
import PassiveRevenueForm from '../passive-revenue-form';

// ----------------------------------------------------------------------

export default function PassiveRevenueView() {
  return (
    <Container sx={{ pt: 10, pb: 5 }}>
      <PassiveRevenueForm />
    </Container>
  );
}
