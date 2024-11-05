import { QueryBoundaries } from "../../components/queryboundary/QueryBoundaries"
import AlbumAdmin from "../../features/album/components/admin/AlbumAdmin"

const AlbumAdminRoute = {
  path: ':slug',
  element:
    <QueryBoundaries>
      <AlbumAdmin />
    </QueryBoundaries>
}

export default AlbumAdminRoute