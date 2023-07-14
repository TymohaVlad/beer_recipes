import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SingleRecipe from './pages/SingleRecipe';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/recipes/:id' element={<SingleRecipe/>}/>
      </Routes>
    </div>
  );
}

export default App;
