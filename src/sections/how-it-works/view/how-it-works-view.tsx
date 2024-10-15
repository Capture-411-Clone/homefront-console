'use client';

import { Stack } from '@mui/material';
import React from 'react';
import HowItWorksTopTree from '../how-it-works-top-tree';
import HowItWorkInformation from '../how-it-work-information';
import HowItWorksFomo from '../how-it-works-fomo';
import HowItWorkSample from '../how-it-work-sample';

export default function HowItWorksView() {
  return (
    <Stack>
      <HowItWorkSample />
      <HowItWorkInformation />
      <HowItWorksTopTree />
      <HowItWorksFomo />
    </Stack>
  );
}
