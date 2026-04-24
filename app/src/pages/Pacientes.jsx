import { useState } from "react";
import { usePacientes } from "../hooks/usePacientes";
import Modal from "../components/Modal";
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from "../services/pacienteService"
import { User, Pencil, Trash2, Plus, CreditCard, IdCard } from "lucide-react";
import { formatarData } from "../utils/formatarData";

export default function Pacientes() {
  const { pacientes, fetchPacientes } = usePacientes()

  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    carteirinha: "",
    dataNascimento: ""
  })

  const openCreate = () => {
    setErrorMsg(null)
    setForm({ nome: "", cpf: "", carteirinha: "", dataNascimento: ""});
    setModal("create");
  }

  const openEdit = (p) => {
    setErrorMsg(null)
    setForm(p);
    setSelected(p);
    setModal("edit");
  }

  const openDelete = (p) => {
    setSelected(p);
    setModal("delete");
  }

  const closeModal = () => {
    setModal(null)
    setSelected(null)
    setErrorMsg(null)
  }

  const handleCreate = async () => {
  try {
    await createPaciente(form)
    closeModal()
    fetchPacientes()
  } catch (error) {
      const msg = error.response?.data?.erro || "Erro ao criar paciente";
      setErrorMsg(msg);
      console.error("Erro ao criar paciente:", error);
    }
  }

  const handleEdit = async () => {
    try {
      await updatePaciente(selected.id, form)
      closeModal()
      fetchPacientes()
    } catch (error) {
      const msg = error.response?.data?.erro || "Erro ao criar paciente";
      setErrorMsg(msg);
      console.error("Erro ao editar paciente:", error);
    }
  }

  const handleDelete = async () => {
    try {
      await deletePaciente(selected.id)
      closeModal()
      fetchPacientes()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="page-content">
        <div className="toolbar">
          <h2 className="page-title">
            <User size={20} /> Pacientes
          </h2>

          <button className="btn btn-primary" onClick={openCreate}>
            <Plus size={16} /> Novo Paciente
          </button>
        </div>

        <div className="table-wrap">
          {pacientes.length === 0 ? (
            <div className="empty-state">
              <User size={40} />
              <h3>Nenhum paciente encontrado</h3>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Carteirinha</th>
                  <th>Nascimento</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {pacientes.map((p) => (
                  <tr key={p.id}>
                    <td className="id-cell">{p.id}</td>
                    <td>
                      <div className="name-cell">
                        <div className="avatar">
                          <User size={16} />
                        </div>
                        <strong>{p.nome}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-blue">
                        <IdCard size={12} style={{ marginRight: 4 }} />
                        {p.cpf}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-orange">
                        <CreditCard size={12} style={{ marginRight: 4 }} />
                        {p.carteirinha}
                      </span>
                    </td>

                    <td>
                      {formatarData(p.dataNascimento)}
                    </td>

                    <td>
                      <div className="td-actions">
                        <button className="btn-icon" onClick={() => openEdit(p)} >
                          <Pencil size={16} />
                        </button>

                        <button className="btn-icon btn-danger" onClick={() => openDelete(p)} >
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
          title={modal === "create" ? "Novo Paciente" : "Editar Paciente"}
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

          <input type="date" value={form.dataNascimento} onChange={(e) =>
              setForm({ ...form, dataNascimento: e.target.value })
            }
          />

          <input placeholder="Carteirinha" value={form.carteirinha} onChange={(e) =>
              setForm({ ...form, carteirinha: e.target.value })
            }
          />

          <input placeholder="CPF" value={form.cpf} onChange={(e) =>
              setForm({ ...form, cpf: e.target.value })
            }
          />
        </Modal>
      )}

      {modal === "delete" && selected && (
        <Modal isOpen onClose={closeModal}>
          <h3>Confirmar remoção</h3>

          <p>
            Deseja remover <strong>{selected.nome}</strong>?
          </p>

          <div className="modal-actions">
            <button onClick={closeModal}> Cancelar </button>
            <button className="btn-danger" onClick={handleDelete}> Excluir </button>
          </div>
        </Modal>
      )}
    </>
  )
}