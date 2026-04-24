import { apiJS } from "./api"

export const getPacientes = () =>
  apiJS.get("/api/v1/pacientes")

export const createPaciente = (data) =>
  apiJS.post("/api/v1/pacientes", data)

export const updatePaciente = (id, data) =>
  apiJS.put(`/api/v1/pacientes/${id}`, data)

export const deletePaciente = (id) =>
  apiJS.delete(`/api/v1/pacientes/${id}`)