import { useState } from 'react'

import './App.css'
import Header from "./Components/Header.jsx";
import EmployeeList from "./Components/EmployeeList.jsx";
import Footer from "./Components/Footer.jsx";
import EmployeeComponent from "./Components/EmployeeComponent.jsx";


import {BrowserRouter , Routes, Route} from 'react-router-dom';
function App() {

  return (
    <>
    <BrowserRouter>
    
         <Header />
         <Routes>
          <Route path='/' element={ <EmployeeList />}></Route>
          <Route path='/employee' element={ <EmployeeList />}></Route>
          <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
          <Route path={`/update-employee/:id`} element={<EmployeeComponent/>}></Route>


         </Routes>
     <Footer />
    </BrowserRouter>

    </>
  )
}

export default App
