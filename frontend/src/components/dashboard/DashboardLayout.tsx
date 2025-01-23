import { Outlet, useNavigate } from 'react-router-dom'
import {
	AsideDb,
	GridDb,
	HeaderDb,
	MainDb,
	MainWrapper
} from './components/Dashboard.styles'
import { useEffect } from 'react'
import NavbarDb from './components/NavbarDb'
import SidebarDb from './components/SidebarDb'
import { QueryBoundaries } from '../queryboundary/QueryBoundaries'
import { getToken } from '../../store/tokenStore'

function DashboardLayout() {
	const navigate = useNavigate()
	const token = getToken()

	useEffect(() => {
		if (!token) {
			navigate('/login')
		}
	}, [navigate, token])

	return (
		<GridDb id='grid'>
			<HeaderDb id='header'>
				<NavbarDb />
			</HeaderDb>
			<AsideDb id='aside'>
				<SidebarDb />
			</AsideDb>
			<MainDb id='main'>
				<QueryBoundaries>
					<MainWrapper id='mainwrapper'>
						<Outlet />
					</MainWrapper>
				</QueryBoundaries>
			</MainDb>
			{/* <RightSide></RightSide> */}
		</GridDb>
	)
}

export default DashboardLayout
