
import { useState } from 'react'

const reportesIniciales = [
  {
    id: 1,
    ubicacion: 'La Candelaria',
    tipo: 'Residuos mixtos',
    descripcion: 'Acumulación de residuos en espacio público.',
    estado: 'Recibido'
  },
  {
    id: 2,
    ubicacion: 'Ricaurte',
    tipo: 'Escombros',
    descripcion: 'Disposición inadecuada de materiales de construcción.',
    estado: 'En revisión'
  },
  {
    id: 3,
    ubicacion: 'Danubio Azul',
    tipo: 'Residuos ordinarios',
    descripcion: 'Acumulación de bolsas y residuos domiciliarios.',
    estado: 'Recibido'
  }
]

const formularioInicial = {
  ubicacion: '',
  tipo: '',
  descripcion: '',
  correo: ''
}

function Reportes() {
  const [reportes, setReportes] = useState(reportesIniciales)
  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

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

  function enviarReporte(evento) {
    evento.preventDefault()

    const nuevosErrores = {}
    const ubicacion = formulario.ubicacion.trim()
    const descripcion = formulario.descripcion.trim()
    const correo = formulario.correo.trim()

    if (ubicacion.length < 3 || ubicacion.length > 80) {
      nuevosErrores.ubicacion =
        'La ubicación debe tener entre 3 y 80 caracteres.'
    }

    if (!['Residuos mixtos', 'Escombros',
      'Residuos ordinarios'].includes(formulario.tipo)) {
      nuevosErrores.tipo = 'Selecciona un tipo de residuo.'
    }

    if (descripcion.length < 10 || descripcion.length > 250) {
      nuevosErrores.descripcion =
        'La descripción debe tener entre 10 y 250 caracteres.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      setMensaje('')
      return
    }

    const nuevoReporte = {
      id: Math.max(0, ...reportes.map((r) => r.id)) + 1,
      ubicacion,
      tipo: formulario.tipo,
      descripcion,
      estado: 'Recibido'
    }

    setReportes((anteriores) => [...anteriores, nuevoReporte])
    setFormulario(formularioInicial)
    setErrores({})
    setMensaje('Reporte ciudadano registrado correctamente.')
  }

  return (
    <section>
      <h2>Reportes ciudadanos</h2>
      <p>
        Registro y seguimiento de reportes sobre acumulación
        inadecuada de residuos sólidos.
      </p>

      <div className="tabla-contenedor">
        <table>
          <caption>Reportes ciudadanos de demostración</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Tipo de residuo</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte) => (
              <tr key={reporte.id}>
                <td>{reporte.id}</td>
                <td>{reporte.ubicacion}</td>
                <td>{reporte.tipo}</td>
                <td>{reporte.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p aria-live="polite">
        Total de reportes: {reportes.length}
      </p>

      <div className="formulario-panel">
        <h3>Registrar nuevo reporte ciudadano</h3>
        <p>
          Completa los campos obligatorios para registrar
          una situación de acumulación de residuos.
        </p>

        <form onSubmit={enviarReporte} noValidate>
          <div className="campo-formulario">
            <label htmlFor="reporte-ubicacion">Ubicación *</label>
            <input
              id="reporte-ubicacion"
              name="ubicacion"
              value={formulario.ubicacion}
              onChange={actualizarCampo}
              maxLength={80}
              aria-invalid={Boolean(errores.ubicacion)}
              aria-describedby={
                errores.ubicacion ? 'error-reporte-ubicacion' : undefined
              }
              required
              placeholder="Ejemplo: Barrio Santa Fe"
            />
            {errores.ubicacion && (
              <p className="error" id="error-reporte-ubicacion">
                {errores.ubicacion}
              </p>
            )}
          </div>

          <div className="campo-formulario">
            <label htmlFor="reporte-tipo">Tipo de residuo *</label>
            <select
              id="reporte-tipo"
              name="tipo"
              value={formulario.tipo}
              onChange={actualizarCampo}
              aria-invalid={Boolean(errores.tipo)}
              aria-describedby={
                errores.tipo ? 'error-reporte-tipo' : undefined
              }
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="Residuos mixtos">Residuos mixtos</option>
              <option value="Escombros">Escombros</option>
              <option value="Residuos ordinarios">
                Residuos ordinarios
              </option>
            </select>
            {errores.tipo && (
              <p className="error" id="error-reporte-tipo">
                {errores.tipo}
              </p>
            )}
          </div>

          <div className="campo-formulario">
            <label htmlFor="reporte-descripcion">
              Descripción de la situación *
            </label>
            <textarea
              id="reporte-descripcion"
              name="descripcion"
              rows={4}
              maxLength={250}
              value={formulario.descripcion}
              onChange={actualizarCampo}
              aria-invalid={Boolean(errores.descripcion)}
              aria-describedby={
                errores.descripcion ? 'error-reporte-descripcion' : undefined
              }
              required
              placeholder="Describe los residuos y la situación observada..."
            />
            {errores.descripcion && (
              <p className="error" id="error-reporte-descripcion">
                {errores.descripcion}
              </p>
            )}
          </div>

          <div className="campo-formulario">
            <label htmlFor="reporte-correo">
              Correo electrónico *
            </label>
            <input
              id="reporte-correo"
              name="correo"
              type="email"
              maxLength={120}
              value={formulario.correo}
              onChange={actualizarCampo}
              aria-invalid={Boolean(errores.correo)}
              aria-describedby={
                errores.correo ? 'error-reporte-correo' : undefined
              }
              required
              placeholder="ejemplo@correo.com"
            />
            {errores.correo && (
              <p className="error" id="error-reporte-correo">
                {errores.correo}
              </p>
            )}
          </div>

          <button type="submit" className="boton-guardar">
            Enviar reporte
          </button>

          <p role="status" className="mensaje-exito">
            {mensaje}
          </p>
        </form>
      </div>
    </section>
  )
}

export default Reportes
