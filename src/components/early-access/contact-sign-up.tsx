import { Button, InputBase, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';

export default function ContactSignUp() {
  return (
    <Stack
      sx={{ width: 1, position: 'relative' }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={3}
      flexWrap={{ xs: 'wrap', md: 'nowrap' }}
    >
      <Stack
        sx={{
          position: 'absolute',
          top: -10,
          left: 145,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <Image src="/assets/illustrations/contact/Mark.svg" />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        sx={{ width: 1 }}
      >
        {/* <Image src="/assets/illustrations/contact/ic_email_inbox.svg" /> */}
        <Stack sx={{ width: 1 }}>
          <Typography variant="h4" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            Early Access
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            Contribute now to create your new revenue stream and see <br /> the countdown to unveil
            the database!
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="end" sx={{ width: 1 }}>
        {/* <InputBase
          placeholder="Enter your email"
          sx={{
            border: '1px solid lightgrey',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            height: 54,
            width: { xs: '80%', md: 366 },
            p: 2,
          }}
        /> */}
        <Button
          LinkComponent={Link}
          href={paths.auth.register}
          variant="contained"
          color="primary"
          size="large"
          sx={{
            // borderTopLeftRadius: 0,
            // borderBottomLeftRadius: 0,
            width: { xs: '30%', md: 100 },
            height: 54,
          }}
        >
          Sign Up
        </Button>
      </Stack>
    </Stack>
  );
}
