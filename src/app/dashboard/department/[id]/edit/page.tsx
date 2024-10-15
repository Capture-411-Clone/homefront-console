import React from 'react';
import { DepartmetEditView } from 'src/sections/department/view';

export const metadata = {
  title: 'Edit Department',
};

type Props = {
  params: {
    id: string;
  };
};

export default function DepartmentEditPage({ params }: Props) {
  const { id } = params;
  return <DepartmetEditView id={id} />;
}
