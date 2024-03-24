// Ваш компонент Layout
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import SingleMatch from '../singleMatch/SingleMatch';
import Create from '../create/Create';
import FreePlayers from '../freePlayers/FreePlayers';
import CreateFP from '../createFP/CreateFP';
import FAQ from '../faq/FAQ';
import SingleFP from '../singleFP/SingleFP';

const Layout = ({ matchData }) => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/singleMatch/:id' element={<SingleMatch  />} />
        <Route path='/singleFreePlayer/:id' element={<SingleFP />} />
        <Route path='/create-match' element={<Create />} /> 
        <Route path='/freePlayers' element={<FreePlayers />} />
        <Route path='/createFP' element={<CreateFP />} />
        <Route path='/FAQ' element={<FAQ />} />
      </Routes>
    </div>
  );
};

export default Layout;
