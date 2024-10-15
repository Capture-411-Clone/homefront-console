import React from 'react';
import { Drawer, Stack, Typography, useMediaQuery } from '@mui/material';
import { HEADER } from 'src/layouts/config-layout';
import { useTheme } from '@mui/material/styles';
import Scrollbar from 'src/components/scrollbar';
import { useOffSetTop } from 'src/hooks/use-off-set-top';

import OpportunityDrawerForm, { SearchType } from './Opportunity-drawer-form';
import Iconify from '../iconify';

type OpportunityDrawerProps = {
  opportunityFiltersHandler: (search: SearchType) => void;
  open?: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export default function OpportunityDrawer(props: OpportunityDrawerProps) {
  const { opportunityFiltersHandler, onClose, onOpen, open = true } = props;

  const theme = useTheme();

  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset;

  return (
    <>
      <Stack
        sx={{
          p: 1,
          right: 0,
          cursor: 'pointer',
          position: 'fixed',
          top: HEADER.H_DESKTOP + (!offsetTop ? 16 : 2),
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          zIndex: theme.zIndex.drawer + 1,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.neutral,
          display: { sm: 'none', md: 'none', lg: 'flex', xl: 'flex' },
        }}
        onClick={onOpen}
      >
        <Iconify icon={open ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'} />
      </Stack>
      <Drawer
        open={open}
        onClose={onClose}
        variant={lgUp ? 'persistent' : 'temporary'}
        anchor="right"
        PaperProps={{
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: 'transparent',
            paddingTop: lgUp ? `${!offsetTop ? HEADER.H_DESKTOP : HEADER.H_MOBILE}px` : '0px',
            zIndex: theme.zIndex.appBar - 1,
          },
        }}
      >
        <Typography
          sx={{
            p: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
          variant="subtitle1"
        >
          Advanced Search
        </Typography>

        <Scrollbar
          sx={{
            backgroundColor: 'transparent',
            width: 280,
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Stack
            sx={{
              pb: 2,
              height: '100%',
            }}
          >
            <OpportunityDrawerForm opportunityFiltersHandler={opportunityFiltersHandler} />
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
