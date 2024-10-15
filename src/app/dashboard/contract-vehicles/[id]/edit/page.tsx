import React from 'react';
import { ContractVehiclesEditView } from 'src/sections/contract-vehicles/view';

export const metadata = {
  title: 'Edit Vehicle',
};

type Props = {
  params: {
    id: string;
  };
};
export default function VehicleEditPage({ params }: Props) {
  const { id } = params;
  return <ContractVehiclesEditView id={id} />;
}
