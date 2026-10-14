
import { useState } from 'react'

const registrosIniciales = [
  { id: 1, ubicacion: 'La Candelaria', riesgo: 'BAJO', estado: 'EN_PROCESO' },
  { id: 2, ubicacion: 'Ricaurte', riesgo: 'MEDIO', estado: 'REGISTRADO' },
  { id: 3, ubicacion: 'Danubio Azul', riesgo: 'ALTO', estado: 'REGISTRADO' }
]

const formularioInicial = {
  ubicacion: '',
  riesgo: '',
  descripcion: ''
}

function Microbasureros() {
  const [registros, setRegistros] = useState(registrosIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [filtroRiesgo, setFiltroRiesgo] = useState('TODOS')
  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

  const registrosFiltrados = registros.filter((registro) => {
    const coincideBusqueda = registro.ubicacion
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    return coincideBusqueda &&
      (filtroRiesgo === 'TODOS' || registro.riesgo === filtroRiesgo)
  })

  function actualizarCampo(evento) {
    const { name, value } = evento.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }))

    setErrores((anterior) => ({
      ...anterior,
      [name]: ''
    }))

    setMensaje('')
  }

  function registrarMicrobasurero(evento) {
    evento.preventDefault()

    const nuevosErrores = {}
    const ubicacion = formulario.ubicacion.trim()
    const descripcion = formulario.descripcion.trim()

    if (ubicacion.length < 3 || ubicacion.length > 80) {
      nuevosErrores.ubicacion =
        'La ubicación debe contener entre 3 y 80 caracteres.'
    }

    if (!['BAJO', 'MEDIO', 'ALTO'].includes(formulario.riesgo)) {
      nuevosErrores.riesgo = 'Selecciona un nivel de riesgo válido.'
    }

    if (descripcion.length < 10 || descripcion.length > 250) {
      nuevosErrores.descripcion =
        'La descripción debe contener entre 10 y 250 caracteres.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      setMensaje('')
      return
    }

    const nuevoRegistro = {
      id: Math.max(0, ...registros.map((registro) => registro.id)) + 1,
      ubicacion,
      riesgo: formulario.riesgo,
      estado: 'REGISTRADO',
      descripcion
    }

    setRegistros((anteriores) => [...anteriores, nuevoRegistro])
    setFormulario(formularioInicial)
    setErrores({})
    setBusqueda('')
    setFiltroRiesgo('TODOS')
    setMensaje('Microbasurero registrado correctamente en esta demostración.')
  }

  return (
    <section>
      <h2>Microbasureros registrados</h2>
      <p>
        Consulta y seguimiento de puntos de acumulación
        inadecuada de residuos sólidos.
      </p>

      <div className="filtros">
        <div>
          <label htmlFor="busqueda">Buscar ubicación</label>
          <input
            id="busqueda"
            type="search"
            placeholder="Ejemplo: Ricaurte"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>

        <div>
          <label htmlFor="riesgo">Nivel de riesgo</label>
          <select
            id="riesgo"
            value={filtroRiesgo}
            onChange={(evento) => setFiltroRiesgo(evento.target.value)}
          >
            <option value="TODOS">Todos</option>
            <option value="BAJO">Bajo</option>
            <option value="MEDIO">Medio</option>
            <option value="ALTO">Alto</option>
          </select>
        </div>
      </div>

      <div className="tabla-contenedor">
        <table>
          <caption>Listado de microbasureros de demostración</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Nivel de riesgo</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.id}</td>
                <td>{registro.ubicacion}</td>
                <td>{registro.riesgo}</td>
                <td>{registro.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p aria-live="polite">
        Registros encontrados: {registrosFiltrados.length}
      </p>

      <div className="formulario-panel">
        <h3>Registrar nuevo microbasurero</h3>
        <p>
          Formulario de demostración. Los datos se conservan
          temporalmente mientras la aplicación está abierta.
        </p>

        <form onSubmit={registrarMicrobasurero} noValidate>
          <div className="campo-formulario">
            <label htmlFor="nueva-ubicacion">
              Ubicación *
            </label>
            <input
              id="nueva-ubicacion"
              name="ubicacion"
              type="text"
              value={formulario.ubicacion}
              onChange={actualizarCampo}
              maxLength={80}
              required
              aria-invalid={Boolean(errores.ubicacion)}
              aria-describedby={
                errores.ubicacion ? 'error-ubicacion' : undefined
              }
              placeholder="Ejemplo: Barrio San Cristóbal"
            />
            {errores.ubicacion && (
              <p className="error" id="error-ubicacion">
                {errores.ubicacion}
              </p>
            )}
          </div>

          <div className="campo-formulario">
            <label htmlFor="nuevo-riesgo">
              Nivel de riesgo *
            </label>
            <select
              id="nuevo-riesgo"
              name="riesgo"
              value={formulario.riesgo}
              onChange={actualizarCampo}
              required
              aria-invalid={Boolean(errores.riesgo)}
              aria-describedby={
                errores.riesgo ? 'error-riesgo' : undefined
              }
            >
              <option value="">Selecciona una opción</option>
              <option value="BAJO">Bajo</option>
              <option value="MEDIO">Medio</option>
              <option value="ALTO">Alto</option>
            </select>
            {errores.riesgo && (
              <p className="error" id="error-riesgo">
                {errores.riesgo}
              </p>
            )}
          </div>

          <div className="campo-formulario">
            <label htmlFor="nueva-descripcion">
              Descripción del punto *
            </label>
            <textarea
              id="nueva-descripcion"
              name="descripcion"
              value={formulario.descripcion}
              onChange={actualizarCampo}
              maxLength={250}
              rows={4}
              required
              aria-invalid={Boolean(errores.descripcion)}
              aria-describedby={
                errores.descripcion ? 'error-descripcion' : undefined
              }
              placeholder="Describe la acumulación de residuos..."
            />
            {errores.descripcion && (
              <p className="error" id="error-descripcion">
                {errores.descripcion}
              </p>
            )}
          </div>

          <button className="boton-guardar" type="submit">
            Registrar microbasurero
          </button>

          <p role="status" aria-live="polite" className="mensaje-exito">
            {mensaje}
          </p>
        </form>
      </div>
    </section>
  )
}

export default Microbasureros
