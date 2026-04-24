import { useEffect, useState } from "react"
import { getPacientes } from "../services/pacienteService"

export function usePacientes() {
  const [pacientes, setPacientes] = useState([])

  const fetchPacientes = () => {
    getPacientes().then(res => setPacientes(res.data))
  }

  useEffect(() => {
    fetchPacientes()
  }, [])

  return { pacientes, fetchPacientes }
}