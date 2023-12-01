import React from 'react';
import Indexpage from './components/pages/Indexpage';
import AddProductform from './components/pages/addProductform';
import {
  browserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";


function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Indexpage />} />
          <Route path="/addProduct" element= {<AddProductform />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
