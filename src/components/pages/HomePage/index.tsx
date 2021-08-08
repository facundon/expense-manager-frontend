import { useTitle } from "hookrouter"
import { APP_NAME } from "../../../config"
import { Home } from "../../templates"

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
   useTitle(APP_NAME)
   const message = <p>Home!!!</p>
   return <Home message={message} />
}

export default HomePage
