import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../EventsList.module.css";

interface Event {
  eventId: number;
  title: string;
  prettyName: string;
  location: string;
  price: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const EventsList = () => {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedEvent, setCopiedEvent] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Event[]>("https://revinfinity.pro/events")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao buscar os dados.");
        setLoading(false);
      });
  }, []);

  // Função para copiar o prettyName ao clicar
  const handleCopy = (prettyName: string) => {
    navigator.clipboard.writeText(prettyName);
    setCopiedEvent(prettyName);

    setTimeout(() => {
      setCopiedEvent(null);
    }, 2000); // Reseta o aviso após 2 segundos
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎟 Lista de Eventos</h2>

      {loading && <p className="text-center text-blue-500">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className={styles.eventGrid}>
        {data.map((event, index) => (
          <div key={event.eventId} className={styles.eventCard} style={{ animationDelay: `${index * 0.1}s` }}>
            <h3 className={styles.eventTitle}>{event.title}</h3>
            <p className={styles.eventLocation}>📍 {event.location}</p>

            <p 
              className={styles.copyPrettyName} 
              onClick={() => handleCopy(event.prettyName)}
              title="Clique para copiar"
            >
              🔗 Pretty Name: <strong>{event.prettyName}</strong> {copiedEvent === event.prettyName ? "✅ Copiado!" : "📋"}
            </p>

            <div className={styles.eventDetails}>
              <p>🗓 <strong>Data:</strong> {event.startDate} - {event.endDate}</p>
              <p>⏰ <strong>Horário:</strong> {event.startTime} - {event.endTime}</p>
              <p className={styles.price}>💰 R$ {event.price.toFixed(2)}</p>
            </div>

            <a href="#" className={styles.button}>Ver Detalhes</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
