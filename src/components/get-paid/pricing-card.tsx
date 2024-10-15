import { Typography } from '@mui/material';
import { Stack, SxProps } from '@mui/system';

interface PricingCardProps {
  title: string;
  cost?: string;
  sx?: SxProps;
}

export default function PricingCard({ title, cost, sx }: PricingCardProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        ...sx,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: (theme) => theme.palette.background.neutral,
        borderRadius: 1,
        p: 2,
        maxWidth: { xs: 1, sm: 280 },
      }}
      alignItems="center"
      justifyContent="center"
    >
      {cost && <Typography variant="subtitle2">{cost}</Typography>}
      <Typography variant="body2" color="text.primary">
        {title}
      </Typography>
    </Stack>
  );
}
