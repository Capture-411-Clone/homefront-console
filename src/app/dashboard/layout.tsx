'use client';

// auth
import { AuthGuard, PolicyGuard } from 'src/auth/guard';
import ChangePasswordGuard from 'src/auth/guard/change-pass-gurard';
// components
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <ChangePasswordGuard>
        <PolicyGuard>
          <DashboardLayout>{children}</DashboardLayout>
        </PolicyGuard>
      </ChangePasswordGuard>
    </AuthGuard>
  );
}
