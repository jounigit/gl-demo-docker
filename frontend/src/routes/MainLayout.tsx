import { Fragment } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/layouts/nav/Navbar'
import { SiteContent } from '../styles'

export default function MainLayout() {
	const location = useLocation()
	const homePage = !!(location.pathname === '/')

	return (
		<Fragment>
			<Navbar />
			{homePage && <Outlet />}
			{!homePage && (
				<SiteContent>
					<Outlet />
				</SiteContent>
			)}
		</Fragment>
	)
}
