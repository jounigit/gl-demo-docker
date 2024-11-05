import type { RouteObject } from 'react-router-dom'
import AlbumAdminRoute from './dashboard/AlbumAdminRoute'
import AlbumListAdminRoute from './dashboard/AlbumListAdminRoute'
import AlbumCreateRoute from './dashboard/AlbumCreateRoute'
import AlbumUpdateRoute from './dashboard/AlbumUpdateRoute'
import ChoosePicturesRoute from './dashboard/ChoosePicturesRoute'
import { DashboardLayout } from '../components/dashboard'
import DashboardPage from '../pages/DashboardPage'
import PictureListAdminRoute from './dashboard/PictureListAdminRoute'
import PictureUpdateRoute from './dashboard/PictureUpdateRoute'
import UploadPictureRoute from './dashboard/UploadPictureRoute'

export function getDashBoardRoutes(): RouteObject {
  return {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      // {
      //   path: 'testpics',
      //   element: <TestPics />,
      // },
      {
        path: 'albums',
        children: [
          AlbumListAdminRoute,
          AlbumUpdateRoute,
          ChoosePicturesRoute,
          AlbumAdminRoute,
          AlbumCreateRoute
        ],
      },
      {
        path: 'pictures',
        children: [
          PictureListAdminRoute,
          PictureUpdateRoute,
          UploadPictureRoute
        ]
      }
    ],
  }
}