// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// utils
import { fToNow } from 'src/utils/format-time';
// components
import { NotificationData } from 'src/@types/opportunity/notification/notificationData';
import { Avatar } from '@mui/material';
import { limitWords } from 'src/utils/string';

type NotificationItemProps = {
  notification: NotificationData;
  handleClick?: VoidFunction;
};

export default function NotificationItem({ notification, handleClick }: NotificationItemProps) {
  const renderAvatar = <Avatar sx={{ mr: 1 }} />;

  const renderText = (
    <ListItemText
      disableTypography
      primary={limitWords(notification.body, 14, 250)}
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 2,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          {fToNow(notification.created_at)}
        </Stack>
      }
    />
  );

  const renderUnReadBadge = !notification.seen && (
    <Box
      sx={{
        top: 26,
        width: 8,
        height: 8,
        right: 20,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  );

  return (
    <ListItemButton
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
      onClick={handleClick}
    >
      {renderUnReadBadge}

      {renderAvatar}

      <Stack sx={{ flexGrow: 1 }}>{renderText}</Stack>
    </ListItemButton>
  );
}
