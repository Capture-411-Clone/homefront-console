import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useSecondCountdown({
  init = 60,
  automatic = true,
}: {
  init: number;
  automatic?: boolean;
}) {
  const [countdown, setCountdown] = useState<number>(init);
  const [autoStart, setAutoStart] = useState<boolean>(automatic);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (autoStart) {
      const interval = setInterval(() => {
        if (countdown === 0) {
          clearInterval(interval);
        } else {
          setCountdown((prevCount) => prevCount - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdown, autoStart]);

  function start() {
    setAutoStart(true);
    setCountdown(init);
  }

  function restart() {
    setAutoStart(true);
    setCountdown(init);
  }

  return { countdown, restart, start };
}
