import { ListHomeContainer } from "../../styles/styles"
import { useAlbums } from "../album/useAlbum"
import { ListHomeItem } from "./ListHomeItem"

export const HomeAlbums = () => {
    const { data: Albums } = useAlbums()

    if (Albums === undefined) {
        return <div>No albums yet.</div>
    }

    const threeAlbums = Albums.slice(0,3)

    const showAlbums = threeAlbums.map((a) => 
        <ListHomeItem key={a.id} album={a} />
    )
    return (
        <ListHomeContainer>
            {showAlbums}
        </ListHomeContainer>
        )
}