import { useState } from "react";
import axios from "axios";

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

  const fetchRanking = async () => {
    if (!prettyName) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://revinfinity.pro/subscription/${prettyName}/ranking`
      );
      setRanking(response.data.slice(0, 3));
    } catch (err) {
      setError("❌ Erro ao buscar o ranking. Verifique o nome do evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🏆 Ranking do Evento</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            🔍 Nome do Evento:
          </label>
          <input
            type="text"
            value={prettyName}
            onChange={(e) => setPrettyName(e.target.value)}
            placeholder="Digite o pretty name do evento..."
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={fetchRanking}
          disabled={loading}
          className="bg-[#8234E9] hover:bg-[#8234E9] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "Carregando..." : "Buscar Ranking"}
        </button>
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}
      <ul className="grid gap-4">
        {ranking.map((participant, index) => (
          <li
            key={participant.userId}
            className="bg-white shadow-md rounded p-4"
          >
            <h3 className="text-xl font-bold mb-2">
              {index === 0
                ? "🥇"
                : index === 1
                ? "🥈"
                : "🥉"}{" "}
              {participant.name}
            </h3>
            <p className="text-gray-700">
              📊 Indicados: {participant.subscribers}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
