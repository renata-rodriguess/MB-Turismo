import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import Login from './pages/Login';
import Pesquisa from './pages/Pesquisa';
import PontosTuristicos from './pages/PontosTuristicos';
import Trilhas from './pages/Trilhas';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/pesquisa" element={<Pesquisa />} />
                <Route
                    path="/ponto-turistico/:id"
                    element={<PontosTuristicos />}
                />
                <Route
                    path="/trilha/:pontoId"
                    element={<Trilhas />}
                />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);