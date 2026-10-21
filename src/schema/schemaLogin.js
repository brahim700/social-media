import * as z from "zod";


export const schema=z.object({
   
      email: z.string().min(1, "email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
      
      password: z.string().nonempty("password is Requiered").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"invalid password"),

     
  })
    