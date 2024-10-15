import React from 'react';
import { OpportunityEditView } from 'src/sections/opportunity/view';

export const metadata = {
  title: 'Edit Opportunity',
};

type Props = {
  params: {
    id: string;
  };
};

export default function EditOpportunityPage({ params }: Props) {
  const { id } = params;
  return <OpportunityEditView id={id} />;
}
