// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
// utils
import { fCurrency } from 'src/utils/format-number';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  currentBalance: number;
}

export default function EcommerceCurrentBalance({ title, currentBalance, sx, ...other }: Props) {
  return (
    <Card sx={{ p: 3, minHeight: 415, display: 'flex', flexDirection: 'column', ...sx }} {...other}>
      <Stack spacing={1} sx={{ flex: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        {currentBalance ? (
          <Typography variant="h3">{fCurrency(currentBalance)}</Typography>
        ) : (
          <Typography variant="h3">$0</Typography>
        )}
        <Box flex={1} /> {/* This Box pushes everything below it to the bottom */}
        <Button fullWidth variant="contained" color="primary" disabled>
          Collect (Coming Soon...)
        </Button>
      </Stack>
    </Card>
  );
}
