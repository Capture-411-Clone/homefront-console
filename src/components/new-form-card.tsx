import { LoadingButton } from '@mui/lab';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface NewFormCardProps {
  children: ReactNode;
  title: string;
  disable?: any;
  loading?: any;
  noSubmitButton?: boolean;
}

export default function NewFormCard(props: NewFormCardProps) {
  const { children, title, disable, loading, noSubmitButton } = props;
  return (
    <Card>
      <Stack
        sx={{
          height: 72,
          bgcolor: (theme) => theme.palette.background.neutral,
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">{title}</Typography>
      </Stack>
      <Divider />
      <Box sx={{ p: 2 }}>{children}</Box>
      {!noSubmitButton && (
        <>
          <Divider />
          <Stack
            sx={{
              height: 72,
              p: 2,
            }}
            direction="row"
            justifyContent="end"
            alignItems="center"
            spacing={1}
          >
            <LoadingButton
              variant="contained"
              color="primary"
              disabled={disable}
              loading={loading}
              type="submit"
            >
              {title}
            </LoadingButton>
          </Stack>
        </>
      )}
    </Card>
  );
}
