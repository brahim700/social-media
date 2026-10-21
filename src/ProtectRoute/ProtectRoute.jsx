import { Navigate } from "react-router-dom"

export default function ProtectRoute({children}) {
if (localStorage.getItem("userToken")==null) {
   return <Navigate to="/" replace />
   
    
}else{
    return children
}
}
