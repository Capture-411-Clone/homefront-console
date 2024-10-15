import React from 'react';
import { OfficeEditView } from 'src/sections/offices/view';

export const metadata = {
  title: 'Edit Office',
};

type Props = {
  params: {
    id: string;
  };
};

export default function OfficeEditPage({ params }: Props) {
  const { id } = params;
  return <OfficeEditView id={id} />;
}
