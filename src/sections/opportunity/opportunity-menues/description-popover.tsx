import { Button, Menu, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Iconify from '../../../components/iconify';

type DescriptionPopupProps = {
  description: string;
};

export default function DescriptionPopup({ description }: DescriptionPopupProps) {
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const openActionMenu = Boolean(menuAnchor);

  return (
    <>
      <Button size="medium" variant="text" onClick={openMenu} color="primary">
        Description
      </Button>
      <Menu
        anchorEl={menuAnchor}
        onClose={closeMenu}
        open={openActionMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ borderRadius: 2 }}
      >
        <Stack sx={{ width: 328, maxHeight: 510 }}>
          <Stack
            sx={{
              height: 72,
              borderBottom: `1px solid ${theme.palette.divider}`,
              p: 3,
            }}
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Iconify icon="solar:list-bold" width={24} height={24} color="grey.600" sx={{ m: 1 }} />
            <Typography variant="subtitle1">Description</Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary" sx={{ p: 3 }}>
            {description}
          </Typography>
          <Stack
            sx={{
              height: 72,
              p: 3,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
            alignItems="center"
            justifyContent="end"
            direction="row"
            spacing={2}
          >
            <Button variant="outlined" onClick={closeMenu}>
              Dismiss
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </>
  );
}
