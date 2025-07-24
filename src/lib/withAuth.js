import { useRouter } from "next/navigation"
import { useEffect } from "react"



export default function withAuth(ProtectRoute){
    // return async (context) => {
    //     const authHeader = context.req.headers["authorization"]

    //     if(!authHeader) {
    //         return { redirect: { destination: "https://clearfund.netlify.app/?route=login"}}
    //     }

    //     const token = authHeader.split(" ")[1]

    //     try {
            
    //         const decoded = jwt.verify(token, "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")
    //         context.req.user = decoded
    //         return await gssp(context)

    //     } catch (error) {
    //         return { redirect: { destination: "https://clearfund.netlify.app/?route=login"}}
    //     }
    // }

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