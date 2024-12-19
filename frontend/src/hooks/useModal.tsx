/**
 * useScroll React custom hook
 * Usage:
 *    const { isShown, toggle } = useModal();
 */

import { useState } from 'react'

export const useModal = (): {
	isShown: boolean
	toggle: () => void
} => {
	const [isShown, setIsShown] = useState<boolean>(false)
	const toggle = (): void => setIsShown(!isShown)
	return {
		isShown,
		toggle
	}
}
