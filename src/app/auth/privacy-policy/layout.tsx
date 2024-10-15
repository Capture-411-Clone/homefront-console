'use client';

import React from 'react';
import CompactLayout from 'src/layouts/compact/layout';

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <CompactLayout>{children}</CompactLayout>;
}
