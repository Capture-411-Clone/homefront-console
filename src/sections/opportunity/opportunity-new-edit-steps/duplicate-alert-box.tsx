import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { OpportunityData } from 'src/@types/opportunity/opportunity/opportunityData';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

type DuplicateAlertBoxProps = {
  opportunity: OpportunityData | null;
  noButton?: boolean;
  owner?: boolean;
};

export default function DuplicateAlertBox(props: DuplicateAlertBoxProps) {
  const router = useRouter();
  const { opportunity, noButton, owner } = props;
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: '#FFFDE7',
        border: '1px solid #FFC107',
        py: 1,
        px: 2,
        borderRadius: 1,
      }}
    >
      <Typography variant="subtitle1" color="warning.darker">
        {!owner
          ? 'There is an opportunity under the same solicitation number. You can only add the documents that are missing.'
          : 'There is an opportunity under the same solicitation number you own. You can edit your opportunty.'}
      </Typography>

      {!noButton && Boolean(opportunity) && (
        <Button
          onClick={() =>
            owner
              ? router.push(paths.dashboard.opportunity.edit(opportunity?.ID || 0))
              : router.push(paths.dashboard.opportunity.editForDuplicate(opportunity?.ID || 0))
          }
          variant="contained"
          color="warning"
        >
          {owner ? 'Edit My Opportunity' : 'Add Missing Documents'}
        </Button>
      )}
    </Stack>
  );
}
