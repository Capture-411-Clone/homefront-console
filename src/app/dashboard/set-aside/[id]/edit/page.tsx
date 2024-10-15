import React from 'react';
import { AsideEditView } from 'src/sections/set-aside/view';

export const metadata = {
  title: 'Edit Set Aside',
};

type Props = {
  params: {
    id: string;
  };
};

export default function EditSetAsidePage({ params }: Props) {
  const { id } = params;
  return <AsideEditView id={id} />;
}
