import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import Logo from 'src/components/logo';
import Image from 'src/components/image';
import BgLayer from './bg-layer';

type Props = {
  children: React.ReactNode;
};

const NFCStyled = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(15, 0),
  zIndex: 2,
  width: '100%',
  flexGrow: 1,
}));

const NFCInner = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 4),
  height: '100%',
}));

export default function AuthLayout({ children }: Props) {
  const mdUp = useResponsive('up', 'md');

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Logo sx={{ width: 120, top: 20, left: 24, position: 'absolute' }} />
      {mdUp && <BgLayer />}
      <Stack sx={{ width: 1, flexGrow: 1 }}>{children}</Stack>

      <NFCStyled sx={{ display: { xs: 'none', md: 'flex' } }}>
        <NFCInner>
          <Typography variant="h2" color="common.white" sx={{ mb: 10, textAlign: 'center' }}>
            Welcome
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Image
              disabledEffect
              visibleByDefault
              alt="auth"
              src="/assets/illustrations/auth/login-laptop.png"
              sx={{ maxWidth: 550 }}
            />
          </Box>
        </NFCInner>
      </NFCStyled>
    </Box>
  );
}
