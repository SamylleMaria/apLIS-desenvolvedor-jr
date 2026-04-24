export default function ConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>{message}</h3>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={onCancel}>Cancelar</button>

          <button
            style={{ background: "red" }}
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}