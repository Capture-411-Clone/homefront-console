// @mui
import Dialog from '@mui/material/Dialog';
import { useMemo } from 'react';
import AgencyNewEditForm from 'src/sections/agency/agency-new-edit-form';
import ContractNewEditForm from 'src/sections/contract-vehicles/contract-new-edit-form';
import OfficeNewEditForm from 'src/sections/offices/office-new-edit-form';
//

// ----------------------------------------------------------------------

export type DependencyModels = 'Agency' | 'Office' | 'ContractVehicle' | '';

type OpportunityCreateDependencyDialogProps = {
  open: boolean;
  model: DependencyModels;
  onClose: VoidFunction;
  handleComplete: VoidFunction;
};

export default function OpportunityCreateDependencyDialog({
  open,
  model,
  onClose,
  handleComplete,
  ...other
}: OpportunityCreateDependencyDialogProps) {
  const models = useMemo(
    () => ({
      Agency: <AgencyNewEditForm dialogMode completeDialog={handleComplete} />,
      Office: <OfficeNewEditForm dialogMode completeDialog={handleComplete} />,
      ContractVehicle: <ContractNewEditForm dialogMode completeDialog={handleComplete} />,
    }),
    [handleComplete]
  );

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} keepMounted={false} {...other}>
      {model && models[model]}
    </Dialog>
  );
}
