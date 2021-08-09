import { QueryClient, QueryClientProvider } from "react-query"
import { HomePage } from "./components/pages"

const queryClient = new QueryClient()

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <div className="App">
            <div className="container">
               <HomePage />
            </div>
         </div>
      </QueryClientProvider>
   )
}

export default App
