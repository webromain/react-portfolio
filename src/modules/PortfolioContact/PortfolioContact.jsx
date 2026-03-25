import { useState, useEffect } from "react";
import "./PortfolioContact.css";

// Délai minimum entre deux envois (en millisecondes)
const SPAM_COOLDOWN = 5000; // 5 secondes
const MAX_MESSAGES_PER_DAY = 3;
const STORAGE_KEY = "lastFormSubmit";
const STORAGE_MESSAGES_KEY = "formSubmitCount";

function PortfolioContact() {
  const [formData, setFormData] = useState({
    email: "",
    object: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);

  // Vérifier le cooldown et le compteur au chargement
  useEffect(() => {
    const lastSubmit = localStorage.getItem(STORAGE_KEY);
    if (lastSubmit) {
      const timePassed = Date.now() - parseInt(lastSubmit);
      const remaining = Math.max(0, SPAM_COOLDOWN - timePassed);
      if (remaining > 0) {
        setCooldownTime(Math.ceil(remaining / 1000));
      }
    }

    // Récupérer et vérifier le compteur journalier
    const storageData = localStorage.getItem(STORAGE_MESSAGES_KEY);
    if (storageData) {
      const { count, date } = JSON.parse(storageData);
      const today = new Date().toDateString();

      // Réinitialiser si c'est un nouveau jour
      if (date !== today) {
        localStorage.setItem(
          STORAGE_MESSAGES_KEY,
          JSON.stringify({ count: 0, date: today }),
        );
        setMessagesCount(0);
      } else {
        setMessagesCount(count);
      }
    }
  }, []);

  // Gestion du cooldown timer
  useEffect(() => {
    if (cooldownTime <= 0) return;

    const timer = setInterval(() => {
      setCooldownTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownTime]);

  // Validation des champs
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        error: "Veuillez entrer une adresse email valide.",
      });
      return false;
    }

    if (formData.message.trim().length < 10) {
      setFormStatus({
        submitted: true,
        success: false,
        error: "Le message doit contenir au moins 10 caractères.",
      });
      return false;
    }

    return true;
  };

  // Vérifier le cooldown anti-spam
  const checkSpamCooldown = () => {
    const lastSubmit = localStorage.getItem(STORAGE_KEY);
    if (!lastSubmit) return true;

    const timePassed = Date.now() - parseInt(lastSubmit);
    if (timePassed < SPAM_COOLDOWN) {
      const remaining = Math.ceil((SPAM_COOLDOWN - timePassed) / 1000);
      setCooldownTime(remaining);
      setFormStatus({
        submitted: true,
        success: false,
        error: `Veuillez attendre ${remaining}s avant d'envoyer un nouveau message.`,
      });
      return false;
    }

    return true;
  };

  // Vérifier la limite journalière
  const checkDailyLimit = () => {
    if (messagesCount >= MAX_MESSAGES_PER_DAY) {
      setFormStatus({
        submitted: true,
        success: false,
        error: `Vous avez atteint la limite de ${MAX_MESSAGES_PER_DAY} messages par jour. Réessayez demain.`,
      });
      return false;
    }

    return true;
  };

  // Gestion du changement des champs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (formStatus.error) {
      setFormStatus({ submitted: false, success: false, error: "" });
    }
  };

  // Gestion de la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier les limites
    if (!checkSpamCooldown()) {
      return;
    }

    if (!checkDailyLimit()) {
      return;
    }

    // Valider le formulaire
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Remplacer par votre endpoint backend réel
      // Exemple: const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error('Erreur serveur');

      // Simulation d'un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Enregistrer le timestamp du dernier envoi
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      setCooldownTime(Math.ceil(SPAM_COOLDOWN / 1000));

      // Incrémenter le compteur journalier
      const today = new Date().toDateString();
      const newCount = messagesCount + 1;
      localStorage.setItem(
        STORAGE_MESSAGES_KEY,
        JSON.stringify({ count: newCount, date: today }),
      );
      setMessagesCount(newCount);

      // Succès
      setFormStatus({
        submitted: true,
        success: true,
        error: "",
      });

      // Réinitialiser le formulaire
      setFormData({ email: "", object: "", message: "" });

      // Effacer le message de succès après 5 secondes
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, error: "" });
      }, 5000);
    } catch (error) {
      // Gestion des erreurs réseau ou serveur
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setFormStatus({
        submitted: true,
        success: false,
        error: "Une erreur s'est produite. Veuillez réessayer plus tard.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Le bouton est désactivé si: en cours d'envoi, en cooldown, limite atteinte, ou formulaire vide
  const isButtonDisabled =
    isLoading ||
    cooldownTime > 0 ||
    messagesCount >= MAX_MESSAGES_PER_DAY ||
    !formData.email ||
    !formData.message;

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">$ Contact Me</h2>

      <div className="contact-unavailable">
        <span className="contact-unavailable-icon">🚧</span>
        <p className="contact-unavailable-title">Formulaire temporairement indisponible</p>
        <p className="contact-unavailable-text">
          Cette fonctionnalité est en cours de développement. En attendant, vous pouvez me contacter directement à l'adresse{" "}
          <a href="mailto:romain.pson@gmail.com" className="contact-unavailable-link">romain.pson@gmail.com</a>.
        </p>
      </div>

      <form
        className="portfolio-contact-form portfolio-contact-form--disabled"
        onSubmit={(e) => e.preventDefault()}
        noValidate
        aria-disabled="true"
      >
        <div>
          <label htmlFor="email">
            Email de contact<span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Votre email de contact"
            disabled
            aria-label="Votre adresse email"
          />
        </div>

        <div>
          <label htmlFor="object">Objet</label>
          <input
            type="text"
            id="object"
            placeholder="Objet de votre message"
            disabled
            aria-label="Objet du message"
          />
        </div>

        <div>
          <label htmlFor="message">
            Votre Message<span className="required">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Votre message"
            disabled
            aria-label="Corps du message"
          ></textarea>
        </div>

        <button type="submit" disabled>
          Formulaire indisponible
        </button>
      </form>
    </section>
  );
}

export default PortfolioContact;
