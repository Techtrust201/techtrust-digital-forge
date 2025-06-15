
import { useState, useEffect } from 'react';

export const useIsHydrating = () => {
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    // Set hydration to false after component mounts
    setIsHydrating(false);
  }, []);

  return isHydrating;
};
