import Dashboard from "./Pages/Dashboard"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { Signin } from "./Pages/Signin"
import { ReactNode, useEffect, useState } from "react"
import axios from "axios"
import { LoadingIcon } from "./icons/LoadingIcon"
import Home from "./Pages/Home"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>

        } />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [valid, setValid] = useState<boolean | null>(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;



  useEffect(() => {
    // async function verify() {
    //   try {
    //     const response = await axios.post("http://localhost:3000/api/v1/verifyJWT");
    //     console.log(response.data);

    //     if (response.data.valid) {
    //       setValid(true);
    //     } else {
    //       setValid(false);
    //     }
    //   } catch (error) {
    //     console.error("Error during verification:", error);

    //     if (axios.isAxiosError(error)) {
    //       if (error.response?.status === 401 || error.response?.status === 403) {
    //         setValid(false);
    //         navigate("/sign-in");
    //       }
    //     } else {
    //       console.error("Unexpected error:", error);
    //       setValid(false);
    //       navigate("/sign-in", { replace: true });
    //     }
    //   }
    // }


    async function verify() {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/verifyJWT");
        if (response.data.valid) {
          setValid(true);
        } else {
          throw new Error("Invalid JWT");
        }
      } catch (error) {
        console.error("Error during verification:", error);
        setValid(false);
        // Navigate after state updates
        navigate("/sign-in", { replace: true });
      }
    }

    verify()
  }, [navigate]);

  if (valid === null) {
    return <div><LoadingIcon/></div>
  }
  if (valid === false) {
    navigate("/sign-in");
  }
  return <>{children}</>

};

export default App
