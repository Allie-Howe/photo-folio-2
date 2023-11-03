import { useEffect, useState } from 'react';

export const useScrollPercentage = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const {scrollHeight, scrollTop} = document.documentElement
      setPercent(scrollTop / scrollHeight);
    })
  }, []);

  return percent;
}
