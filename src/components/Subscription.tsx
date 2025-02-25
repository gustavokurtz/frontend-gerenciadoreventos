import { useState } from "react";
import axios from "axios";
import styles from "../EventsList.module.css";

interface SubscriptionData {
  name: string;
  email: string;
}

const Subscription = () => {
  const [formData, setFormData] = useState<SubscriptionData>({ name: "", email: "" });
  const [prettyName, setPrettyName] = useState("");
  const [userId, setUserId] = useState<number | undefined>();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prettyName) {
      setMessage("❌ Você precisa inserir o nome do evento.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const url = `https://revinfinity.pro/subscription/${prettyName}`;
      const response = await axios.post(url, formData);

      console.log("Resposta da API:", response.data); // DEBUG

      if (response.status === 200) {
        const userIdFromApi = response.data?.subscriptionNumber; // Pegando o ID correto

        if (userIdFromApi) {
          setUserId(userIdFromApi);
          setMessage(`✅ Inscrição realizada com sucesso! Seu ID: ${userIdFromApi}`);
        } else {
          setMessage("❌ Inscrição realizada, mas não foi possível encontrar o ID do usuário.");
        }
      } else {
        setMessage("❌ Erro ao realizar a inscrição.");
      }
    } catch (error) {
      console.error("Erro ao realizar inscrição:", error);
      setMessage("❌ Erro ao realizar a inscrição. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📝 Inscrição no Evento</h2>

      {message && <p className={styles.eventLocation}>{message}</p>}

      <form onSubmit={handleSubscription} className={styles.eventCard}>
        <label className={styles.eventTitle}>
          🔍 PrettyName do Evento:
          <input type="text" value={prettyName} onChange={(e) => setPrettyName(e.target.value)} required />
        </label>

        <label className={styles.eventTitle}>
          👤 Nome:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label className={styles.eventTitle}>
          📧 E-mail:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Cadastrando..." : "Criar Inscrição"}
        </button>
      </form>

      {userId && (
        <p className={styles.eventDetails}>
          🏆 Seu link de afiliado: <strong>{`https://revinfinity.pro/subscription/${prettyName}/${userId}`}</strong>
        </p>
      )}
    </div>
  );
};

export default Subscription;
