import { useLocation } from "react-router-dom"

export default function Header() {
  const location = useLocation()

  const title = location.pathname === "/medicos" ? "Médicos" : "Pacientes"

  return (
    <header className="header">
      <h2>{title}</h2>

      <div className="user">
        Admin
      </div>
    </header>
  );
}