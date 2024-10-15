import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const policyPagePath = paths.auth.policy;

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function PolicyGuard({ children }: Props) {
  const router = useRouter();

  const { user } = useAuthContext();

  const isApproved = Boolean(user?.policy_approved_at);

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isApproved) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${policyPagePath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isApproved, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
