import { useState } from "react";
import axios from "axios";
import styles from "../EventsList.module.css"; // Usando o mesmo CSS dos eventos

// Definição do tipo do evento
interface Event {
  title: string;
  location: string;
  price: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const CreateEvent = () => {
  const [formData, setFormData] = useState<Event>({
    title: "",
    location: "",
    price: 0,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Atualiza os valores do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  // Envia os dados do evento para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post("https://revinfinity.pro/events", formData);
      setMessage("✅ Evento criado com sucesso!");
      setFormData({ title: "", location: "", price: 0, startDate: "", endDate: "", startTime: "", endTime: "" });
    } catch (error) {
      setMessage("❌ Erro ao criar o evento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📝 Criar Novo Evento</h2>

      {message && <p className={styles.eventLocation}>{message}</p>}

      <form onSubmit={handleSubmit} className={styles.eventCard}>
        <label className={styles.eventTitle}>
          📌 Título:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label className={styles.eventTitle}>
          📍 Localização:
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>

        <label className={styles.eventTitle}>
          💰 Preço:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>

        <label className={styles.eventTitle}>
          🗓 Data de Início:
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </label>

        <label className={styles.eventTitle}>
          🗓 Data de Fim:
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        </label>

        <label className={styles.eventTitle}>
          ⏰ Hora de Início:
          <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
        </label>

        <label className={styles.eventTitle}>
          ⏰ Hora de Fim:
          <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
        </label>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Criando..." : "Criar Evento"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
