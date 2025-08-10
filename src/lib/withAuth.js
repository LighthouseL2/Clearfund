import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"



// export default function withAuth(ProtectRoute){
//     return function ProtectedRoute(props) {
//         const router = useRouter()

//         useEffect(() => {
//             const token = localStorage.getItem("token")
//             if(!token) {
//                 router.replace("https://clearfund.netlify.app/?route=login")
//             }
//         }, [])

//         return <ProtectRoute {...props} />
//     }
// }


export function checkUser(callback) {
    return onAuthStateChanged(auth, user => {
        if(user) {
            callback(user)
        }else {
            callback(null)
        }
    })
}