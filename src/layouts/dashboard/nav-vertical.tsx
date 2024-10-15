'use client';

import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Avatar, Link, Typography } from '@mui/material';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// hooks
import { useAuthContext } from 'src/auth/hooks';
import { paths } from 'src/routes/paths';
// routes
import { RouterLink } from 'src/routes/components';
// import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { usePathname } from 'src/routes/hooks';
import { NavSectionVertical } from 'src/components/nav-section';
import Logo from 'src/components/logo';
//
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton } from '../_common';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

const AccountStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
}));

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const [banner, setBanner] = useState('');

  const { user } = useAuthContext();

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const host = window.location.hostname;
    if (host.includes('staging.')) {
      setBanner('Staging');
    } else if (host.includes('localhost')) {
      setBanner('Local');
    }
  }, []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack justifyContent="center" alignItems="start" width="100%" py={3} px={2.5}>
        {banner && (
          <Typography
            textAlign="center"
            sx={{
              mb: 2,
              borderRadius: 1,
              width: 1,
              px: 1,
              py: 0.3,
              backgroundColor: 'warning.main',
              color: 'white',
            }}
            variant="h6"
          >
            {banner}
          </Typography>
        )}
        <Logo sx={{ width: 136, height: 48 }} />
      </Stack>

      <Box sx={{ mb: 2, mx: 2.5, my: 1 }}>
        <Link component={RouterLink} href={paths.dashboard.user.account} underline="none">
          <AccountStyle>
            <Avatar alt={`${user?.name} ${user?.last_name}`} />
            <Box sx={{ ml: 2, width: '150px' }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.primary',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {`${user?.name} ${user?.last_name}`}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user?.roles?.map((role) => role.title).join(', ')}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      <NavSectionVertical
        data={navData}
        config={{
          currentRole: user?.roles?.map((role) => role.title).join(', '),
        }}
      />

      <Box sx={{ pt: 5 }} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
