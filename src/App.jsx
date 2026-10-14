

import {
  BrowserRouter,
  NavLink,
  Routes,
  Route
} from 'react-router-dom'

import Inicio from './pages/Inicio'
import Microbasureros from './pages/Microbasureros'
import Reportes from './pages/Reportes'
import Recoleccion from './pages/Recoleccion'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="encabezado">
          <h1>Sistema de Gestión de Microbasureros</h1>
          <p>
            Plataforma para el seguimiento y gestión de residuos
          </p>
        </header>

        <nav className="menu" aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/microbasureros">Microbasureros</NavLink>
          <NavLink to="/reportes">Reportes</NavLink>
          <NavLink to="/recoleccion">Recolección</NavLink>
        </nav>

        <main className="contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route
              path="/microbasureros"
              element={<Microbasureros />}
            />
            <Route path="/reportes" element={<Reportes />} />
            <Route
              path="/recoleccion"
              element={<Recoleccion />}
            />
          </Routes>
        </main>

        <footer className="pie">
          Proyecto formativo SENA -
          Evidencia GA6-220501096-AA3/AA4-EV01
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
