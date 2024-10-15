import { useRef } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';

// theme
import { bgGradient } from 'src/theme/css';
// layouts
import { HEADER } from 'src/layouts/config-layout';
import { Button, Container, Stack, Typography } from '@mui/material';
import Image from 'src/components/image';
import ContactSignUp from 'src/components/early-access/contact-sign-up';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/HeroBack.png',
  }),
  width: '100%',
  height: 930,
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    height: 900,
    left: 0,
    position: 'absolute',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  marginTop: HEADER.H_DESKTOP_OFFSET,
}));

const PrimaryText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const SecondaryText = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { authenticated } = useAuthContext();

  const heroRef = useRef<HTMLDivElement | null>(null);
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();

  const handleGetAccess = () => {
    router.push(paths.dashboard.root);
  };

  return (
    <StyledRoot ref={heroRef}>
      <StyledWrapper>
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height={800}
            flexWrap="wrap"
          >
            <Stack
              alignItems="flex-start"
              spacing={3}
              sx={{
                width: { sx: 1, md: 420 },
              }}
            >
              <Stack sx={{ width: 1 }}>
                {mdUp && (
                  <Typography
                    variant="h1"
                    color="info.darker"
                    sx={{ textAlign: { xs: 'center', md: 'left' } }}
                  >
                    The Only
                  </Typography>
                )}
                <Typography
                  variant="h1"
                  color="info.darker"
                  sx={{ textAlign: { xs: 'center', md: 'left' } }}
                >
                  {!mdUp && 'Bid'} <SecondaryText>Marketplace</SecondaryText>
                </Typography>
                <Typography
                  variant="h1"
                  color="info.darker"
                  sx={{ textAlign: { xs: 'center', md: 'left' } }}
                >
                  For Bid Intelligence
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}
              >
                Join the database of hard-to-get legacy RFPs and save time researching and building
                your pipeline with authoritative bid intellegence. Save 75% of your time and money
                on your capture efforts.
              </Typography>
              <Stack sx={{ width: 1, alignItems: { xs: 'center', md: 'start' } }}>
                <Button variant="contained" color="primary" onClick={handleGetAccess}>
                  {authenticated ? 'Go to Dashboard' : 'Get Access'}
                </Button>
              </Stack>
            </Stack>
            <Stack>
              <Image
                src="/assets/illustrations/home/homeHero-illustration1.png"
                sx={{
                  width: { xs: '100%', sm: 700 },
                  height: { xs: '100%', sm: 500 },
                  display: { xs: 'none', sm: 'block' },
                }}
              />
            </Stack>
            {!authenticated && (
              <Stack sx={{ width: 1 }}>
                <ContactSignUp />
              </Stack>
            )}
          </Stack>
        </Container>
      </StyledWrapper>
    </StyledRoot>
  );
}
