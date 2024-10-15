import React from 'react';
import { UserEditView } from 'src/sections/user/view';

export const metadata = {
  title: 'Edit User',
};

type Props = {
  params: {
    id: string;
  };
};

export default function EditUserPage({ params }: Props) {
  const { id } = params;
  return <UserEditView id={id} />;
}
