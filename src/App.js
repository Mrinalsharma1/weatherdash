import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Nopage from './components/PageNotFound/Nopage';
import Weatherapp from './components/Weatherapp/Weatherapp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/weatherapp' element={<Weatherapp />} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
