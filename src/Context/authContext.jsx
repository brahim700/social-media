
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [userToken, setuserToken] = useState(null);

  useEffect(() => { 
    if (localStorage.getItem("userToken")!==null) {
      setuserToken(localStorage.getItem("userToken"))
      
    }
  }, [])
  
  return (
    <AuthContext.Provider value={{userToken,setuserToken}}>
      {props.children}
    </AuthContext.Provider>
  );
}