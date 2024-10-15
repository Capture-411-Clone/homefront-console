'use client';

import { Stack } from '@mui/material';
import React from 'react';
import GetPaidOurPricing from '../get-paid-our-pricing';
import GetPaidEasy from '../get-paid-easy';
import GetPaidFaq from '../get-paid-faq';

export default function GetPaidView() {
  return (
    <Stack>
      <GetPaidOurPricing />
      <GetPaidEasy />
      <GetPaidFaq />
    </Stack>
  );
}
