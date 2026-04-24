import axios from "axios"

export const apiJS = axios.create({
  baseURL: "http://localhost:3000",
})

export const apiPHP = axios.create({
  baseURL: "http://localhost:8000",
})