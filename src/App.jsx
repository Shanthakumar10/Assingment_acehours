import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Moviesearch from './pages/Moviesearch';
import Translator from './pages/Translator';
import MovieInfo from './components/MovieInfo';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Translator/>}/>
          <Route path='/Translator' element={<Translator/>}/>
          <Route path='/Movie' element={<Moviesearch/>}/>
          <Route path='/MovieInfo' element={<MovieInfo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    )
}

export default App
