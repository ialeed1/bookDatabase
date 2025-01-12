import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Author } from './components/Author/Author';
import { Book } from './components/Book/Book';
import { HomePage } from './components/HomePage/HomePage';
          //Edit <code>src/App.tsx</code> and save to reload.

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage/>}/>
          <Route path="/book" element={<Book/>}/>
          <Route path="/author" element={<Author/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
