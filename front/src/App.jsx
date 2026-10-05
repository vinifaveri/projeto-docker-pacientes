import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [patients, setPatients] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    fetch('/api/patients')
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            'Erro ao buscar pacientes'
          )
        }

        return res.json()
      })

      .then((dados) => {
        setPatients(dados)
      })

      .catch((e) => {
        setErro(e.message)
      })

      .finally(() => {
        setCarregando(false)
      })
  }, [])

  if (carregando) {
    return <p>Carregando...</p>
  }

  if (erro) {
    return <p>{erro}</p>
  }

  return (
    <div className="container">
      <h1>Pacientes</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome completo</th>
            <th>Documento</th>
            <th>Tipo sanguíneo</th>
            <th>Alergias</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>

              <td>
                {patient.full_name}
              </td>

              <td>
                {patient.document}
              </td>

              <td>
                {patient.blood_type}
              </td>

              <td>
                {patient.allergies || 'Nenhuma'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {patients.length === 0 && (
        <p>
          Nenhum paciente cadastrado.
        </p>
      )}
    </div>
  )
}

export default App
