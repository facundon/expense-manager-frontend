import { useCallback, useState } from "react"
import { RequestResponse } from "../@types/api"
import { CustomServices } from "../services"

type extractGeneric<T> = T extends RequestResponse<infer R> ? R : never

const useRequest = <
   T extends ReturnType<CustomServices>,
   U extends Parameters<CustomServices>
>(
   service: (...data: U) => T
) => {
   type Result = extractGeneric<T>
   const [response, setResponse] = useState<Result | undefined>(undefined)
   const [error, setError] = useState<string | undefined>(undefined)
   const [isLoading, setIsLoading] = useState<boolean>(false)

   const run = useCallback(
      async (...data: U): Promise<Result | undefined> => {
         try {
            setIsLoading(true)
            const response = await service(...data)
            if (response.status !== 200) {
               setError(response.statusText)
            }
            setResponse(response.data as Result)
            setError(undefined)
            setIsLoading(false)
            return response.data as Result
         } catch (error: any) {
            if (error.response) {
               setError(error.response.data)
            } else if (error.request) {
               setError(error.request)
            } else {
               setError(error.message)
            }
            setResponse(undefined)
            setIsLoading(false)
            return undefined
         }
      },
      [service]
   )

   return { run, response, error, isLoading }
}

export default useRequest
