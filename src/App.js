import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./screens/home";
import Signin from "./screens/signin";
import SignUp from "./screens/signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/signin' element={<Signin />} />
        <Route exact path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;