import React from 'react';
import { FiscalEditView } from 'src/sections/fiscal-year/view';

export const metadata = {
  title: 'Edit Year',
};

type Props = {
  params: {
    id: string;
  };
};

export default function EditFiscalYearPage({ params }: Props) {
  const { id } = params;
  return <FiscalEditView id={id} />;
}
