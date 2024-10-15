'use client';

// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useAuthContext } from 'src/auth/hooks';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  const [banner, setBanner] = useState('');
  const { authenticated } = useAuthContext();

  useEffect(() => {
    const host = window.location.hostname;
    if (host.includes('staging.')) {
      setBanner('Staging');
    } else if (host.includes('localhost')) {
      setBanner('Local');
    }
  }, []);

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      {banner && (
        <Typography
          textAlign="center"
          sx={{
            animation: 'pulsing 1300ms infinite',
            '@keyframes pulsing': {
              '0%': { opacity: 0.5 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.5 },
            },
            borderRadius: 1,
            px: 1,
            py: 0.5,
            backgroundColor: 'warning.main',
            color: 'white',
          }}
          variant="subtitle2"
        >
          {banner}
        </Typography>
      )}
      <Button
        component={RouterLink}
        href={PATH_AFTER_LOGIN}
        variant="contained"
        color="primary"
        sx={{ mr: 1, ...sx }}
      >
        {authenticated ? 'Dashboard' : 'Login'}
      </Button>
    </Stack>
  );
}
