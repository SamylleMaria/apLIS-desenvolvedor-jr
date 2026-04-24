import { apiPHP } from "./api"

export const getMedicos = () =>
  apiPHP.get("/api/v1/medicos")

export const createMedico = (data) =>
  apiPHP.post("/api/v1/medicos", data)

export const updateMedico = (id, data) =>
  apiPHP.put(`/api/v1/medicos/${id}`, data)

export const deleteMedico = (id) =>
  apiPHP.delete(`/api/v1/medicos/${id}`)