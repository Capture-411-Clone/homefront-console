import React from 'react';
import { ResetPasswordView } from 'src/sections/auth';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('Reset Password'),
};

export default function ResetPassword() {
  return <ResetPasswordView />;
}
