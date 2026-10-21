import * as z from "zod";


export const schema=z.object({
    name: z.string().nonempty("name is requiered").min(3,"min 3 char").max(20,"max 20 char"),
      username: z.string(),
      email: z.string().min(1, "email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
      dateOfBirth: z.coerce.date("date is requiered").refine((data)=>{
        let userdate=data.getFullYear()
        let dateNow=new Date().getFullYear()
        let userAge=dateNow-userdate
        return userAge >= 20

      },"the age less than 20"),
      gender: z.enum(["male","female" ]),
      password: z.string().nonempty("password is Requiered").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"invalid password"),

      rePassword:z.string().nonempty("repassword is Requiered") ,
  }).refine((data)=>data.password===data.rePassword,{path:["rePassword"],message:"Invalid RePassword"})
    