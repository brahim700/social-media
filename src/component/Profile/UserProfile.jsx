import { useEffect, useRef, useState } from "react";
import { profileUsersApi } from "../../service/Profile";
import { useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";

export default function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    async function profileUser() {
      setLoading(true);
      const response = await profileUsersApi(id);

      if (isActive) {
        setUserData(response?.data?.user ?? response?.data ?? null);
        setLoading(false);
      }
    }

    profileUser();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleMouseMove = (e) => {
    if (divRef.current) {
      const bounds = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    }
  };

  if (loading) return <Loading />;

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-600 text-white">
        User profile not found.
      </div>
    );
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

          <img className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500 shadow-md" src={userData?.photo} alt={`${userData?.name || "User"} profile`} />

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

          <div className="flex space-x-4 mb-4 text-xl text-slate-400">
            {/* Social Icons ... */}
          </div>
        </div>
      </div>
    </div>
  );
}
