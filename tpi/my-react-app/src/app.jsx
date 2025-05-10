import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Inicio from './components/inicio.jsx';
import Torneos from './components/torneo.jsx';
import Crear from './components/crear.jsx';
import Equipo from './components/equipo.jsx';
import BuscarTabla from './components/buscartabla.jsx'; 
import MostrarTabla from './components/mostrartabla.jsx';
import AgregarJornada from './components/agregarjornada.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/torneo" element={<Torneos />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/equipo/:id" element={<Equipo />} />
        <Route path="/buscartabla" element={<BuscarTabla />} />
        <Route path="/mostrartabla" element={<MostrarTabla />} />
        <Route path="/agregarjornada" element={<AgregarJornada />} />
    
      </Routes>
    </Router>
  );
}

export default App;
