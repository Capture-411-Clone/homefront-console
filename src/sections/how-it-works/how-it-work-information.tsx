import { Container, Stack, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import React from 'react';

const PrimaryText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));
export default function HowItWorkInformation() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        py: 10,
        px: { xs: 5, md: 0 },
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container>
        <Stack alignItems="center" flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
          <Typography variant="h3" color="info.darker" sx={{ textAlign: 'center' }}>
            Time saving intelligence,<PrimaryText> not </PrimaryText>thousands of dollars of
            <br /> subscription fees for
            <PrimaryText> publicly available information </PrimaryText>
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
