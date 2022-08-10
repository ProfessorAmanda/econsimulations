import { useEffect, useState } from 'react';

type WindowDimensions = {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean;
  isMobilePortrait: boolean;
};

const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isMobilePortrait: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768 || window.innerHeight < 768,
        isMobilePortrait: (window.innerWidth < 768 || window.innerHeight < 768) && (window.innerWidth < window.innerHeight),
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;