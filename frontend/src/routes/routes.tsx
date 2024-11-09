import type { RouteObject, } from 'react-router-dom'
import MainLayout from './MainLayout'
import { QueryBoundaries } from '../components/queryboundary/QueryBoundaries'
import NotFoundPage from '../pages/NotFoundPage'
import { Login } from '../features/login/components/Login'
import HomePage from '../pages/HomePage'
import { getDashBoardRoutes } from './GetDashBoardRoutes'
import GalleriaPage from '../pages/GalleriaPage'
import Album from '../features/album/components/Album'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element:
          <QueryBoundaries>
            <Login />
          </QueryBoundaries>
      },
      {
        path: 'galleria',
        children: [
          {
            index: true,
            element:
              <QueryBoundaries>
                <GalleriaPage />
              </QueryBoundaries>
          },
          {
            path: ':slug',
            element:
              <QueryBoundaries>
                <Album />
              </QueryBoundaries>
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ],
  },
  getDashBoardRoutes()
]

export default routes



