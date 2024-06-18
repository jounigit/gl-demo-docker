import tw from "tailwind-styled-components"
import "./styles/App.css"

interface Props {
    $primary: boolean
}
const Container = tw.div<Props>`
    flex
    items-center
    justify-center
    flex-col
    w-full
    ${(p) =>
        p.$primary ? "bg-indigo-600" : "bg-indigo-300"}
    text-3xl
    font-bold
    text-white
`

function App() {
    return (
        <Container $primary={false}>
            <div>
                Use the Container as any other React Component.
            </div>
        </Container>
    )
}

export default App
