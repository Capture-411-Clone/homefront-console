import React from 'react';
import { AgencyEditView } from 'src/sections/agency/view';

export const metadata = {
  title: 'Edit Agency',
};

type Props = {
  params: {
    id: string;
  };
};

export default function AgencyEditPage({ params }: Props) {
  const { id } = params;
  return <AgencyEditView id={id} />;
}
