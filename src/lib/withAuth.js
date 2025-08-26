import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { jwtDecode } from "jwt-decode"



const ProtectedRoute = ({ children }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(!user) {
                router.replace("/?route=login")
                return
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [router])


    if(loading) {
        return <div className="text-center h-screen text-5xl bg-green-500 flex items-center justify-center">
            <p className="animate-ping">
                Loading ...
            </p>
        </div>
    }

    return <>{children}</>
}


export default ProtectedRoute