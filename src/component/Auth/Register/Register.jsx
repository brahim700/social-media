import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { schema } from "../../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Signup } from "../../../service/registerApi"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../../Spinner/Spinner";
export default function Register() {
  let navigate=useNavigate()
  const [isLoading, setisLoading] = useState(false) 
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
    mode:"onBlur",
    reValidateMode:"onBlur"
  });

  async function submitForm(userData) {
    setisLoading(true)
    console.log(userData);

     let response =await Signup(userData)

     console.log(response);

     if (response?.message==="account created") {
      navigate("/")
     }else{
      console.log(response.request);
      
     }
  setisLoading(false)

  }

  return (
    <>
      <div className="bg-gray-400 min-h-screen text-center flex">
        <div className="bg-white rounded-3xl w-1/3 m-auto flex flex-col justify-center p-6">
          <h2 className="text-2xl font-bold my-2">Register</h2>
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
                  {...register("name")} 
                  className="w-full" 
                  label="Name" 
                  placeholder="Enter your name" 
                  type="text" 
                />
                {errors.name && <span className="text-red-500 text-xs px-1">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-1 text-left">
                <Input 
                  {...register("username")} 
                  className="w-full" 
                  label="Username" 
                  placeholder="Enter your username" 
                  type="text" 
                />
                {errors.username && <span className="text-red-500 text-xs px-1">{errors.username.message}</span>}
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

              <div className="flex flex-col gap-1 text-left">
                <Input 
                  {...register("rePassword")} 
                  className="w-full" 
                  label="Confirm Password" 
                  placeholder="Enter your repassword" 
                  type="password" 
                  autoComplete="new-password" 
                />
                {errors.rePassword && <span className="text-red-500 text-xs px-1">{errors.rePassword.message}</span>}
              </div>
              
              <div className="flex gap-2 p-1.5">
                <div className="w-1/2 flex flex-col text-left">
                  <Input 
                    {...register("dateOfBirth")} 
                    className="w-full" 
                    label="Date" 
                    type="date" 
                  />
                  {errors.dateOfBirth && <span className="text-red-500 text-xs px-1 mt-1">{errors.dateOfBirth.message}</span>}
                </div>

                <div className="w-1/2 flex flex-col text-left">
                  <select 
                    {...register("gender")} 
                    className="w-full border rounded-xl px-2 bg-transparent h-14" 
                    id="gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && <span className="text-red-500 text-xs px-1 mt-1">{errors.gender.message}</span>}
                </div>
              </div>

              <Button isLoading type="submit" className="w-full bg-pink-600 text-white" color="primary" variant="shadow">
                {isLoading?<Spinner/>:<span>Register</span>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}