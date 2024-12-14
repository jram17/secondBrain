import Dashboard from "./Pages/Dashboard"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { Signin } from "./Pages/Signin"
import { ReactNode, useEffect, useState } from "react"
import axios from "axios"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
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
  const [valid, setVaild] = useState<boolean | null>(null); // null to handle loading state
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;


  
  useEffect(() => {
    async function verify() {
      const response = await axios.post("http://localhost:3000/api/v1/verifyJWT");
      console.log(response);
      if (response.data.valid) {
         setVaild(true) 
        }else{
          setVaild(false);
        }
  
    }
    verify()
  }, [valid]);

  if (valid === null) {
    return <div>Loading...</div>
  }
  if (valid === false) { navigate("/sign-in"); }
  return <>{children}</>

};

export default App
