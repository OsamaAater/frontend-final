import { useState } from 'react'
import fakeData from './fake-data.json'
import { useTable } from 'react-table'
import {Table} from './components/Table'
import { Nav } from './components/Nav'
import { IpWhitelist } from './pages/IpWhitelist'
import { Add } from './pages/Add'
import { Delete } from './pages/Delete'
import { NoPage } from './pages/NoPage'
import commercelogo from './assets/commercelogo.png'
import './Css/Reset.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() { //main function
  return (
    /*
    <div className='App'>
      <IpWhitelist />
    </div>
    */

    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<IpWhitelist />} />
            <Route path="/home" element={<IpWhitelist />} />
            <Route path="/Add" element={<Add />} />
            <Route path="/Delete" element={<Delete />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;