import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ChangePasswordApi } from "../../service/changePasswor";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";

export default function Forgetpassword() {
const navigate =useNavigate()
  const { handleSubmit, register } = useForm({
    defaultValues: {
      password: "",
      newPassword: ""
    }
  });

  // استدعاء setuserToken من الـ Context
  const { setuserToken } = useContext(AuthContext);

  async function changePassword(values) {
    const response = await ChangePasswordApi(values);
    console.log(response);
    if (response && response.message === "password changed successfully") {
      toast.success("Password Updated Successfully!");
      console.log(response);

      setuserToken(localStorage.setItem("userToken",response.data?.token))
      
      navigate("/home")
      // setuserToken(localStorage.getItem("userToken"));
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-400">
      <form 
        onSubmit={handleSubmit(changePassword)} 
        className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950" 
        noValidate
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Change password</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Use at least 8 characters with a mix of types.</p>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="cp-current" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current password
            </label>
            <input 
              {...register("password")} 
              id="cp-current" 
              type="password" 
              autoComplete="current-password"
              className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus-visible:ring-blue-400" 
            />
          </div>

          <div>
            <label htmlFor="cp-new" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New password
            </label>
            <input 
              {...register("newPassword")} 
              id="cp-new" 
              type="password" 
              autoComplete="new-password"
              className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus-visible:ring-blue-400" 
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button 
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-gray-700 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-950 cursor-pointer"
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  );
}