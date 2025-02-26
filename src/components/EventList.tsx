import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  const handleCopy = (prettyName: string) => {
    navigator.clipboard.writeText(prettyName);
    setCopiedEvent(prettyName);
    setTimeout(() => {
      setCopiedEvent(null);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🎟 Lista de Eventos</h2>
      {loading && <p className="text-center text-xl text-[#8234E9] grid grid-cols-1">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 gap-4">
        {data.map((event, index) => (
          <div
            key={event.eventId}
            className="bg-white shadow-md rounded p-4"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-700 mb-2">📍 {event.location}</p>
            <p
              className="text-[#8234E9] cursor-pointer mb-2"
              onClick={() => handleCopy(event.prettyName)}
              title="Clique para copiar"
            >
              📋 Pretty Name: <strong>{event.prettyName}</strong>{" "}
              {copiedEvent === event.prettyName ? "✅ Copiado!" : ""}
            </p>
            <div className="text-gray-700 mb-2">
              <p>
                🗓 <strong>Data:</strong> {event.startDate} - {event.endDate}
              </p>
              <p>
                ⏰ <strong>Horário:</strong> {event.startTime} -{" "}
                {event.endTime}
              </p>
              <p className="font-bold">💰 R$ {event.price.toFixed(2)}</p>
            </div>
            
            <Link to={`/event-details/${event.prettyName}`}>
      <button className="inline-block bg-[#8234E9] hover:bg-[#8234E9] text-white font-bold py-2 px-4 rounded">
       Ver Detalhes
      </button>
    </Link>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
