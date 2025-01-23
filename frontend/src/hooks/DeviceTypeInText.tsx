import { useMediaQuery } from 'usehooks-ts'

const DeviceType: React.FC = () => {
  // Define breakpoints for mobile, tablet, and desktop
  const isMobile = useMediaQuery('(max-width:767px)');
  const isTablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');
  const isLabtop = useMediaQuery('(min-width:1024px) and (max-width:1279px)');
  const isDesktop = useMediaQuery('(min-width:1280px) and (max-width:1519px)');
  const isLargeDesktop = useMediaQuery('(min-width:1520px');

  // Determine the device type based on the media queries
  let deviceType: string;
  if (isMobile) {
    deviceType = 'Mobile';
  } else if (isTablet) {
    deviceType = 'Tablet';
  } else if (isLabtop) {
    deviceType = 'Tablet';
  } else if (isDesktop) {
    deviceType = 'Desktop';
  } else if (isLargeDesktop) {
    deviceType = 'LargeDesktop';
  } else {
    deviceType = 'Unknown';
  }

  return (
    <div>
      <p>Device Type: {deviceType}</p>
    </div>
  );
};

export default DeviceType;
