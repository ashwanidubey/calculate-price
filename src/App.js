
import './App.css';
import { Provider } from 'react-redux';
import store from './State/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/Signup';
import PricingCalculator from './components/PricingCalculator'
import PricingConfigForm from './components/PricingConfigForm'
/*import Home from './componenets/Home';

import NoteState from './context/notes/NoteState';
import Alert from './componenets/Alert';

import Signup from './componenets/Signup';*/


function App() {
  
  return (
   <>
    <Provider store={store}>
      <BrowserRouter>

      
        <Navbar />
       
        <div className='container'>
          <Routes>

            <Route path="/" element={<PricingCalculator /> } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/setconfig" element={<PricingConfigForm />} />
          </Routes>
        </div>

      </BrowserRouter>
      </Provider>
      </>

  );
}

export default App;