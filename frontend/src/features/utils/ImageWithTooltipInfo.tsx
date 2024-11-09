import { formatUrl } from "../../components/atoms/utils";
import config from "../../data/config";
import type { Picture } from "../../types";
import Tooltip from "./Tooltip";

const picFolder = config.IMAGES_BIG_URL as string

export function ImageWithTooltipInfo(picture: Picture) {
    const { title, image, year, content } = picture
    const pic1 = formatUrl(picFolder, image)
    const info =
        <>
            <h4>{title}</h4><p>{year}</p><p>{content}</p>
        </>
    return (
        <Tooltip tip={info}>
            <img src={pic1} alt='' />
        </Tooltip>
    )
}