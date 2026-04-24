import { NavLink } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="sidebar"> 
    <div className="logo">
      <div className="divLogo">
        <img className="iconeLogo" src="./../public/favicon.svg" alt="Icone apLIS" />
        <div>
          <h2 className="logo">ap<span className="LISlogo">LIS</span></h2>
          <p className="tagLine1">ANATOMIC PATHOLOGY </p>
        </div>
      </div>
      <div text>
        <p className="tagLine2">LABORATORY INFORMATION SYSTEM</p>
      </div>
    </div>

      <nav className="nav">
        <NavLink to="/pacientes" className="nav-item">
          <span>Pacientes</span>
        </NavLink>

        <NavLink to="/medicos" className="nav-item">
          <span>Médicos</span>
        </NavLink>
      </nav>
    </aside>
  )
}