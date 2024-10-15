import React from 'react';
import { NaicsEditView } from 'src/sections/naics/view';

export const metadata = {
  title: 'Edit NAICS',
};

type Props = {
  params: {
    id: string;
  };
};

export default function NaicsEditPage({ params }: Props) {
  const { id } = params;
  return <NaicsEditView id={id} />;
}
