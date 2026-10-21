import { Button } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { profileApi, profilePhotoApi } from "../../service/Profile";

export default function Profile() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  // 1. جعل القيمة الابتدائية كائن فارغ لتجنب أخطاء العرض الأول
  const [userData, setUserData] = useState({});

  // مرجع للوصول إلى input رفع الملفات المخفي
  const fileInputRef = useRef(null);

  const handleMouseMove = (e) => {
    if (divRef.current) {
      const bounds = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    }
  };

  async function profileData() {
    const response = await profileApi();
    if (response && response.message === "success") {
      setUserData(response.data.user);
    }
  }

  useEffect(() => {
    profileData();
  }, []);

  // 2. دالة التعامل مع اختيار الصورة ورفعها
  async function handleImageChange(e) {
    e.preventDefault()
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    // مفتاح "photo" يعتمد على ما يطلبه الـ Backend الخاص بـ API المشروع لديك
    formData.append("photo", file);

    const response = await profilePhotoApi(formData);

    if (response.message === "success") {
      toast.success("Profile photo updated successfully!");
      profileData(); 
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-600">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="m-auto relative rounded-xl bg-gray-900 backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer"
      >
        <div
          className={`pointer-events-none blur-3xl rounded-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-300 size-60 absolute z-0 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ top: position.y - 120, left: position.x - 120 }}
        />

        <div className="relative z-10 bg-gray-900/75 p-6 h-full w-full rounded-[11px] flex flex-col items-center justify-center text-center">

          {/* عرض الصورة الشخصية */}
          <img className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500 shadow-md" src={userData?.photo} alt="Profile" />

          {/* Input مخفي لرفع الملفات */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />

          {/* أيقونة التعديل تضغط على الـ input المخفي */}
          <svg
            onClick={() => fileInputRef.current.click()}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-gray-400 hover:text-white cursor-pointer m-2 transition"
            title="Change photo"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>

          <h2 className="text-2xl font-bold text-white mb-1">{userData?.name}</h2>
          <p className="text-sm text-indigo-500 font-medium mb-4">Software Developer</p>
          <h3 className="text-slate-400">email : <span className="text-white text-sm font-light">{userData?.email}</span></h3>
          <h3 className="text-slate-400">username : <span className="text-white text-sm font-light">{userData?.username}</span></h3>
          <h3 className="text-slate-400">gender : <span className="text-white text-sm font-light">{userData?.gender}</span></h3>

          <h3 className="text-slate-400">
            dateOfBirth :{" "}
            <span className="text-white text-sm font-light">
              {userData?.dateOfBirth ? userData.dateOfBirth.split("T")[0] : ""}
            </span>
          </h3>

          <h3 className="text-slate-400">
            createdAt :{" "}
            <span className="text-white text-sm font-light">
              {userData?.createdAt ? userData.createdAt.split("T")[0] : ""}
            </span>
          </h3>

          <p className="text-sm text-slate-400 mb-4 px-4 mt-2">
            Passionate about clean code, scalable systems, and solving real-world problems with elegant software.
          </p>

          <div className="flex space-x-4 mb-4 text-xl text-slate-400">
            {/* Social Icons ... */}
          </div>

          <div>
            <Link to="/ForgetPassword">
              <Button variant="danger-soft">Change Password</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}