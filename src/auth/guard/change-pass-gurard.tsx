import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const changePasswordPath = paths.auth.changePassword;

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ChangePasswordGuard({ children }: Props) {
  const router = useRouter();

  const { user } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (user?.should_change_password) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${changePasswordPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [user, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
