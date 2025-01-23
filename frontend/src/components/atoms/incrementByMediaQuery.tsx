import { getDeviceType } from "./getDeviceType"

function incrementByMediaQuery(value: number, increment: number) {
	const device = getDeviceType()
	switch (device) {
		case 'LargeDesktop':
			return value + (increment * 3)
		case 'Desktop':
			return value + (increment * 2)
		case 'Laptop':
			return value + increment
		case 'Tablet':
			return value 
		case 'Mobile':
			return value
		default:
			return value
	}

}

export default incrementByMediaQuery;  // export the function to be used in other files