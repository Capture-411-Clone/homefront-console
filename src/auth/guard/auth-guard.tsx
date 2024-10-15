import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPath = paths.auth.login;

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { authenticated, loading } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    if (!loading) check();
  }, [authenticated, check, loading]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
