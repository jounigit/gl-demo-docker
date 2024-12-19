export const size = {
	sm: '35.5em', // 568px
	md: '48em', // ≥768px
	lg: '64em', // 1024px
	xl: '80em', // ≥1280px
	xxl: '95em', // ≥1520px
	xxxl: '120em' // ≥1920px
}
export const device = {
	mobile: `screen and (min-width: ${size.sm})`,
	tablet: `screen and (min-width: ${size.md})`,
	labtop: `screen and (min-width: ${size.lg})`,
	desktop: `screen and (min-width: ${size.xl})`,
	widedesktop: `screen and (min-width: ${size.xxl})`,
	bigscreen: `screen and (min-width: ${size.xxxl})`
}

export const MOBILE = device.mobile
export const TABLET = device.tablet
export const LAPTOP = device.labtop
export const DESKTOP = device.desktop
export const WIDE = device.widedesktop
export const BIGSCREEN = device.bigscreen

export default { size, device }
