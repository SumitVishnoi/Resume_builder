import { useEffect, useRef, useState } from "react";

export default function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setRemaining(seconds);
    if (ref.current) clearInterval(ref.current);
    ref.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(ref.current!);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  useEffect(() => () => { if (ref.current) clearInterval(ref.current); }, []);

  return { remaining, start, active: remaining > 0 };
}