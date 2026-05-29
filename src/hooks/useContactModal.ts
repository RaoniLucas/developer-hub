// hooks/useContactModal.ts
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface Feedback {
  type: "success" | "error";
  message: string;
}

interface UseContactModalReturn {
  formData: FormData;
  isSubmitting: boolean;
  feedback: Feedback | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useContactModal(onClose: () => void): UseContactModalReturn {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem");
      }

      console.log(response)

      setFeedback({
        type: "success",
        message: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
      });

      resetForm();

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("❌ Erro detalhado:", error);
      setFeedback({
        type: "error",
        message: "Erro ao enviar mensagem. Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    feedback,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
