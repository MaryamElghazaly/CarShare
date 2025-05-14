import { useState } from 'react'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './components/GuestNavbar';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Navbar/>
    </div>

    </>
  )
}

export default App;
