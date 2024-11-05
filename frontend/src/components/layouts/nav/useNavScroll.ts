/**
 * useScroll React custom hook
 * Usage:
 *    const { scrollpos, show } = useNavScroll();
 */

import { useState, useEffect } from 'react'

export function useNavScroll() {
	const [state, setState] = useState({
		scrollpos: 0,
		show: true,
	})

	const listener = (): void =>
		setState({
			scrollpos: document.body.getBoundingClientRect().top,
			show:
				document.body.getBoundingClientRect().top >
				state.scrollpos,
		})

	useEffect(() => {
		window.addEventListener('scroll', listener)
		return () => {
			window.removeEventListener('scroll', listener)
		}
	})

	return {
		scrollpos: state.scrollpos,
		show: state.show,
	}
}
