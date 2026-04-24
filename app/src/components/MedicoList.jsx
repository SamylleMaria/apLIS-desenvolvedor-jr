export default function MedicoList ({ medicos }) {
    if (!medicos.length) return <p>Nenhum médico encontrado</p>

    return (
        <ul>
            {medicos.map((m) => (
                <li key={m.id}>
                    {m.nome} - CRM: {m.crm}/{m.ufcrm}
                </li>
            ))}
        </ul>
    )
}