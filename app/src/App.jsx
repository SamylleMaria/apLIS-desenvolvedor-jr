import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Pacientes from "./pages/Pacientes"
import Medicos from "./pages/Medicos"
import { Routes, Route } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Header />

        <div className="content">
          <Routes>
            <Route path="/" element={<Pacientes />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/medicos" element={<Medicos />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App