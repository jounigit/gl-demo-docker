import { BaseContainer, MOBILE, TABLET } from '@/styles'
import { colors } from '@/styles/theme'
import styled from 'styled-components/macro'

export const StyledInfo = styled(BaseContainer)`
  margin: auto;
  margin-top: 40px;
  padding: 1em;
  background: var(--bg-secondary);

  h2 {
    font-size: 1.3rem;
    font-weight: 600;
  }

  @media ${TABLET} {
  max-width: max-content;
  margin-top: 0px;
  }
`

export const StyledInfoB = styled.div`
  @media ${MOBILE} {
    margin-top: 0;
  }
  margin: auto;
  margin-top: 50%;
  padding: 1em;
  font-size: 1.4rem;
  font-weight: 600;
  h2, h4, h5 {
    color: ${colors.grey1b};
  }

  h4 {
    font-size: 1.4rem;
    font-weight: 700;
  }
  h2 {
    font-size: 1.8rem;
    font-weight: 800;
  }

  @media ${TABLET} {
    margin-top: 14rem;
  }
`
export const ItemAll = styled.div`
  flex-basis: 100%;
  text-align: center;
`
export const ItemAllB = styled.div`
  flex-basis: 100%;
`

export const Item = styled.div`
  flex-basis: 50%;
  margin: 1em;

  @media ${TABLET} {
    flex-basis: 100%;
  }
`