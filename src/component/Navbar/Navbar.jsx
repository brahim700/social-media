import {
  Avatar,
 
} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";



export default function Navbar() {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef(null);
  const {userToken,setuserToken}=useContext(AuthContext)
  const location = useLocation()
  let Navigate= useNavigate()
  const isLoggedIn = userToken !== null || localStorage.getItem("userToken") !== null
  
  function logOut(){

    localStorage.removeItem("userToken")
    setuserToken(null)
      Navigate("/")
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md w-full">
      {/* Brand & Logo */}
      <div className="flex items-center gap-2">
        
        <Link to="home"><span className="font-bold text-xl text-inherit">Social Media</span></Link>
      </div>

      <div className="flex justify-end gap-10 items-center">
  {/* Nav Links / Auth State */}
  {isLoggedIn ? (
    /* Avatar & Custom Dropdown Menu */
    <div className="relative" ref={dropdownRef}>
      <Avatar
        isBordered
        as="button"
        onClick={() => setIsOpen(!isOpen)}
        className="transition-transform cursor-pointer"
        color="secondary"
        name="Jason Hughes"
        size="sm"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-left">
          <div className="px-4 py-3 border-b border-gray-100">
            <Link to="profile" className="text-sm font-semibold text-gray-700 hover:text-secondary">
              Profile
            </Link>
          </div>

          <div className="border-t border-gray-100 pt-1">
            <button
              
             onClick={logOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold flex items-center gap-2"
            >
              🚪 Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="hidden sm:flex items-center gap-6">
      {location.pathname !== "/register" && (
        <Link to="/register" className="text-gray-700 hover:text-secondary font-medium">
          Register
        </Link>
      )}
      {location.pathname !== "/" && (
        <Link to="/" className="text-secondary font-semibold">
          Login
        </Link>
      )}
    </div>
  )}
</div>
    </nav>
  );
}