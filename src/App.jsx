import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout/Layout';
import { AuthContextProvider } from './Context/authContext';
import ProtectRoute from './ProtectRoute/ProtectRoute';
import { Toaster } from 'react-hot-toast';
import Loading from './Loading/Loading';

const About = lazy(() => import('./component/About/About'));
const Login = lazy(() => import('./component/Auth/Login/Login'));
const Register = lazy(() => import('./component/Auth/Register/Register'));
const Home = lazy(() => import('./component/Home/Home'));
const Profile = lazy(() => import('./component/Profile/Profile'));
const Forgetpassword = lazy(() => import('./component/ForgetPassword/Forgetpassword'));
const UserProfile = lazy(() => import('./component/Profile/UserProfile'));

const routes = createBrowserRouter([{
  path: "/", element: <Layout />, children: [
    { index: true, element: <Login /> },
    { path: "home", element: <ProtectRoute><Home /></ProtectRoute> },
    { path: "about/:id", element: <ProtectRoute><About /></ProtectRoute> },
    { path: "profile", element: <ProtectRoute><Profile /></ProtectRoute> },
    { path: "register", element: <Register /> },
    { path: "ForgetPassword", element: <ProtectRoute><Forgetpassword /></ProtectRoute> },
    { path: "userprofile/:id", element: <ProtectRoute><UserProfile /></ProtectRoute> }
  ]
}]);

function App() {


  return (
    <AuthContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Suspense fallback={<Loading />}>
        <RouterProvider router={routes} />
      </Suspense>

    </AuthContextProvider>
  )
}

export default App
