export default function PacienteList ({ pacientes}) {
    if (!pacientes.length) return <p>Nenhum paciente encontrado</p>

    return (
        <ul>
            {pacientes.map((p) => (
                <li key={p.id}>
                    {p.nome} - CRM: {p.crm}/{p.ufcrm}
                </li>
            ))}
        </ul>
    )
}