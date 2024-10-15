'use client';

import { m } from 'framer-motion';
import { useState, useCallback, useEffect, useMemo } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { useNotificationsQuery } from 'src/_req-hooks/opportunity/notification/useGetNotificationsQuery';
import { useUpdateNotificationMutation } from 'src/_req-hooks/opportunity/notification/useUpdateNotificationMutation';
import { NotificationData } from 'src/@types/opportunity/notification/notificationData';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';
import { ConfirmDialog } from 'src/components/custom-dialog';
//
import { useAuthContext } from 'src/auth/hooks';
import NotificationItem from './notification-item';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const drawer = useBoolean();

  const smUp = useResponsive('up', 'sm');

  const [currentTab, setCurrentTab] = useState('all');
  const [isNotificationItemDialogOpen, setIsNotificationItemDialogOpen] = useState(false);

  const { user } = useAuthContext();

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const { data, refetch: getAllNotification } = useNotificationsQuery(
    {
      filters: {
        driver: { op: 'equals', value: 'database' },
        target_user_id: { op: 'equals', value: user?.ID.toString() },
      },
    },
    {
      enabled: !!user?.ID,
    }
  );

  const [currentNotificationItem, setCurrentNotificationItem] = useState<NotificationData | null>(
    null
  );

  const { mutate: updateNotification } = useUpdateNotificationMutation({
    onSuccess: () => {
      getAllNotification();
    },
  });

  useEffect(() => {
    if (data) {
      setNotifications(data.data.items);
    }
  }, [data]);

  const handleNotificationItemClick = (notification: NotificationData) => {
    setCurrentNotificationItem(notification);
    setIsNotificationItemDialogOpen(true);
    updateNotification({
      ID: notification.id,
      seen: true,
    });
  };

  const unread = notifications.filter((item) => item.seen === false);
  const read = notifications.filter((item) => item.seen === true);

  const TABS = useMemo(
    () => [
      {
        value: 'all',
        label: 'All',
        count: notifications.length,
      },
      {
        value: 'unread',
        label: 'Unread',
        count: unread.length,
      },
      {
        value: 'read',
        label: 'Read',
        count: read.length,
      },
    ],
    [notifications, unread, read]
  );

  const handleMarkAllAsRead = () => {
    const markAllAsReadPromises = unread.map((notification) =>
      updateNotification({ ID: notification.id, seen: true })
    );

    Promise.all(markAllAsReadPromises)
      .then(() => {
        getAllNotification();
      })
      .catch((error) => {
        console.error('Failed to mark all as read:', error);
      });
  };

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Notifications
      </Typography>

      {!!unread.length && (
        <Tooltip title="Mark all as read">
          <IconButton color="primary" onClick={handleMarkAllAsRead}>
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
              color={
                (tab.value === 'unread' && 'info') ||
                (tab.value === 'read' && 'success') ||
                'default'
              }
            >
              {tab.count}
            </Label>
          }
          sx={{
            '&:not(:last-of-type)': {
              mr: 3,
            },
          }}
        />
      ))}
    </Tabs>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {currentTab === 'unread' &&
          unread.map((notification) => (
            <NotificationItem
              notification={notification}
              handleClick={() => {
                handleNotificationItemClick(notification);
              }}
            />
          ))}
        {currentTab === 'read' &&
          read.map((notification) => (
            <NotificationItem
              notification={notification}
              handleClick={() => {
                handleNotificationItemClick(notification);
              }}
            />
          ))}
        {currentTab === 'all' &&
          notifications.map((notification) => (
            <NotificationItem
              notification={notification}
              handleClick={() => {
                handleNotificationItemClick(notification);
              }}
            />
          ))}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={unread.length} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2.5, pr: 1 }}
        >
          {renderTabs}
        </Stack>

        <Divider />

        {renderList}

        <Box sx={{ p: 1 }}>
          <Button fullWidth size="large" onClick={handleMarkAllAsRead}>
            Read All
          </Button>
        </Box>
      </Drawer>
      <ConfirmDialog
        open={isNotificationItemDialogOpen}
        title={currentNotificationItem?.subject}
        onClose={() => {
          setIsNotificationItemDialogOpen(false);
        }}
        content={currentNotificationItem?.body}
        cancelBtnText="Dismiss"
      />
    </>
  );
}
