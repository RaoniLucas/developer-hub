import { useContactModal } from "../../../hooks/useContactModal";
import "./ContactModal.css";

interface ContactModalProps {
  onClose: () => void;
}

export function ContactModal({ onClose }: ContactModalProps) {
  const { formData, isSubmitting, feedback, handleChange, handleSubmit } =
    useContactModal(onClose);

  const XSVG = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="contact-info">
      <header className="contact-info__header">
        <button
          className="contact-info__close"
          onClick={onClose}
          type="button"
          disabled={isSubmitting}
        >
          <XSVG />
        </button>
      </header>

      <main className="contact-info__main">
        {feedback && (
          <div className="contact-info__feedback"
            style={{
              backgroundColor:
                feedback.type === "success" ? "#d4edda" : "#f8d7da",
              color: feedback.type === "success" ? "#155724" : "#721c24",
              border: `1px solid ${
                feedback.type === "success" ? "#c3e6cb" : "#f5c6cb"
              }`,
            }}
          >
            {feedback.message}
          </div>
        )}

        <form className="contact-info__list" onSubmit={handleSubmit}>
          <label htmlFor="firstName">Nome</label>
          <input
            id="firstName"
            type="text"
            placeholder="Primeiro Nome"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          <input
            id="lastName"
            type="text"
            placeholder="Segundo Nome"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />

          <label htmlFor="subject">Assunto</label>
          <input
            id="subject"
            type="text"
            placeholder="Assunto da mensagem"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />

          <label htmlFor="message">Mensagem</label>
          <textarea
            id="message"
            placeholder="Digite sua mensagem aqui..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            rows={5}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </main>
    </div>
  );
}
