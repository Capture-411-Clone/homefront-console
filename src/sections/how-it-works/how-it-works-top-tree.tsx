import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTheme, styled } from '@mui/material/styles';

//-----------------------------------------------------------------------------

const CircleCardRootStyle = styled(Stack)(({ theme }) => ({
  width: 280,
  height: 280,
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#EEF0F6',
  boxShadow: '2px 1px 13.2px 2px rgba(164, 164, 164, 0.25)',
  padding: '72px 68.5px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  [theme.breakpoints.up('sm')]: {
    width: 330,
    height: 330,
  },
}));

const InfoText = styled('span')(({ theme }) => ({
  color: theme.palette.info.darker,
}));

const ErrorText = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));
//-----------------------------------------------------------------------------

export default function HowItWorksTopTree() {
  const theme = useTheme();

  return (
    <Stack sx={{ py: 15, bgcolor: theme.palette.background.neutral }}>
      <Container>
        <Stack spacing={10}>
          <Stack alignItems="center" flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              flexWrap={{ xs: 'wrap', md: 'nowrap' }}
            >
              <Typography variant="h2" color="info.darker" sx={{ textAlign: 'center' }}>
                Less Than
              </Typography>
              <Typography variant="h2" color="error.main" sx={{ textAlign: 'center' }}>
                4%
              </Typography>
              <Typography variant="h2" color="info.darker" sx={{ textAlign: 'center' }}>
                of Solicitation
              </Typography>
            </Stack>
            <Typography variant="h2" color="info.darker" sx={{ textAlign: 'center' }}>
              Documents are Publicly Available
            </Typography>
            <Typography variant="h3" sx={{ mt: 3, textAlign: 'center' }}>
              Does That Work for you?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={10} flexWrap="wrap" justifyContent="center">
            <CircleCard>
              <Typography variant="h5">
                According to USAspending.gov, in 2023 the Federal Government
                <InfoText> awarded 5,046,968</InfoText> contracts
              </Typography>
            </CircleCard>
            <CircleCard>
              <Typography variant="h5">
                <InfoText>
                  As of June 2023, SAM.gov has over 2.8 million registered users and over 674,000
                  registered entities
                </InfoText>
              </Typography>
            </CircleCard>
            <CircleCard>
              <Typography variant="h5">
                <ErrorText>Take your advantage</ErrorText>
                <InfoText>
                  {' '}
                  with superior bid intelligence using our database of legacy solicitation documents
                </InfoText>
              </Typography>
            </CircleCard>
            <CircleCard>
              <Typography variant="subtitle2">
                Because we have new documents uploaded to our database everyday, finding the 96% of
                contracts not publicly available is now as easy as searching the Capture 411
                database
              </Typography>
            </CircleCard>
            <CircleCard>
              <Typography variant="h5">
                According to Sam.gov <InfoText>only 200,733</InfoText> solicitation documents
                <InfoText> were made available publicly</InfoText>
              </Typography>
            </CircleCard>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}

interface CircleCardProps {
  children: React.ReactNode;
}
function CircleCard({ children }: CircleCardProps) {
  return <CircleCardRootStyle>{children}</CircleCardRootStyle>;
}
