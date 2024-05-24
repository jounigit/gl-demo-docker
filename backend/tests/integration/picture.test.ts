import {
  INewPicture,
  createPicture,
  deletePicture,
  getPictures,
  updatePicture
} from '@/model/picture.model'

describe('Picture tests', () => {
  it('should find all users'  ,async() => {
    const result = await getPictures()
    expect(result).toBeInstanceOf(Array)
  })

  it('should create picture', async ({ integration }) => {
    const user = await integration.createNormalUser()

    const  res = await createPicture({
      title:  'test Pic',
      content:'this is a test pic',
      image: 'https://picsum.photos/200/300',
      userID: user.id,
    })
    expect(res).toHaveProperty('title','test Pic')
  })

  it('should update picture', async ({ integration }) => {
    const picture = await integration.pictureFactory()

    const newPicture: INewPicture = {
      title: 'new Title',
      image: '',
      userID: picture.userID
    }

    const updatedPicture = await updatePicture(picture.id, newPicture)
    expect(updatedPicture.title).toEqual('new Title')
  })

  it( 'should delete an picture', async ({ integration }) => {
    const picture = await integration.pictureFactory()

    const deleted = await deletePicture(picture.id!)
    expect(deleted).toBeTruthy()
  })
})