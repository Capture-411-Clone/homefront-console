import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useSiteInfoQuery } from 'src/_req-hooks/opportunity/site-info/useSiteInfoQuery';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';

export default function ContactAddress() {
  const { data: siteData } = useSiteInfoQuery();

  const siteInfo = siteData?.data;

  return (
    <Stack>
      <Stack sx={{ width: { xs: 1, md: 466 }, mb: { xs: 5, md: 0 } }} spacing={5}>
        <Image
          src="/assets/illustrations/contact/WorldMap.png"
          sx={{
            width: { xs: '100%', sm: 1 },
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Stack direction="row" spacing={2}>
          <Iconify
            icon="fluent:location-28-regular"
            width={28}
            height={28}
            color="text.secondary"
          />
          <Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" color="text.primary">
                Mail Us
              </Typography>
              <Link
                target="_blank"
                href={
                  siteInfo?.map_or_directions ||
                  'https://www.google.com/maps/search/P.O.+Box+1074,+Dumfries,+VA+22026-9998/@38.5669309,-77.3099103,15z/data=!3m1!4b1?entry=ttu'
                }
              >
                <Iconify icon="pajamas:external-link" width={18} height={18} color="primary.main" />
              </Link>
            </Stack>
            <Typography variant="subtitle2" color="info.darker">
              {siteInfo?.address}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Iconify icon="system-uicons:mail" width={28} height={28} color="text.secondary" />
          <Stack>
            <Typography variant="h6" color="text.primary">
              Talk to us
            </Typography>
            <Typography variant="body2" color="text.primary">
              {siteInfo?.email_address}
            </Typography>
          </Stack>
        </Stack>
        {/* <Stack direction="row" spacing={2}>
          <Iconify
            icon="solar:clock-circle-outline"
            width={28}
            height={28}
            color="text.secondary"
          />
          <Stack>
            <Typography variant="h6" color="text.primary">
              Working Hours
            </Typography>
            <Typography variant="body2" color="text.primary">
              {siteInfo?.office_hours}
            </Typography>
          </Stack>
        </Stack> */}
      </Stack>
    </Stack>
  );
}
