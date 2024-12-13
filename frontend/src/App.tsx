import Dashboard from "./Pages/Dashboard"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { Signin } from "./Pages/Signin"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
