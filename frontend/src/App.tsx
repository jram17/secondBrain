import Dashboard from "./Pages/Dashboard"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { Signin } from "./Pages/Signin"
import Home from "./Pages/Home"
import { AuthLayout } from "./Layout/AuthLayout"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/dashboard" element={
          <AuthLayout>
            <Dashboard />
          </AuthLayout>

        } />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
