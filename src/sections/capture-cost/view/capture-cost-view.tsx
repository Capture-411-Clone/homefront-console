'use client';

// @mui
import Container from '@mui/material/Container';
// components
import CaptureCostForm from '../capture-cost-form';

// ----------------------------------------------------------------------

export default function CaptureCostView() {
  return (
    <Container sx={{ pt: 10, pb: 5 }}>
      <CaptureCostForm />
    </Container>
  );
}
