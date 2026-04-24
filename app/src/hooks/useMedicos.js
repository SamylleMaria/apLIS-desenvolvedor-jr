import { useEffect, useState } from "react"
import { getMedicos } from "../services/medicoService"

export function useMedicos() {
  const [medicos, setMedicos] = useState([])

  const fetchMedicos = () => {
    getMedicos().then(res => setMedicos(res.data))
  }

  useEffect(() => {
    fetchMedicos()
  }, [])

  return { medicos, fetchMedicos }
}