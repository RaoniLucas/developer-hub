export const EMAILJS_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
};

const validateConfig = () => {
  const missing: string[] = [];

  if (!EMAILJS_CONFIG.PUBLIC_KEY) missing.push("VITE_EMAILJS_PUBLIC_KEY");
  if (!EMAILJS_CONFIG.SERVICE_ID) missing.push("VITE_EMAILJS_SERVICE_ID");
  if (!EMAILJS_CONFIG.TEMPLATE_ID) missing.push("VITE_EMAILJS_TEMPLATE_ID");

  if (missing.length > 0) {
    console.error("❌ Variáveis de ambiente faltando:", missing);
    throw new Error(`EmailJS config missing: ${missing.join(", ")}`);
  }

  console.log("✅ EmailJS config carregada com sucesso");
};

validateConfig();
