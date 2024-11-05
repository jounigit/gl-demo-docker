import type { AlbumPictureProps } from '../../../types'
import type { UseMutateFunction } from '@tanstack/react-query'


export function deletePictureFromAlbum(
  // albumPictures: AlbumPicture[],
  albumId: number,
  deleteAPic: UseMutateFunction<unknown, unknown, AlbumPictureProps, unknown>
) {
  return (id: number) => {
    console.log('Del pid: ', id, ' - aid: ', albumId)
    // find albumPicture id by picture - and album ids
    // const getAbmPic = albumPictures.find((item) =>
    //   item.pictureId === id.toString() &&
    //   item.albumId === albumId.toString()
    // )

    // const albumPictureId = getAbmPic?.id

    // console.log('AlbumPic ID: ', getAbmPic)
    const albumPic: AlbumPictureProps = {
      albumId: albumId,
      pictureId: id
    }
    deleteAPic(albumPic)
  }
}

export function addPictureToAlbum(
  albumId: number,
  mutate: UseMutateFunction<unknown, unknown, AlbumPictureProps, unknown>
) {
  return (id: number) => {
    const newAlbumPic: AlbumPictureProps = {
      albumId: albumId,
      pictureId: id
    }
    mutate(newAlbumPic)
  }
}