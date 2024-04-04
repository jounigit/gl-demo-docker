import { INewAlbum, createAlbum, deleteAlbum, getAlbum, getAlbums, updateAlbum } from '@/model/album.model'


describe('Album tests', () => {
  it('should find all users'  ,async() => {
    const result = await getAlbums()
    expect(result).toBeInstanceOf(Array)
  })

  it('should find  album by id', async ({ integration }) => {
    const album = await integration.albumFactory()

    const found = await getAlbum(album.id)

    expect(found).toBeDefined()
    expect(found!.id).toEqual(album.id)
    expect(found!.title).toEqual(album.title)
  })

  it('should create album', async ({ integration }) => {
    const user = await integration.createNormalUser()

    const  res = await createAlbum({
      title:  'test album',
      content:'this is a test album',
      userID: user.id,
    })
    expect(res).toHaveProperty('title','test album')
  })

  it('should update album', async ({ integration }) => {
    const album = await integration.albumFactory()

    const updatedTitle = `updated ${album.title}`
    const updatedContent = `updated ${album.content}`
    const newAlbum: INewAlbum = {
      title: updatedTitle,
      content: updatedContent,
      userID:  album.userID,
    }

    const updated = await updateAlbum(album.id!,newAlbum )

    expect(updated.title).toEqual(updatedTitle)
    expect(updated.content).toEqual(updatedContent)
  })

  it( 'should delete an album', async ({ integration }) => {
    const album=await integration.albumFactory()

    const deleted = await deleteAlbum(album.id!)
    expect(deleted).toBeTruthy()
  })
})