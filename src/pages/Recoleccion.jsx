
import { useState } from 'react'

const actividadesIniciales = [
  {
    id: 1,
    ubicacion: 'La Candelaria',
    fecha: '2026-10-15',
    responsable: 'Equipo de recolección 1',
    estado: 'Programada'
  },
  {
    id: 2,
    ubicacion: 'Danubio Azul',
    fecha: '2026-10-16',
    responsable: 'Equipo de recolección 2',
    estado: 'Programada'
  }
]

function Recoleccion() {
  const [actividades, setActividades] = useState(actividadesIniciales)
  const [filtro, setFiltro] = useState('Todas')

  const actividadesFiltradas = actividades.filter((actividad) =>
    filtro === 'Todas' || actividad.estado === filtro
  )

  function completarActividad(id) {
    setActividades((anteriores) =>
      anteriores.map((actividad) =>
        actividad.id === id
          ? { ...actividad, estado: 'Completada' }
          : actividad
      )
    )
  }

  return (
    <section>
      <h2>Actividades de recolección</h2>
      <p>
        Consulta y seguimiento de actividades programadas
        para la recolección de residuos sólidos.
      </p>

      <div className="campo-formulario">
        <label htmlFor="filtro-estado">Filtrar por estado</label>
        <select
          id="filtro-estado"
          value={filtro}
          onChange={(evento) => setFiltro(evento.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Programada">Programadas</option>
          <option value="Completada">Completadas</option>
        </select>
      </div>

      <div className="tabla-contenedor">
        <table>
          <caption>Actividades de recolección de demostración</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Fecha</th>
              <th scope="col">Responsable</th>
              <th scope="col">Estado</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {actividadesFiltradas.map((actividad) => (
              <tr key={actividad.id}>
                <td>{actividad.id}</td>
                <td>{actividad.ubicacion}</td>
                <td>{actividad.fecha}</td>
                <td>{actividad.responsable}</td>
                <td>{actividad.estado}</td>
                <td>
                  {actividad.estado === 'Programada' ? (
                    <button
                      type="button"
                      className="boton-guardar"
                      onClick={() => completarActividad(actividad.id)}
                    >
                      Marcar completada
                    </button>
                  ) : (
                    'Finalizada'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {actividadesFiltradas.length === 0 && (
        <p>No hay actividades para el estado seleccionado.</p>
      )}

      <p aria-live="polite">
        Actividades encontradas: {actividadesFiltradas.length}
      </p>
    </section>
  )
}

export default Recoleccion
