import React from 'react';
import { VerifyView } from 'src/sections/auth';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('verify'),
};

export default function Verify() {
  return <VerifyView />;
}
