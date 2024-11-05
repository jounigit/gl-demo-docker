import { ListHomeDetails } from "../../styles/styles";
import type { Album } from "../../types" 
import kuva1 from '../../assets/kuva-1.jpg'
import kuva2 from '../../assets/kuva-2.jpg'
import kuva3 from '../../assets/kuva-3.jpg'
import config from "../../data/config";
import { formatUrl } from "../../components/atoms/utils";

const imgs = [kuva1, kuva2, kuva3]

const picFolder = config.IMAGES_BIG_URL as string

type Props = {
    album: Album
}

export const ListHomeItem = (props: Props) => {
    const  { title, pictures } = props.album;

    const firstImg = pictures?.[0] ?
        formatUrl(picFolder, pictures[0].image) :
        imgs[Math.floor(Math.random() * imgs.length)]

    return (    
    <ListHomeDetails $bgimg={firstImg}>
        <h2>{title}</h2>
    </ListHomeDetails>

    )
}