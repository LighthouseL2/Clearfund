import { useRouter } from "next/navigation"
import { useEffect } from "react"



export default function withAuth(ProtectRoute){
    return function ProtectedRoute(props) {
        const router = useRouter()

        useEffect(() => {
            const token = localStorage.getItem("token")
            if(!token) {
                router.replace("https://clearfund.netlify.app/?route=login")
            }
        }, [])

        return <ProtectRoute {...props} />
    }
}