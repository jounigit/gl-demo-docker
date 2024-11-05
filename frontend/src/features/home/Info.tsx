import type { FC } from 'react'
import styled from 'styled-components'
import defaultBg from '../../assets/default_bg.jpg'


const InfoContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 25em;
/* background-image: 
linear-gradient(
  rgba(0, 0, 0, 0.5),
  rgba(0, 0, 0, 0.5)
  ),
url(${defaultBg}); */
background-size: cover;
;
`
const TextWrapper = styled.section`
  position: relative;
  color: white;
  opacity: 1;
  text-align: center;
  padding: 3em 2em 2em;
    h1 {
      font-size: 2.5em;
    }
    h1, h4, h5 {
      color: var(--gray-5);
      padding-bottom: 0.7em;
    }
`
const infoText =
<>
  <h1>GALLERIA - PORTFOLIO</h1>
  <h5>
          Sovellusta voi käyttää portfoliona erilaisten projektien ja teosten esittelyyn.<br />
          Mahdollisia käyttäjiä ovat eri alojen suunnittelijat, taitelijat jne.
  </h5>
  <h5>
          Projektit esitellään albumeissa, jotka sisältävät teksti- ja kuvaosion.<br />
          <br />
          Kuvat valitaan kuva-arkistosta.
  </h5>
  <h4>
          Voit testata sisällön hallintaa näillä tunnuksilla:<br />
          Email: demo@mail.com<br />
          Password: demopass
  </h4>
</>

export const Info: FC = () => (

  <>
    <InfoContainer>
      <TextWrapper>
        {infoText}
      </TextWrapper>
    </InfoContainer>
  </>
)