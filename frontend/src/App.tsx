import { useLocation, useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { Fragment } from 'react/jsx-runtime'
import { Toaster } from 'react-hot-toast'
import { QueryBoundaries } from './components/queryboundary/QueryBoundaries'
import GlobalStyles from './styles/GlobalStyles'
import config from './data/config'
import { IKContext } from 'imagekitio-react'

const urlEndpoint = config.IMAGE_KIT_ENDPOINT

function App() {
	const location = useLocation()
	const routesContent = useRoutes(routes)
	const ishomePage = !!(location.pathname === '/')
	const isDashboard =
		location.pathname.includes('dashboard')

	// console.log('USER App.tsx: ', getUser())

	return (
		<Fragment>
			<Toaster />
			<GlobalStyles
				homePage={ishomePage}
				dashboard={isDashboard}
			/>
			<QueryBoundaries>
				<IKContext urlEndpoint={urlEndpoint}>
					{routesContent}
				</IKContext>
			</QueryBoundaries>
		</Fragment>
	)
}

export default App
