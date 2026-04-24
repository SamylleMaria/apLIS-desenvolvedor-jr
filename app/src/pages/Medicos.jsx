import { useState } from "react"
import { useMedicos } from "../hooks/useMedicos"
import Modal from "../components/Modal"
import { User, Stethoscope, Pencil, Trash2, Plus } from "lucide-react"
import { createMedico, updateMedico, deleteMedico } from "../services/medicoService"

export default function Medicos() {
  const { medicos, fetchMedicos } = useMedicos()

  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const [form, setForm] = useState({
    nome: "",
    crm: "",
    ufcrm: "",
  })


  const openCreate = () => {
    setErrorMsg(null)
    setForm({ nome: "", crm: "", ufcrm: "" })
    setModal("create")
  }

  const openEdit = (m) => {
    setErrorMsg(null)
    setForm(m)
    setSelected(m)
    setModal("edit")
  }

  const openDelete = (m) => {
    setSelected(m)
    setModal("delete")
  }

const closeModal = () => {
    setModal(null)
    setSelected(null)
    setErrorMsg(null) 
  }


  const handleCreate = async () => {
    try {
      await createMedico(form)
      closeModal()
      fetchMedicos()
    } catch (error) {
      const msg = error.response?.data?.erro || "Erro ao criar médico"
      setErrorMsg(msg)
      console.error("Erro ao criar médico:", error)
    }
  }

  const handleEdit = async () => {
    try {
      await updateMedico(selected.id, form)
      closeModal()
      fetchMedicos()
    } catch (error) {
      const msg = error.response?.data?.erro || "Erro ao editar médico"
      setErrorMsg(msg)
      console.error("Erro ao editar médico:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteMedico(selected.id)
      closeModal()
      fetchMedicos()
    } catch (error) {
      const mensagemErro = error.response?.data?.erro || "Erro ao deletar médico"
      console.error("Erro ao deletar médico:", error)
    }
  }


  return (
    <>
      <div className="page-content">
        <div className="toolbar">
          <h2 className="page-title">
            <Stethoscope size={20} /> Médicos
          </h2>

          <button className="btn btn-primary" onClick={openCreate}>
            <Plus size={16} /> Novo Médico
          </button>
        </div>

        <div className="table-wrap">
          {medicos.length === 0 ? (
            <div className="empty-state">
              <Stethoscope size={40} />
              <h3>Nenhum médico encontrado</h3>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>CRM</th>
                  <th>UF</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {medicos.map((m) => (
                  <tr key={m.id}>
                    <td className="id-cell">{m.id}</td>

                    <td>
                      <div className="name-cell">
                        <div className="avatar">
                          <User size={16} />
                        </div>
                        <strong>{m.nome}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-blue">
                        {m.crm}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-orange">
                        {m.ufcrm}
                      </span>
                    </td>

                    <td>
                      <div className="td-actions">
                        <button
                          className="btn-icon"
                          onClick={() => openEdit(m)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="btn-icon btn-danger"
                          onClick={() => openDelete(m)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

       {(modal === "create" || modal === "edit") && (
        <Modal isOpen onClose={closeModal}
          title={modal === "create" ? "Novo Médico" : "Editar Médico"}
          footer={
            <>
              <button className="btn-ghost" onClick={closeModal}> Cancelar </button>

              <button className="btn-primary" onClick={modal === "create" ? handleCreate : handleEdit}> Salvar </button>
            </>
          }
        >
          {errorMsg && <p style={{ color: 'red', fontSize: '13px', margin: '0 0 10px 0' }}>{errorMsg}</p>}

          <input placeholder="Nome" value={form.nome} onChange={(e) =>
              setForm({ ...form, nome: e.target.value })
            }
          />

          <input placeholder="CRM" value={form.crm} onChange={(e) =>
              setForm({ ...form, crm: e.target.value })
            }
          />

          <input placeholder="UF" value={form.ufcrm} onChange={(e) =>
              setForm({ ...form, ufcrm: e.target.value })
            }
          />
        </Modal>
      )}

      {modal === "delete" && selected && (
        <Modal isOpen onClose={closeModal} title="Confirmar remoção"
          footer={
            <>
              <button className="btn-ghost" onClick={closeModal}>
                Cancelar
              </button>

              <button className="btn-danger" onClick={handleDelete} > Excluir </button>
            </>
          }
        >
          <p> Deseja remover <strong>{selected.nome}</strong>? </p>
        </Modal>
      )}
    </>
  )
}