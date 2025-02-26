import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Event {
  title: string;
  location: string;
  price: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const EventDetails = () => {
  const { prettyName } = useParams(); // Pegando o prettyName da URL
  const [data, setData] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const url = `https://revinfinity.pro/events/${prettyName}`;
        const response = await axios.get(url);

        if (response.status === 200) {
          setData(response.data);
        } else {
          setError("Erro ao carregar detalhes do evento.");
        }
      } catch (error) {
        setError("Erro ao buscar evento.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [prettyName]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
  <h1 className="text-3xl font-bold text-[#8234E9] mb-4">{data?.title}</h1>
  
  <div className="space-y-3 text-gray-700">
    <p className="flex items-center">
      📍 <span className="ml-2 font-semibold">{data?.location}</span>
    </p>
    
    <p className="flex items-center">
      💰 <span className="ml-2 text-green-600 font-bold">R$ {data?.price.toFixed(2)}</span>
    </p>

    <p className="flex items-center">
      🗓 <span className="ml-2 font-semibold">{data?.startDate} - {data?.endDate}</span>
    </p>

    <p className="flex items-center">
      ⏰ <span className="ml-2 font-semibold">{data?.startTime} - {data?.endTime}</span>
    </p>
  </div>

    <Link to="/subscription">
    <button className="mt-6 w-full bg-[#8234E9] hover:bg-[#6b27c7] text-white font-bold py-2 px-4 rounded transition-all">
    Inscrever-se no Evento
    </button>
    </Link>
  
</div>
  );
};

export default EventDetails;
