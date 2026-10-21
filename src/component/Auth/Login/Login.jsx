import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { schema } from "../../../schema/schemaLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin } from "../../../service/loginApi"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Spinner from "../../../Spinner/Spinner";
import { AuthContext } from "../../../Context/authContext";
export default function Login() {
  const {setuserToken}=useContext(AuthContext)
  let navigate=useNavigate()
  const [errorApi, seterrorApi] = useState()
  const [isLoading, setisLoading] = useState(false) 
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      
      email: "",
      
      password: "",
      
    },
    resolver: zodResolver(schema),
    mode:"onBlur",
    reValidateMode:"onBlur"
  });

  async function submitForm(userData) {
    setisLoading(true)
    console.log(userData);

     let response =await signin(userData)

     console.log(response);

     if (response?.message === "signed in successfully" ) {
      localStorage.setItem("userToken",response.data.token)
      setuserToken(response.data.token)
        navigate("/home"); 
      } else {
        seterrorApi(response?.message || "Login failed");
      }
  setisLoading(false)

  }

  return (
    <>
      <div className="bg-gray-400 min-h-screen text-center flex">
        <div className="bg-white rounded-3xl w-1/3 m-auto flex flex-col justify-center p-6">
          <h2 className="text-2xl font-bold my-2">Login</h2>
          <div>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1 text-left">
                <Input 
                  {...register("email")} 
                  className="w-full" 
                  label="Email" 
                  placeholder="Enter your email" 
                  type="email" 
                />
                {errors.email && <span className="text-red-500 text-xs px-1">{errors.email.message}</span>}
              </div>

              

              

              <div className="flex flex-col gap-1 text-left">
                <Input 
                  {...register("password")} 
                  className="w-full" 
                  label="Password" 
                  placeholder="Enter your password" 
                  type="password" 
                  autoComplete="current-password" 
                />
                {errors.password && <span className="text-red-500 text-xs px-1">{errors.password.message}</span>}
              </div>

              
              
              

                
             

              <Button isLoading type="submit" className="w-full bg-pink-600 text-white" color="primary" variant="shadow">
                {isLoading?<Spinner/>:<span>login</span>}
              </Button>
              <p >{errorApi} </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}