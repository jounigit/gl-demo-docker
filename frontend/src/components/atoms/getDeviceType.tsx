import { useMediaQuery } from "usehooks-ts";

export function getDeviceType(): 'Mobile' | 'Tablet' | 'Laptop' | 'Desktop' | 'LargeDesktop' | 'Unknown' {
    // Define breakpoints for mobile, tablet, and desktop
    const isMobile = useMediaQuery('(max-width:767px)');
    const isTablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');
    const isLabtop = useMediaQuery('(min-width:1024px) and (max-width:1279px)');
    const isDesktop = useMediaQuery('(min-width:1280px) and (max-width:1519px)');
    const isLargeDesktop = useMediaQuery('(min-width:1520px');

    // Determine the device type based on the media queries
    let deviceType: 'Mobile' | 'Tablet' | 'Laptop' | 'Desktop' | 'LargeDesktop' | 'Unknown'
    if (isMobile) {
      deviceType = 'Mobile';
    } else if (isTablet) {
      deviceType = 'Tablet';
    } else if (isLabtop) {
      deviceType = 'Laptop';
    } else if (isDesktop) {
      deviceType = 'Desktop';
    } else if (isLargeDesktop) {
      deviceType = 'LargeDesktop';
    } else {
      deviceType = 'Unknown';
    }

    return deviceType
}
