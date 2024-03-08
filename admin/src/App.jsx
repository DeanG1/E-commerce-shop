import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import AddProduct from './Components/AddProduct/AddProduct'
import Admin from './Pages/Admin/Admin'

const App = () => {
  return (
    <div>
        <Navbar/>
        <Admin/>
    </div>
  )
}

export default App