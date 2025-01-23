import { useMediaQuery } from 'usehooks-ts'

export const DeviceType: React.FC = getDeviceType()
function getDeviceType() {
  return () => {
    // Define breakpoints for mobile, tablet, and desktop
    const isMobile = useMediaQuery('(max-width:767px)');
    const isTablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');
    const isLabtop = useMediaQuery('(min-width:1024px) and (max-width:1279px)');
    const isDesktop = useMediaQuery('(min-width:1280px) and (max-width:1519px)');
    const isLargeDesktop = useMediaQuery('(min-width:1520px');

    // Determine the device type based on the media queries
    if (isMobile) return 'isMobile';
    if (isTablet) return 'isTablet';
    if (isLabtop) return 'isLabtop';
    if (isDesktop) return 'isDesktop';
    if (isLargeDesktop) return 'isLargeDesktop';
  };
}

