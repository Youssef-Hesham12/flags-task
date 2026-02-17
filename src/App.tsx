
import { Bounce, ToastContainer } from 'react-toastify'
import './App.css'
import Home from './pages/Home'

function App() {


  return (
    <>

   {/* my entry point */}
    <Home/>
   {/* my entry point */}


    <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Bounce}
/>


      
    </>
  )
}

export default App
