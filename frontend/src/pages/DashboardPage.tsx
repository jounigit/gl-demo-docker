import { FadeDiv } from "../components/atoms"
import { Dashboard } from "../components/dashboard"

const DashboardPage = (): JSX.Element => {
  return (
    <FadeDiv $timein='0.3s'>
      <Dashboard />
    </FadeDiv>
  )
}

export default DashboardPage