import styled from "styled-components"
import { SiteContent } from "../../../styles"
import { UserStore } from "../../../store/userStore"


const DashboardWrapper = styled(SiteContent)`
    padding: 1rem;
`
const Article = styled.article`
  color: var(--gray-4);
  margin: 1rem 0 ;
  li {
    list-style-position: inside;
  }
`

function Dashboard() {
  const user = UserStore()

  return (
    <DashboardWrapper>
      <Article>
        <h2>Moi, {user?.username}</h2>
        <p>tämä on hallintasivu.</p>
      </Article>
      <Article>
        <h3>Albumit</h3>
        <ul>
          <li>Lisää ja poista albumitietoja.</li>
          <li>Poista albumeja.</li>
          <li>Lisää ja poista kuvia albumiin &quot;vaihda kuvia&quot;-linkistä.</li>
          <li>Albumit näkyvät linkkeinä galleria-linkin alla.</li>
        </ul>
      </Article>
      <Article>
        <h3>Kuva-arkisto</h3>
        <ul>
          <li>Lisää ja poista kuvatietoja.</li>
          <li>Poista kuvia.</li>
        </ul>
      </Article>
    </DashboardWrapper>
  )
}

export default Dashboard

