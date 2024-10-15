import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';

type OpportunityListProgressProps = {};

export default function OpportunityListProgress(props: OpportunityListProgressProps) {
  return (
    <Stack>
      <Box textAlign="center">
        <Typography component="span" variant="h3" color="secondary.main">
          Contribute
        </Typography>
        &nbsp;
        <Typography component="span" sx={{ color: '#27097A' }} variant="h3">
          for Credit
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" pt={2}>
        <Typography variant="body1" textAlign="center" sx={{ maxWidth: 740 }}>
          We will drop credit into your account to buy what you need from the database if you
          contribute during our Beta phase and help the community get the progress bar to 100%!
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" pt={2}>
        <Typography
          variant="subtitle1"
          textAlign="center"
          sx={{ maxWidth: 740 }}
          color="primary.main"
        >
          Credit is issued once the progress bars is at 100% and the database is unveiled!
        </Typography>
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'space-between' }}
        spacing={5}
        pt={4}
      >
        <Stack alignItems={{ xs: 'center' }}>
          <Box textAlign="center">
            <Typography component="span" sx={{ color: '#27097A' }} variant="h5">
              Contribute to Fill the
            </Typography>
            &nbsp;
            <Typography component="span" variant="h5" color="secondary.main">
              Supply
            </Typography>
          </Box>

          <Box
            maxWidth={400}
            pt={{ xs: 4, md: 12 }}
            component="img"
            alt="illustration_dashboard"
            src="/assets/illustrations/opportunity/supply.png"
          />
        </Stack>

        <Stack justifyContent="center" alignItems="center">
          <Box textAlign="center">
            <Typography component="span" sx={{ color: '#27097A' }} variant="h5">
              Credit Tiers
            </Typography>
          </Box>

          <Box pt={4}>
            <Table
              size="small"
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                width: { xs: 250, md: 300, lg: 400 },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Contributions</TableCell>
                  <TableCell align="center">Buying Power</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {/* 250 */}
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">$5</TableCell>
                </TableRow>
                {/*  1000 */}
                <TableRow>
                  <TableCell align="center">25</TableCell>
                  <TableCell align="center">$125</TableCell>
                </TableRow>
                {/* 1500 */}
                <TableRow>
                  <TableCell align="center">50</TableCell>
                  <TableCell align="center">$250</TableCell>
                </TableRow>
                {/* 2000 */}
                <TableRow>
                  <TableCell align="center">100</TableCell>
                  <TableCell align="center">$500</TableCell>
                </TableRow>
                {/* 2500 */}
                <TableRow>
                  <TableCell align="center">500</TableCell>
                  <TableCell align="center">$2,500</TableCell>
                </TableRow>
                {/* 5000 */}
                <TableRow>
                  <TableCell align="center">1000</TableCell>
                  <TableCell align="center">$5000</TableCell>
                </TableRow>
                {/* 10.000 */}
                <TableRow>
                  <TableCell align="center">2000</TableCell>
                  <TableCell align="center">$10,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Stack>

        <Stack alignItems={{ xs: 'center' }}>
          <Box textAlign="center">
            <Typography component="span" variant="h5" color="secondary.main">
              Demand
            </Typography>
            &nbsp;
            <Typography component="span" sx={{ color: '#27097A' }} variant="h5">
              already exists
            </Typography>
          </Box>

          <Box
            pt={{ xs: 4, md: 12 }}
            maxWidth={400}
            component="img"
            alt="illustration_dashboard"
            src="/assets/illustrations/opportunity/demand.png"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
