import { ReactElement } from "react"

export interface HomeProps {
   message: ReactElement
}

const Home: React.FC<HomeProps> = ({ message }) => {
   return <div>{message}</div>
}

export default Home
