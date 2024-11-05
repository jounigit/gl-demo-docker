import type { FC } from 'react'
import styled from 'styled-components'
import { Info } from '../features/home/Info'
import { HomeAlbums } from '../features/home/HomeAlbums'
// import axios from 'axios'

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  padding-top: 100px;
`

const HomePage: FC = () => {

  // const logIn = async () => {
  //   try {
  //     const response = await apiClient.post('/login', {
  //       email: 'user-a@user.com',
  //       password: 'password-a',
  //     })
  //     console.log(response.data);

  //   } catch (error) {
  //     console.error('ERROR::  ', error);
  //   }
  // }

  return (
    <Wrapper>
      <Info />
      <HomeAlbums />
    </Wrapper>
  )
}

export default HomePage