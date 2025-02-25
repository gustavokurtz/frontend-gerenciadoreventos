import { useState } from "react";
import axios from "axios";
import styles from "../EventsList.module.css";

interface Participant {
  userId: number;
  name: string;
  subscribers: number;
}

const Ranking = () => {
  const [prettyName, setPrettyName] = useState("");
  const [ranking, setRanking] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar o ranking do evento
  const fetchRanking = async () => {
    if (!prettyName) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://revinfinity.pro/subscription/${prettyName}/ranking`);
      setRanking(response.data.slice(0, 3)); // Pegando os 3 primeiros colocados
    } catch (err) {
      setError("❌ Erro ao buscar o ranking. Verifique o nome do evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🏆 Ranking do Evento</h2>

      <div className={styles.eventCard}>
        <label className={styles.eventTitle}>
          🔍 Nome do Evento:
          <input
            type="text"
            value={prettyName}
            onChange={(e) => setPrettyName(e.target.value)}
            placeholder="Digite o nome amigável do evento..."
            required
          />
        </label>

        <button className={styles.button} onClick={fetchRanking} disabled={loading}>
          {loading ? "Carregando..." : "Buscar Ranking"}
        </button>
      </div>

      {error && <p className={styles.eventLocation}>{error}</p>}

      <ul className={styles.eventGrid}>
        {ranking.map((participant, index) => (
          <li key={participant.userId} className={styles.eventCard}>
            <h3 className={styles.eventTitle}>
              {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"} {participant.name}
            </h3>
            <p className={styles.eventDetails}>📊 Indicados: {participant.subscribers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
