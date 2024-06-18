import { FC } from 'react'
import { ItemAllB, StyledInfoB } from './Info.styles'
import config from '@/data/config'

export const InfoB: FC = () => (

  <StyledInfoB style={{ zIndex: 2 }}>
    <ItemAllB>
      <h2>{config.OWNER_NAME}</h2>
      <h4>{config.OWNER_OCCUPATION}</h4>
      <h5>{config.OWNER_PHONE}</h5>
      <h4>{config.OWNER_EMAIL}</h4>
    </ItemAllB>
    {/* <Item>
        <Text muted>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius
          sed odit fugiat iusto fuga praesentium optio, eaque rerum!
          Provident similique accusantium nemo autem.
          Veritatis obcaecati tenetur iure eius earum ut molestias architecto
          voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit
          sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis
          quas aliquid.
        </Text>
      </Item>
      <Item>
        <h3>Awards</h3>
      </Item> */}
  </StyledInfoB>
)