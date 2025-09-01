import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { usePrivy } from "@privy-io/react-auth"



const ProtectedRoute = ({ children }) => {
    const router = useRouter()
    const { ready, authenticated, } = usePrivy()


    useEffect(() => {
        if(ready && !authenticated) {
          router.push("/?route=login")
        }
      }, [ready, authenticated, router])
    
      if(!ready) return <p>Loading...</p>

    return <>{children}</>
}


export default ProtectedRoute